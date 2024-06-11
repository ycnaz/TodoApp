export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // ...(import.meta.env.MODE === 'production' ? { cssnano: {} } : {})
  },
}
