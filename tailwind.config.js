/** @type {import('tailwindcss').Config} */
// Only Tailwind's preflight is used — the site is styled with CSS modules and
// custom properties, and no utility classes are emitted into the build.
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  corePlugins: {
    container: false,
  },
  theme: {},
  plugins: [],
}
