// ── Shared project catalogue ──────────────────────────────────────────────
// One catalogue drives both the home-page selection and the full archive.

export const FEATURED_PROJECTS = [
  {
    id: 'jottr', name: 'Jottr Workspace', label: 'REAL-TIME COLLAB',
    year: '2024 — present', status: 'Live',
    tags: ['Next.js', 'Yjs', 'Supabase', 'PostgreSQL'],
    image: '/projects/Jottr/image.webp', accent: '#6C8EFF',
    link: 'https://jottr.dev',
    github: null,
    summary: 'A Notion-like collaborative workspace built for zero-friction teamwork.',
    description:
      "Jottr is a collaborative knowledge workspace built around CRDTs so multiple writers can edit the same document without conflicts, locks, or stale snapshots. The editor maintains a local copy of state via Yjs, applies operations optimistically, and reconciles with peers as they come online — including users who have been editing offline. Auth, persistence, and access control all run through Supabase, with Postgres row-level security enforcing per-document permissions at the database layer instead of a fragile middleware tier.",
    features: [
      'Real-time multi-cursor editing with awareness presence',
      'Offline-first — local edits queue and merge on reconnect',
      'Block-based editor (headings, lists, code, tables, embeds)',
      'Nested workspaces and pages with drag-to-reorder hierarchy',
      'Public/private sharing with per-role access control',
      'Markdown import + export, with copy-as-rich-text',
    ],
    highlights: [
      'Yjs CRDT layer + Supabase Realtime for transport',
      'Row-level security: auth enforced in Postgres, not the API',
      'Lightweight presence sync built on Yjs awareness protocol',
    ],
    stats: [['STATE', 'Yjs / CRDT'], ['DATABASE', 'PostgreSQL'], ['DEPLOY', 'Vercel'], ['AUTH', 'Supabase RLS']],
  },
  {
    id: 'gittool', name: 'GitTool', label: 'DEV TOOL',
    year: '2024 — present', status: 'In Development',
    tags: ['Electron', 'TypeScript', 'Git', 'Node.js'],
    image: '/projects/Gittool/image.webp', accent: '#FFD93D',
    link: 'https://gittool.dev',
    github: 'https://github.com/Vibhav-y/GitTool',
    summary: 'A cross-platform desktop client that makes complex Git operations visual.',
    description:
      "GitTool is a cross-platform desktop client that wraps the messy parts of Git in a visual interface — branch graphs, side-by-side and inline diffs, stash management, conflict resolution, and interactive rebase. Built with Electron + TypeScript, the same UI ships natively on macOS, Windows, and Linux. The repo layer uses libgit2 bindings for performance, and a file-watcher keeps the UI reactive to external changes so the view never goes stale.",
    features: [
      'Visual branch graph with drag-to-merge and rebase',
      'Side-by-side and inline diff views with syntax highlighting',
      'Stash manager with named, browsable stashes',
      'One-click staging by file, hunk, or individual line',
      'Conflict resolution UI with three-way merge view',
      'Interactive rebase editor (reword / squash / drop)',
    ],
    highlights: [
      'libgit2 bindings — fast repo ops, no shelling out to `git`',
      'File-system watcher keeps the UI reactive to external commits',
      'Theme system with mono fonts and light/dark/system modes',
    ],
    stats: [['PLATFORM', 'Electron'], ['LANG', 'TypeScript'], ['TARGET', 'Desktop'], ['VCS', 'Git 2.x+']],
  },
  {
    id: 'audienceos', name: 'AudienceOS', label: 'AUDIENCE PLATFORM',
    year: '2025 — present', status: 'In Development',
    tags: ['Next.js', 'PostgreSQL', 'AI', 'Analytics'],
    image: '/projects/AudienceOS/image.webp', accent: '#C89B3C',
    link: null,
    github: null,
    summary: 'An AI-native CRM where every campaign begins as a single sentence.',
    description:
      "AudienceOS is an AI-native customer relationship platform. You describe the outcome you want in plain language and it finds the audience, chooses the channel, writes the message, and presents a complete proposal — nothing is sent until you approve it, and every rupee of revenue is traced back to its source. Audience data from across channels is unified into a single queryable layer so you act on who your audience actually is instead of guessing.",
    features: [
      'Describe a goal in a sentence, get a full campaign proposal',
      'Human-in-the-loop — nothing sends without your approval',
      'Unified audience profiles across channels',
      'Segment builder with live counts',
      'Revenue attribution traced back to source',
      'AI-assisted insights and summaries',
    ],
    highlights: [
      'Single queryable audience data layer',
      'Agentic campaign planning with approval gates',
      'End-to-end revenue attribution',
    ],
    stats: [['STACK', 'Next.js'], ['DATABASE', 'PostgreSQL'], ['LAYER', 'AI / Agent'], ['STATUS', 'Building']],
  },
]

export const ALL_PROJECTS = [...FEATURED_PROJECTS]
