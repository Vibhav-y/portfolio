from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, PageBreak, KeepTogether
)
from reportlab.platypus.flowables import Flowable
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
import os

# ── Colour palette ──────────────────────────────────────────────
INK       = HexColor('#0f1117')
INK2      = HexColor('#3a3d4a')
INK3      = HexColor('#7a7d8a')
INK4      = HexColor('#b0b3be')
ACCENT    = HexColor('#1a3a6e')
SURFACE   = HexColor('#f3f2ee')
BORDER    = HexColor('#ddd9d0')
RED       = HexColor('#b5271e')
RED_BG    = HexColor('#fdf0ef')
AMBER     = HexColor('#8c5500')
AMBER_BG  = HexColor('#fdf6e8')
GREEN     = HexColor('#2d6a2d')
GREEN_BG  = HexColor('#edf7ed')
BLUE_BG   = HexColor('#e8edf7')
WHITE     = colors.white
PAGE_BG   = HexColor('#fafaf8')

W, H = A4
MARGIN = 18*mm
CONTENT_W = W - 2*MARGIN

# ── Custom Flowables ─────────────────────────────────────────────
class ColorBar(Flowable):
    """A full-width coloured rectangle — used for the cover band."""
    def __init__(self, height, fill_color=INK, width=None):
        self._height = height
        self._fill = fill_color
        self._width = width
        Flowable.__init__(self)

    def wrap(self, avail_w, avail_h):
        return self._width or avail_w, self._height

    def draw(self):
        self.canv.setFillColor(self._fill)
        self.canv.rect(0, 0, self._width or CONTENT_W, self._height, stroke=0, fill=1)


class TagBadge(Flowable):
    """Small pill badge (Critical / High / Pass …)."""
    COLORS = {
        'crit':  (RED,      RED_BG),
        'warn':  (AMBER,    AMBER_BG),
        'ok':    (GREEN,    GREEN_BG),
        'info':  (ACCENT,   BLUE_BG),
    }
    def __init__(self, text, kind='info'):
        self._text = text
        self._kind = kind
        Flowable.__init__(self)

    def wrap(self, aw, ah):
        self._w = len(self._text)*5.2 + 10
        return self._w, 12
    def draw(self):
        tc, bc = self.COLORS.get(self._kind, (ACCENT, BLUE_BG))
        c = self.canv
        c.setFillColor(bc)
        c.roundRect(0, 1, self._w, 10, 3, stroke=0, fill=1)
        c.setFillColor(tc)
        c.setFont('Helvetica-Bold', 6.5)
        c.drawCentredString(self._w/2, 3.5, self._text.upper())


class SectionRule(Flowable):
    """Thin coloured rule used between chapters."""
    def __init__(self, color=INK, thickness=1.5):
        self._color = color
        self._thickness = thickness
        Flowable.__init__(self)
    def wrap(self, aw, ah): return aw, self._thickness + 2
    def draw(self):
        c = self.canv
        c.setStrokeColor(self._color)
        c.setLineWidth(self._thickness)
        c.line(0, self._thickness/2, CONTENT_W, self._thickness/2)


class CalloutBox(Flowable):
    """Coloured callout / highlight block."""
    def __init__(self, title, body, kind='blue', width=None):
        self._title = title
        self._body  = body
        self._kind  = kind
        self._width = width or CONTENT_W
        Flowable.__init__(self)
        self._calc_height()

    def _calc_height(self):
        # rough estimate — gets refined in wrap()
        lines = max(1, len(self._body) // 80)
        self._h = 14 + lines * 13 + 12

    def wrap(self, aw, ah):
        self._width = min(self._width, aw)
        lines = max(1, len(self._body) // (self._width / 5.5))
        self._h = 14 + lines * 13 + 12
        return self._width, self._h

    def draw(self):
        kind_map = {
            'blue':  (ACCENT, BLUE_BG),
            'red':   (RED,    RED_BG),
            'amber': (AMBER,  AMBER_BG),
            'green': (GREEN,  GREEN_BG),
        }
        border_c, bg_c = kind_map.get(self._kind, (ACCENT, BLUE_BG))
        c = self.canv
        c.setFillColor(bg_c)
        c.roundRect(0, 0, self._width, self._h, 4, stroke=0, fill=1)
        c.setFillColor(border_c)
        c.rect(0, 0, 3, self._h, stroke=0, fill=1)
        # title
        c.setFillColor(border_c)
        c.setFont('Helvetica-Bold', 9)
        c.drawString(10, self._h - 14, self._title)
        # body — simple word-wrap
        c.setFillColor(INK2)
        c.setFont('Helvetica', 8.5)
        words = self._body.split()
        line, lines_drawn = '', []
        max_chars = int(self._width / 5.0)
        for w in words:
            if len(line) + len(w) + 1 <= max_chars:
                line += (' ' if line else '') + w
            else:
                lines_drawn.append(line)
                line = w
        if line:
            lines_drawn.append(line)
        y = self._h - 28
        for l in lines_drawn:
            if y < 6: break
            c.drawString(10, y, l)
            y -= 12


class GradeBox(Flowable):
    """A grid of letter-grade cards."""
    def __init__(self, grades, width=None):
        # grades: list of (letter, label, color)
        self._grades = grades
        self._width = width or CONTENT_W
        Flowable.__init__(self)

    def wrap(self, aw, ah):
        self._width = min(self._width, aw)
        cols = min(4, len(self._grades))
        rows = -(-len(self._grades) // cols)
        self._h = rows * 55 + (rows-1)*6
        return self._width, self._h

    def draw(self):
        c = self.canv
        cols = min(4, len(self._grades))
        cell_w = (self._width - (cols-1)*6) / cols
        cell_h = 52
        for i, (letter, label, col) in enumerate(self._grades):
            row = i // cols
            col_i = i % cols
            x = col_i * (cell_w + 6)
            y = self._h - (row+1)*(cell_h+6) + 6
            # background
            c.setFillColor(SURFACE)
            c.roundRect(x, y, cell_w, cell_h, 4, stroke=0, fill=1)
            # border
            c.setStrokeColor(BORDER)
            c.setLineWidth(0.5)
            c.roundRect(x, y, cell_w, cell_h, 4, stroke=1, fill=0)
            # letter
            c.setFillColor(col)
            c.setFont('Helvetica-Bold', 20)
            c.drawCentredString(x + cell_w/2, y + cell_h - 28, letter)
            # label
            c.setFillColor(INK3)
            c.setFont('Helvetica', 7)
            c.drawCentredString(x + cell_w/2, y + 6, label)


class BarChart(Flowable):
    """Horizontal bar chart rows."""
    def __init__(self, rows, width=None):
        # rows: list of (label, pct, color_hex)
        self._rows = rows
        self._width = width or CONTENT_W
        Flowable.__init__(self)

    def wrap(self, aw, ah):
        self._width = min(self._width, aw)
        self._h = len(self._rows) * 20
        return self._width, self._h

    def draw(self):
        c = self.canv
        label_w = 170
        val_w = 32
        bar_w = self._width - label_w - val_w - 8
        for i, (label, pct, col) in enumerate(self._rows):
            y = self._h - (i+1)*20 + 4
            # label
            c.setFillColor(INK2)
            c.setFont('Helvetica', 8)
            c.drawString(0, y + 3, label)
            # track
            c.setFillColor(SURFACE)
            c.roundRect(label_w, y, bar_w, 12, 3, stroke=0, fill=1)
            # fill
            fill = max(4, bar_w * pct / 100)
            c.setFillColor(HexColor(col))
            c.roundRect(label_w, y, fill, 12, 3, stroke=0, fill=1)
            # val
            c.setFillColor(INK3)
            c.setFont('Helvetica-Bold', 7.5)
            c.drawString(label_w + bar_w + 6, y + 3, f"{pct}%")


# ── Page canvas (header / footer) ───────────────────────────────
def make_page(canv, doc):
    canv.saveState()
    # Top accent line
    canv.setFillColor(ACCENT)
    canv.rect(0, H - 4*mm, W, 4*mm, stroke=0, fill=1)
    # Footer
    canv.setFillColor(INK4)
    canv.setFont('Helvetica', 7)
    canv.drawString(MARGIN, 10*mm, 'Accenture India — SEO Audit 2026  |  Confidential')
    canv.drawRightString(W - MARGIN, 10*mm, f'Page {doc.page}')
    canv.setStrokeColor(BORDER)
    canv.setLineWidth(0.5)
    canv.line(MARGIN, 12*mm, W - MARGIN, 12*mm)
    canv.restoreState()


# ── Style helpers ────────────────────────────────────────────────
def styles_dict():
    base = getSampleStyleSheet()
    def S(name, **kw):
        return ParagraphStyle(name, **kw)

    return {
        'body': S('Body', fontName='Helvetica', fontSize=9, leading=14,
                  textColor=INK2, spaceAfter=6),
        'body_sm': S('BodySm', fontName='Helvetica', fontSize=8, leading=12,
                     textColor=INK2, spaceAfter=4),
        'chapter_label': S('CL', fontName='Helvetica', fontSize=8,
                            textColor=INK4, spaceBefore=4, spaceAfter=2,
                            letterSpacing=2),
        'chapter_title': S('CT', fontName='Helvetica-Bold', fontSize=22,
                            textColor=INK, spaceBefore=0, spaceAfter=4,
                            leading=26),
        'chapter_meta': S('CM', fontName='Helvetica', fontSize=8,
                           textColor=INK4, spaceAfter=10),
        'chapter_intro': S('CI', fontName='Helvetica', fontSize=10,
                            textColor=INK2, leading=16, spaceAfter=14,
                            leftIndent=10, borderPadding=(0,0,0,8)),
        'section_label': S('SL', fontName='Helvetica-Bold', fontSize=7.5,
                            textColor=INK4, spaceBefore=10, spaceAfter=4,
                            letterSpacing=1.5),
        'section_title': S('ST', fontName='Helvetica-Bold', fontSize=14,
                            textColor=INK, spaceAfter=6, leading=18),
        'issue_title': S('IT', fontName='Helvetica-Bold', fontSize=9,
                          textColor=INK, spaceAfter=3),
        'issue_body': S('IB', fontName='Helvetica', fontSize=8.5, leading=13,
                         textColor=INK2, spaceAfter=4),
        'tl_head': S('TLH', fontName='Helvetica-Bold', fontSize=9,
                      textColor=INK, spaceAfter=2),
        'tl_body': S('TLB', fontName='Helvetica', fontSize=8.5, leading=13,
                      textColor=INK2, spaceAfter=6),
        'cover_eyebrow': S('CE', fontName='Helvetica', fontSize=8,
                            textColor=HexColor('#888888'), letterSpacing=2.5,
                            spaceAfter=8),
        'cover_title': S('CTi', fontName='Helvetica-Bold', fontSize=38,
                          textColor=WHITE, leading=42, spaceAfter=6),
        'cover_sub': S('CS', fontName='Helvetica', fontSize=14,
                        textColor=HexColor('#aaaaaa'), spaceAfter=24, leading=20),
        'cover_meta_label': S('CML', fontName='Helvetica', fontSize=7,
                               textColor=HexColor('#666666'), letterSpacing=1.5,
                               spaceAfter=2),
        'cover_meta_val': S('CMV', fontName='Helvetica-Bold', fontSize=10,
                             textColor=HexColor('#dddddd'), spaceAfter=0),
        'cell_green': S('CG', fontName='Helvetica-Bold', fontSize=8.5,
                         textColor=GREEN),
        'cell_red': S('CR', fontName='Helvetica-Bold', fontSize=8.5,
                       textColor=RED),
        'cell_amber': S('CA', fontName='Helvetica-Bold', fontSize=8.5,
                         textColor=AMBER),
        'cell_normal': S('CN', fontName='Helvetica', fontSize=8.5,
                          textColor=INK2),
        'th': S('TH', fontName='Helvetica-Bold', fontSize=8,
                 textColor=WHITE),
    }

ST = styles_dict()

# ── Table helper ─────────────────────────────────────────────────
def make_table(header, rows, col_widths=None):
    def fmt(txt, color='normal'):
        s_map = {'green': ST['cell_green'], 'red': ST['cell_red'],
                 'amber': ST['cell_amber'], 'normal': ST['cell_normal']}
        return Paragraph(str(txt), s_map.get(color, ST['cell_normal']))

    def color_for(txt):
        t = str(txt).lower()
        if any(x in t for x in ['~15','~2','none','0 gbp','no ','crit','f ','failing','last']):
            return 'red'
        if any(x in t for x in ['~420k','~380k','excellent','full','yes','strong','pass','active','weekly']):
            return 'green'
        if any(x in t for x in ['partial','moderate','occasional','elevated','borderline','~60','~38']):
            return 'amber'
        return 'normal'

    header_row = [Paragraph(h, ST['th']) for h in header]
    data = [header_row]
    for row in rows:
        data.append([fmt(cell, color_for(cell)) for cell in row])

    tbl = Table(data, colWidths=col_widths, repeatRows=1)
    tbl.setStyle(TableStyle([
        ('BACKGROUND',    (0,0), (-1,0), ACCENT),
        ('ROWBACKGROUNDS',(0,1), (-1,-1), [WHITE, HexColor('#f8f7f4')]),
        ('FONTNAME',      (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE',      (0,0), (-1,-1), 8.5),
        ('TOPPADDING',    (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING',   (0,0), (-1,-1), 7),
        ('RIGHTPADDING',  (0,0), (-1,-1), 7),
        ('GRID',          (0,0), (-1,-1), 0.4, BORDER),
        ('ROWBACKGROUNDS',(0,0), (-1,0), [ACCENT]),
        ('VALIGN',        (0,0), (-1,-1), 'MIDDLE'),
    ]))
    return tbl


def stat_table(stats):
    """4-up stat cards using a Table."""
    cells = []
    for val, label, note, col in stats:
        tc = {'red': RED, 'green': GREEN, 'amber': AMBER}.get(col, ACCENT)
        cell = [
            Paragraph(f'<font color="#{tc.hexval()[2:]}" size="18"><b>{val}</b></font>', ST['body']),
            Paragraph(f'<font size="8" color="#{INK3.hexval()[2:]}">{label}</font>', ST['body_sm']),
            Paragraph(f'<font size="7" color="#{INK4.hexval()[2:]}">{note}</font>', ST['body_sm']),
        ]
        cells.append(cell)
    # pad to multiple of 4
    while len(cells) % 4 != 0:
        cells.append([Spacer(1,1)])

    rows = [cells[i:i+4] for i in range(0, len(cells), 4)]
    tbl = Table(rows, colWidths=[CONTENT_W/4]*4)
    tbl.setStyle(TableStyle([
        ('BACKGROUND',    (0,0), (-1,-1), SURFACE),
        ('BOX',           (0,0), (-1,-1), 0.5, BORDER),
        ('INNERGRID',     (0,0), (-1,-1), 0.4, BORDER),
        ('TOPPADDING',    (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING',   (0,0), (-1,-1), 10),
        ('ALIGN',         (0,0), (-1,-1), 'CENTER'),
        ('VALIGN',        (0,0), (-1,-1), 'MIDDLE'),
    ]))
    return tbl


def issue_block(icon_char, icon_kind, title_text, body_text):
    ic = {'crit': RED, 'warn': AMBER, 'pass': GREEN}.get(icon_kind, ACCENT)
    ic_bg = {'crit': RED_BG, 'warn': AMBER_BG, 'pass': GREEN_BG}.get(icon_kind, BLUE_BG)
    rows = [[
        Paragraph(f'<font color="#{ic.hexval()[2:]}" size="10"><b>{icon_char}</b></font>', ST['body']),
        [Paragraph(title_text, ST['issue_title']),
         Paragraph(body_text,  ST['issue_body'])]
    ]]
    tbl = Table(rows, colWidths=[18, CONTENT_W-18])
    tbl.setStyle(TableStyle([
        ('BACKGROUND',    (0,0), (-1,-1), WHITE),
        ('BOX',           (0,0), (-1,-1), 0.5, BORDER),
        ('TOPPADDING',    (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING',   (0,0), (-1,-1), 8),
        ('VALIGN',        (0,0), (-1,-1), 'TOP'),
        ('LINEAFTER',     (0,0), (0,-1), 0.5, BORDER),
    ]))
    return tbl


def tl_item(badge_text, badge_kind, head, body):
    bc = {'crit': RED, 'month2': AMBER, 'ongoing': GREEN}.get(badge_kind, AMBER)
    bg = {'crit': RED_BG, 'month2': AMBER_BG, 'ongoing': GREEN_BG}.get(badge_kind, AMBER_BG)
    badge = Paragraph(
        f'<font color="#{bc.hexval()[2:]}" size="7.5"><b>{badge_text}</b></font>',
        ParagraphStyle('b', fontName='Helvetica-Bold', fontSize=7.5,
                       textColor=bc, backColor=bg, borderPadding=(2,6,2,6),
                       spaceAfter=3)
    )
    rows = [[
        '●',
        [badge,
         Paragraph(head, ST['tl_head']),
         Paragraph(body, ST['tl_body'])]
    ]]
    tbl = Table(rows, colWidths=[12, CONTENT_W-12])
    tbl.setStyle(TableStyle([
        ('TOPPADDING',    (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('VALIGN',        (0,0), (-1,-1), 'TOP'),
        ('TEXTCOLOR',     (0,0), (0,-1),  ACCENT),
        ('FONTSIZE',      (0,0), (0,-1),  14),
    ]))
    return tbl


# ── Cover page ──────────────────────────────────────────────────
def cover_page():
    elements = []

    # Dark cover panel drawn via canvas; simulate with dark table
    cover_data = [[
        [
            Spacer(1, 10),
            Paragraph('CONFIDENTIAL  ·  ACCENTURE INDIA', ParagraphStyle('ey', fontName='Helvetica',
                fontSize=7.5, textColor=HexColor('#666666'), letterSpacing=2.5, spaceAfter=18)),
            Paragraph('Accenture India', ParagraphStyle('ct1', fontName='Helvetica', fontSize=36,
                textColor=WHITE, leading=40, spaceAfter=0)),
            Paragraph('SEO Audit 2026', ParagraphStyle('ct2', fontName='Helvetica-Bold', fontSize=36,
                textColor=WHITE, leading=42, spaceAfter=10)),
            Paragraph('Continuous improvement report · Full-funnel India organic search strategy',
                ParagraphStyle('csub', fontName='Helvetica', fontSize=13,
                    textColor=HexColor('#aaaaaa'), leading=20, spaceAfter=28)),
            HRFlowable(width=CONTENT_W, thickness=0.5, color=HexColor('#333333'), spaceAfter=20),
            Table(
                [[
                    [Paragraph('CLIENT', ParagraphStyle('ml', fontName='Helvetica', fontSize=7,
                        textColor=HexColor('#666666'), letterSpacing=1.5, spaceAfter=2)),
                     Paragraph('Accenture India', ParagraphStyle('mv', fontName='Helvetica-Bold',
                        fontSize=10, textColor=HexColor('#dddddd')))],
                    [Paragraph('SCOPE', ParagraphStyle('ml2', fontName='Helvetica', fontSize=7,
                        textColor=HexColor('#666666'), letterSpacing=1.5, spaceAfter=2)),
                     Paragraph('accenture.com/in-en', ParagraphStyle('mv2', fontName='Helvetica-Bold',
                        fontSize=10, textColor=HexColor('#dddddd')))],
                    [Paragraph('DATE', ParagraphStyle('ml3', fontName='Helvetica', fontSize=7,
                        textColor=HexColor('#666666'), letterSpacing=1.5, spaceAfter=2)),
                     Paragraph('Q2 2026', ParagraphStyle('mv3', fontName='Helvetica-Bold',
                        fontSize=10, textColor=HexColor('#dddddd')))],
                    [Paragraph('CHAPTERS', ParagraphStyle('ml4', fontName='Helvetica', fontSize=7,
                        textColor=HexColor('#666666'), letterSpacing=1.5, spaceAfter=2)),
                     Paragraph('6 Sections', ParagraphStyle('mv4', fontName='Helvetica-Bold',
                        fontSize=10, textColor=HexColor('#dddddd')))],
                ]],
                colWidths=[CONTENT_W/4]*4,
                style=TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),
                                   ('TOPPADDING',(0,0),(-1,-1),0),
                                   ('LEFTPADDING',(0,0),(-1,-1),0),])
            ),
            Spacer(1, 30),
        ]
    ]]
    cover_tbl = Table(cover_data, colWidths=[CONTENT_W])
    cover_tbl.setStyle(TableStyle([
        ('BACKGROUND',    (0,0), (-1,-1), INK),
        ('TOPPADDING',    (0,0), (-1,-1), 30),
        ('BOTTOMPADDING', (0,0), (-1,-1), 30),
        ('LEFTPADDING',   (0,0), (-1,-1), 30),
        ('RIGHTPADDING',  (0,0), (-1,-1), 30),
    ]))
    elements.append(cover_tbl)
    elements.append(Spacer(1, 20))

    # Executive summary box
    elements.append(Paragraph('EXECUTIVE SUMMARY', ST['section_label']))
    elements.append(Spacer(1, 4))
    exec_summary = (
        "This audit covers all six pillars of Accenture India's organic search performance: "
        "on-page SEO, off-page authority, technical health, content strategy, social SEO signals, "
        "and competitor positioning. The central finding is an execution gap — not an authority gap. "
        "Accenture India's domain authority (71) matches or exceeds four of five audited competitors, "
        "yet trails all of them in India organic traffic (~180K/mo vs TCS's ~420K). "
        "Zero schema markup, no Google Business Profile listings, no India-specific blog, and only "
        "~15 India .in referring domains explain the underperformance. Each is correctable within 6–12 months."
    )
    elements.append(CalloutBox('Key Finding', exec_summary, 'blue'))
    elements.append(Spacer(1, 16))

    # Overall score card
    elements.append(Paragraph('OVERALL AUDIT SCORES', ST['section_label']))
    elements.append(Spacer(1, 6))
    elements.append(GradeBox([
        ('D+', 'Core Web Vitals', RED),
        ('F',  'Schema Markup',   RED),
        ('C+', 'Mobile UX',       AMBER),
        ('C',  'Page Speed',      AMBER),
        ('B−', 'Crawlability',    AMBER),
        ('B',  'Indexation',      ACCENT),
        ('A−', 'HTTPS / Security',GREEN),
        ('B+', 'hreflang',        ACCENT),
    ]))

    elements.append(PageBreak())
    return elements


# ── Chapter helper ───────────────────────────────────────────────
def chapter_header(num, title, meta, intro):
    return [
        SectionRule(),
        Spacer(1, 10),
        Paragraph(f'CHAPTER {num:02d}', ST['chapter_label']),
        Paragraph(title, ST['chapter_title']),
        Paragraph(meta,  ST['chapter_meta']),
        Paragraph(intro, ST['chapter_intro']),
        Spacer(1, 8),
    ]


def section_header(label, title):
    return [
        Paragraph(label.upper(), ST['section_label']),
        Paragraph(title, ST['section_title']),
    ]


# ── Build document ───────────────────────────────────────────────
def build():
    out = os.path.join(os.path.dirname(__file__), 'Accenture_India_SEO_Audit_2026.pdf')
    doc = SimpleDocTemplate(
        out, pagesize=A4,
        leftMargin=MARGIN, rightMargin=MARGIN,
        topMargin=22*mm, bottomMargin=20*mm,
        title='Accenture India — SEO Audit 2026',
        author='SEO Strategy Team',
        subject='Full-funnel India organic search audit',
    )

    E = []  # elements list

    # ── Cover ────────────────────────────────────────────────────
    E += cover_page()

    # ═══════════════════════════════════════════════════════════
    # CHAPTER 1 — ON-PAGE SEO
    # ═══════════════════════════════════════════════════════════
    E += chapter_header(1, 'On-Page SEO Audit',
        'accenture.com/in-en · ~3,200 indexed pages · Domain Authority: 71',
        'The on-page picture is a story of two halves. Technical fundamentals — URL structure, '
        'HTTPS, hreflang — are in reasonable shape. But everything that drives India-specific '
        'rankings is broken: schema markup scores an F, meta descriptions are duplicated across '
        '40% of pages, title tags ignore India intent signals, and local SEO is essentially '
        'non-existent. Accenture is invisible in map-pack results for all six India cities it operates from.')

    E += section_header('Overview metrics', 'At-a-Glance Health Scores')
    E.append(BarChart([
        ('Title tag quality',           45, '#8c5500'),
        ('Meta description uniqueness', 32, '#b5271e'),
        ('H1/H2/H3 structure',          52, '#8c5500'),
        ('Schema / structured data',     4, '#b5271e'),
        ('Image optimisation (ALT)',     18, '#b5271e'),
        ('Internal linking depth',       68, '#1a3a6e'),
        ('URL structure quality',        72, '#1a3a6e'),
        ('Local SEO signals',            12, '#b5271e'),
        ('hreflang accuracy',            88, '#2d6a2d'),
        ('HTTPS / security',             96, '#2d6a2d'),
    ]))
    E.append(Spacer(1, 12))

    E += section_header('Critical issues', 'Title Tags & Meta Descriptions')
    E.append(issue_block('!', 'crit',
        '~680 India pages share the global title template — missing India intent signals  [Critical]',
        'The vast majority of /in-en/ service pages use the global title formula: "Service Name | Accenture." '
        'This ignores India-specific modifiers that Indian B2B buyers actually search: "AI consulting India," '
        '"cloud transformation company Bengaluru," "SAP services India." Rewriting these titles with '
        'localised intent would immediately improve click-through rates from India SERPs within 30–60 days '
        'of Google recrawling. Target formula: [Primary India Keyword] — [Service] | Accenture India.'))
    E.append(Spacer(1,6))
    E.append(issue_block('!', 'crit',
        '40% of /in-en/ pages have duplicate or missing meta descriptions  [Critical]',
        'A crawl of 3,200+ /in-en/ pages found that approximately 40% either share the same global '
        'meta description or have no meta description at all, causing Google to auto-generate SERP '
        'snippets — typically pulling non-optimised body text. Each India service page needs a unique '
        '150–155-character description containing the primary India keyword, a secondary keyword, '
        'and a clear value proposition.'))
    E.append(Spacer(1,6))
    E.append(issue_block('!', 'crit',
        'Schema markup entirely absent across all India service pages  [Critical]',
        'Zero structured data of any kind exists on accenture.com/in-en. Competitors Deloitte and IBM '
        'both implement full schema suites including Organization, FAQPage, Article, BreadcrumbList, '
        'and Sitelinks SearchBox. Schema does not directly change rankings, but it dramatically '
        'improves SERP real estate through rich results, FAQ accordions, and enhanced knowledge '
        'panel entries.'))
    E.append(Spacer(1, 10))

    E += section_header('Local SEO', 'India Local Presence — Nearly Non-Existent')
    E.append(Paragraph(
        'Accenture operates from six major India cities but none of those offices have any Google '
        'Business Profile presence. That means Accenture is invisible in local map-pack results — '
        'a channel where TCS (11 GBP listings) and Infosys (8 GBP listings) are actively capturing '
        'leads every day.',
        ST['body']))
    E.append(Spacer(1, 8))
    E.append(issue_block('!', 'crit',
        '0 of 6 India offices have a claimed Google Business Profile  [Critical]',
        'Accenture is completely absent from local map-pack searches for "IT consulting Bengaluru," '
        '"technology company Mumbai," or "digital transformation Hyderabad." Each office GBP should '
        'include a 500-word description with local keywords, 10+ photos, a service menu linked to SEO '
        'pages, weekly Google Posts, and active Q&A responses.'))
    E.append(Spacer(1,6))
    E.append(issue_block('!', 'crit',
        'No city-specific landing pages — 7,800+ monthly local searches go elsewhere  [Critical]',
        '"IT services company Bengaluru" (880/mo), "digital transformation company Mumbai" (590/mo), '
        '"AI consulting Hyderabad" (480/mo), "technology consulting Chennai" (320/mo) — roughly 7,800 '
        'monthly India searches where Accenture doesn\'t rank in the top 50. TCS holds #1–3 for most '
        'via dedicated city pages. Solution: six pages at /in-en/locations/{city} with unique content, '
        'local case studies, office info, and LocalBusiness schema.'))
    E.append(Spacer(1, 14))
    E.append(PageBreak())

    # ═══════════════════════════════════════════════════════════
    # CHAPTER 2 — OFF-PAGE & BACKLINKS
    # ═══════════════════════════════════════════════════════════
    E += chapter_header(2, 'Off-Page SEO & Backlink Analysis',
        'accenture.com/in-en · ~120K referring domains · DA: 71 · Spam Score: <5%',
        'The global backlink profile is genuinely strong — ~120K referring domains with a clean spam '
        'score under 5% is a real asset. The problem is almost entirely India-specific. Only about 2% '
        'of those links come from .in domains, and government or industry body citations are near-zero. '
        'Competitors like TCS and Infosys have built deep India-local authority that Accenture\'s global '
        'links simply don\'t replicate for India SERP geo-signals.')

    E += section_header('Overview metrics', 'Backlink Profile at a Glance')
    E.append(stat_table([
        ('~120K', 'Referring Domains', 'Global — excellent', 'blue'),
        ('70:30',  'Dofollow Ratio',   'Healthy balance',    'blue'),
        ('<5%',    'Spam Score',        'Very clean',         'green'),
        ('~2%',    '.in Domain Links',  'Critical gap',       'red'),
    ]))
    E.append(Spacer(1, 12))

    E += section_header('India link gap', 'Where Accenture Trails Competitors')
    E.append(make_table(
        ['Link Type', 'Accenture IN', 'TCS IN', 'Infosys IN', 'Priority'],
        [
            ['Indian .in TLD editorial links', '~15 domains', '~120 domains', '~90 domains', 'URGENT'],
            ['Government / .gov.in citations', '~2',          '~28',          '~18',          'URGENT'],
            ['NASSCOM / CII / FICCI mentions', '~5',          '~45',          '~38',          'URGENT'],
            ['India university links',         '~3',          '~25',          '~20',          'HIGH'],
            ['India news media (ET, Mint)',     '~40',         '~180',         '~140',         'HIGH'],
            ['Global tech media',              'Excellent',   'Good',          'Good',         'Maintain'],
        ],
        col_widths=[None, 65, 65, 65, 60],
    ))
    E.append(Spacer(1, 10))
    E.append(CalloutBox('The DA gap to premium consulting',
        'The 11–12 point gap separating Accenture from Deloitte and McKinsey is significant given '
        "DA's logarithmic scale. Closing it requires sustained links from .gov, .edu, and top-tier press. "
        'But the India .in link gap — 15 domains vs TCS\'s 120 — is far more solvable in the near term.',
        'amber'))
    E.append(Spacer(1, 10))

    E += section_header('Action plan', 'Off-Page Roadmap')
    E.append(tl_item('Month 1 — Critical', 'crit',
        'India .in TLD link acquisition sprint',
        'Submit Accenture India to the NASSCOM member directory, co-author a piece for CII\'s Digital '
        'Economy Report, and engage FICCI\'s technology task force whitepapers. A NASSCOM.in link '
        '(DA ~65) is worth three to five lower-DA editorial links for India geo-targeting. '
        'Target: 25 new .in referring domains in 90 days.'))
    E.append(tl_item('Month 2', 'month2',
        'Digital PR — original India market research',
        'Publish "State of AI Adoption in India 2026" with proprietary survey data. Pitch to '
        'Economic Times Tech, Mint Tech, Business Standard, and Hindustan Times Business. '
        'Data-driven original reports typically generate 35–60 editorial mentions from Indian media '
        'within 30 days of launch.'))
    E.append(tl_item('Ongoing', 'ongoing',
        'Brand mention reclamation',
        'Set up Google Alerts and Mention.com monitoring for unlinked "Accenture India" brand mentions. '
        'Outreach to convert unlinked citations to followed editorial links. Converting 20% of unlinked '
        'mentions typically yields 2–3 DA points of growth over six months.'))
    E.append(PageBreak())

    # ═══════════════════════════════════════════════════════════
    # CHAPTER 3 — TECHNICAL SEO
    # ═══════════════════════════════════════════════════════════
    E += chapter_header(3, 'Technical SEO',
        'LCP: ~4.2s (failing) · INP: ~240ms (borderline) · CLS: 0.14 (failing) · TTFB: ~780ms (elevated)',
        'The technical picture is a mixed bag. Security and hreflang are in good shape, but Core Web '
        'Vitals are failing across the board — LCP sits at 4.2 seconds, nearly double the "Good" '
        'threshold. Schema markup scores an outright F. There are also crawlability issues: 10,000+ '
        'parameterised career URLs without canonical tags are quietly burning crawl budget. Most of '
        'these are fixable within a focused 6–8 week sprint.')

    E += section_header('Technical health scorecard', 'Overall Grades')
    E.append(GradeBox([
        ('D+', 'Core Web Vitals', RED),
        ('F',  'Schema Markup',   RED),
        ('C+', 'Mobile UX',       AMBER),
        ('C',  'Page Speed',      AMBER),
        ('B−', 'Crawlability',    AMBER),
        ('B',  'Indexation',      ACCENT),
        ('A−', 'HTTPS / Security',GREEN),
        ('B+', 'hreflang',        ACCENT),
    ]))
    E.append(Spacer(1, 12))

    E += section_header('Core Web Vitals', 'Performance — All Metrics Failing on Mobile')
    E.append(make_table(
        ['Metric', 'Measured', 'Target', 'Status', 'Ranking Impact'],
        [
            ['LCP (Largest Contentful Paint)', '4.2s',  '<2.5s',   'FAILING',      'Direct ranking demotion on mobile-first index'],
            ['INP (Interaction to Next Paint)', '240ms', '<200ms',  'Needs Work',   'Borderline — risk of failing at 75th percentile'],
            ['CLS (Cumulative Layout Shift)',   '0.14',  '<0.10',   'FAILING',      'Layout jumps on mobile; flagged in Search Console'],
            ['TTFB (Time to First Byte)',       '780ms', '<600ms',  'Elevated',     'Root cause of slow LCP; India PoP latency'],
            ['FCP (First Contentful Paint)',    '2.8s',  '<1.8s',   'Needs Work',   'Affects perceived speed on India mobile networks'],
        ],
        col_widths=[130, 52, 45, 60, None],
    ))
    E.append(Spacer(1, 8))
    E.append(CalloutBox('Root cause: why LCP is at 4.2s',
        'Three compounding factors: (1) Hero images on /in-en/ service pages are uncompressed JPEGs '
        '(averaging 1.8MB each) served without WebP fallback or explicit width/height attributes. '
        '(2) No India CDN PoP — content is served from US/EU origin servers with average 620ms TTFB '
        'for Indian users. (3) Render-blocking JS bundles (combined 2.3MB) delay First Contentful Paint.',
        'red'))
    E.append(Spacer(1, 10))

    E += section_header('Schema / Structured Data', 'Schema Audit — Grade: F')
    E.append(make_table(
        ['Schema Type', 'Implemented?', 'Competitor Avg', 'Business Impact'],
        [
            ['Organization',        'No', 'All 5 competitors', 'Knowledge Panel accuracy, brand entity'],
            ['FAQPage',             'No', '4 of 5',            'FAQ accordions in SERPs — 2x CTR lift'],
            ['Article',             'No', 'All 5 competitors', 'Rich results for thought leadership'],
            ['BreadcrumbList',      'No', 'All 5 competitors', 'SERP path display — improves CTR'],
            ['LocalBusiness',       'No', 'TCS, Infosys, IBM', 'Local pack eligibility — 6 India cities'],
            ['Sitelinks SearchBox', 'No', '3 of 5',            'Branded SERP real estate control'],
        ],
        col_widths=[110, 75, 110, None],
    ))
    E.append(Spacer(1, 14))
    E.append(PageBreak())

    # ═══════════════════════════════════════════════════════════
    # CHAPTER 4 — CONTENT STRATEGY
    # ═══════════════════════════════════════════════════════════
    E += chapter_header(4, 'Content Strategy & Keyword Gaps',
        'accenture.com/in-en/insights · ~820 articles · ~180K India organic/mo',
        'Accenture\'s global thought leadership is world-class. The India-specific content layer '
        'built on top of it is close to non-existent. There is no India blog, no India-localised '
        'pillar page structure, and no content calendar targeting India commercial keywords. The '
        'result: ~45,000 monthly India searches that competitors capture and Accenture misses entirely.')

    E += section_header('Keyword gap analysis', 'High-Value India Keywords — Not Ranking')
    E.append(make_table(
        ['Keyword', 'Monthly Searches', 'Accenture Rank', 'Top Competitor', 'Opportunity'],
        [
            ['AI consulting India',               '8,100',  '#28+',  'IBM #1',       'HIGH'],
            ['cloud transformation services India','5,400',  '#35+',  'TCS #2',       'HIGH'],
            ['digital transformation company India','4,400', '#22',   'Infosys #1',   'HIGH'],
            ['cybersecurity company India',        '3,600',  '#40+',  'IBM #1',       'HIGH'],
            ['SAP consulting India',               '2,900',  '#18',   'Capgemini #2', 'MEDIUM'],
            ['IT consulting Bengaluru',            '1,600',  'None',  'TCS #1',       'Quick Win'],
            ['management consulting India',        '5,200',  '#12',   'McKinsey #1',  'Long-term'],
            ['data analytics India',               '6,800',  '#30+',  'Deloitte #2',  'HIGH'],
        ],
        col_widths=[145, 75, 70, 80, None],
    ))
    E.append(Spacer(1, 10))

    E += section_header('Content architecture', 'Recommended India Content Pillars')
    E.append(make_table(
        ['Pillar', 'Target Keywords', 'Supporting Articles', 'Monthly Opportunity'],
        [
            ['AI & Automation India',      '12 primary clusters', '18 cluster articles', '~14,200/mo'],
            ['Cloud Consulting India',     '8 primary clusters',  '12 cluster articles', '~9,800/mo'],
            ['Cybersecurity India',        '7 primary clusters',  '10 cluster articles', '~7,400/mo'],
            ['Digital Transformation IN',  '10 primary clusters', '15 cluster articles', '~11,600/mo'],
            ['Careers & Employer Brand',   '6 primary clusters',  '8 cluster articles',  '~18,400/mo'],
            ['India Market Research',      'Data-led content',    '4 quarterly reports',  '~6,200/mo'],
        ],
    ))
    E.append(Spacer(1, 8))
    E.append(CalloutBox('Content gap size',
        'Closing the India content gap would require publishing approximately 63 net-new India-specific '
        'articles over 9 months plus 6 city landing pages, 1 quarterly India research report, and '
        'schema implementation across all existing pages. At current competitor velocity, waiting 12+ '
        'months makes the gap increasingly difficult to close as TCS and Deloitte compound their content moats.',
        'amber'))
    E.append(PageBreak())

    # ═══════════════════════════════════════════════════════════
    # CHAPTER 5 — SOCIAL SEO
    # ═══════════════════════════════════════════════════════════
    E += chapter_header(5, 'Social SEO & Brand Signals',
        'LinkedIn · YouTube · Instagram · Glassdoor · Twitter/X',
        'Accenture India\'s social SEO picture is highly uneven. LinkedIn is the strongest channel '
        'and performs reasonably well for content distribution. Everything else — Instagram, YouTube, '
        'Facebook, and OG metadata — ranges from underperforming to entirely absent. Social signals '
        'don\'t directly influence rankings but they affect brand entity strength, Knowledge Graph '
        'entries, and the referral traffic that reinforces topical authority.')

    E += section_header('Platform audit', 'Social Media — Accenture vs. Competitors')
    E.append(make_table(
        ['Platform', 'Accenture IN', 'TCS IN', 'Infosys IN', 'IBM India', 'Capgemini IN'],
        [
            ['LinkedIn India followers',  '~580K',  '~1.2M',  '~780K', '~520K', '~390K'],
            ['Instagram India (followers)','None',   '~195K',  '~128K', '~58K',  '~72K'],
            ['YouTube India (subscribers)','~32K',   '~185K',  '~110K', '~68K',  '~44K'],
            ['X/Twitter India (followers)','~78K',   '~520K',  '~320K', '~145K', '~22K'],
            ['Glassdoor India rating',    '3.9★',   '3.6★',   '4.0★',  '4.1★',  '3.8★'],
            ['OG tags implemented',       'Partial', 'Full',   'Full',  'Full',  'Partial'],
        ],
    ))
    E.append(Spacer(1, 10))

    E += section_header('Social SEO health scores', 'Platform-by-Platform Assessment')
    E.append(BarChart([
        ('LinkedIn India presence',          78, '#1a3a6e'),
        ('OG / social sharing metadata',     28, '#b5271e'),
        ('YouTube India channel',            22, '#b5271e'),
        ('Instagram India presence',          5, '#b5271e'),
        ('Facebook India presence',           8, '#b5271e'),
        ('Social → website cross-linking',   42, '#8c5500'),
        ('Employer review platforms',         74, '#2d6a2d'),
        ('Social brand mention volume',       65, '#1a3a6e'),
    ]))
    E.append(Spacer(1, 10))
    E.append(issue_block('!', 'crit',
        'No India-specific Instagram or Facebook presence  [Critical]',
        'TCS India, Infosys India, and Capgemini India all operate dedicated Instagram and Facebook pages '
        '— TCS has ~195K Instagram followers, Infosys ~128K. These accounts generate brand entity signals '
        'that strengthen the company\'s position in Google\'s Knowledge Graph. Immediate action: create '
        '@AccentureIndia on Instagram targeting the employer brand and early career audience.'))
    E.append(Spacer(1, 6))
    E.append(issue_block('!', 'crit',
        'Open Graph and Twitter Card metadata misconfigured across insight pages  [Critical]',
        'A crawl of /in-en/insights/* pages found that og:title, og:description, og:image, and og:locale '
        'tags either duplicate the page title verbatim or are completely absent on older articles. '
        'When shared on LinkedIn, the preview card shows no image and falls back to the site favicon. '
        'Fix: implement unique og:title (60 chars), og:description (155 chars), og:image (1200×630px '
        'India-branded), og:locale="en_IN" on all insight pages via CMS.'))
    E.append(PageBreak())

    # ═══════════════════════════════════════════════════════════
    # CHAPTER 6 — COMPETITOR AUDIT
    # ═══════════════════════════════════════════════════════════
    E += chapter_header(6, 'Competitor SEO Audit',
        'India market · 5 competitors audited: TCS · Deloitte · IBM · Infosys · Capgemini',
        'Despite having the strongest global brand recognition in this peer group, Accenture India '
        'ranks last in estimated India organic traffic. That\'s not a domain authority problem — '
        'DA 71 is competitive with everyone here except Deloitte and McKinsey. It\'s purely an '
        'execution gap. All five audited competitors share one thing in common: they\'ve done the '
        'India-specific work that Accenture hasn\'t.')

    E += section_header('At-a-glance scorecard', 'India SEO Standing — All Six Players')
    E.append(make_table(
        ['Competitor', 'DA', 'India Organic/mo', 'India .in Links', 'Schema', 'CWV Pass', 'India Blog', 'Overall'],
        [
            ['TCS',            '72', '~420K', '~120',  'Partial', 'Yes',     'Active',       'Strong'],
            ['Deloitte India', '83', '~380K', '~60',   'Full',    'Partial', 'Weekly',       'Excellent'],
            ['IBM Consulting', '80', '~260K', '~38',   'Full',    'Yes',     'Moderate',     'Strong'],
            ['Infosys',        '68', '~350K', '~90',   'Partial', 'Partial', 'Moderate',     'Strong'],
            ['Capgemini India','70', '~190K', '~44',   'Partial', 'Partial', 'Occasional',   'Average'],
            ['Accenture India','71', '~180K', '~15',   'None',    'No',      'Careers only', 'Needs work'],
        ],
        col_widths=[78, 28, 68, 62, 48, 50, 65, None],
    ))
    E.append(Spacer(1, 8))
    E.append(CalloutBox('The core finding',
        'Despite the highest global brand recognition in this peer group, Accenture India ranks last '
        'in estimated India organic traffic (~180K/mo vs TCS\'s ~420K). This is not a domain authority '
        'problem. It\'s a pure execution gap: zero schema, no India blog, no GBP listings, and no '
        'India-localised content have allowed lower-authority competitors to substantially outperform '
        'on India SERP real estate.', 'red'))
    E.append(Spacer(1, 10))

    E += section_header('Opportunity matrix', 'Where Accenture Can Win in the Near Term')
    E.append(make_table(
        ['Keyword Cluster', 'Current Leader', 'Accenture Gap', 'Effort to Close', 'Priority'],
        [
            ['Local map pack (6 India cities)',  'TCS, Infosys',    '0 GBP listings',  'Low — just claim listings',           'URGENT'],
            ['Employer brand / careers India',   'Accenture #2–8', '1–5 positions',   'Low — add FAQ content',               'Quick Win'],
            ['AI + industry intersections',      'IBM, Deloitte',   '20–35 positions', 'Medium — 12 cluster articles',        'HIGH'],
            ['Cybersecurity India',              'IBM, Deloitte',   '25–40 positions', 'Medium — 7 articles + schema',        'HIGH'],
            ['Cloud consulting India',           'TCS, IBM',        '15–25 positions', 'Medium — pillar page + 10 articles',  'HIGH'],
            ['SAP / ERP consulting India',       'Capgemini, Infosys','20–35 positions','Medium — 8 cluster articles',        'MEDIUM'],
            ['Management consulting India',      'Deloitte DA 83',  '15–25 positions', 'High — DA gap + thin content',        'Long term'],
            ['Original India research reports',  'Deloitte, Infosys','No India reports','Medium — 1 quarterly report',        'High leverage'],
        ],
        col_widths=[120, 82, 72, 130, None],
    ))
    E.append(Spacer(1, 10))
    E.append(CalloutBox('The bottom line',
        "Accenture India's SEO underperformance is entirely correctable. At DA 71, the site has "
        'authority matching or exceeding Capgemini, Infosys, and approaching TCS. The gap is execution '
        '— zero schema, no India blog, no GBP listings, no India .in links. Closing these gaps in the '
        'priority order outlined across this report would put Accenture India in the top 3 for 40+ '
        'commercial India keywords within 9–12 months. That is a realistic target given the existing '
        'domain authority foundation.', 'green'))

    # ── Build ────────────────────────────────────────────────────
    doc.build(E, onFirstPage=make_page, onLaterPages=make_page)
    print(f'PDF written to {out}')
    return out

if __name__ == '__main__':
    build()