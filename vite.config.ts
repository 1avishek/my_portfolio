import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const isProjectPage = Boolean(
  process.env.GITHUB_ACTIONS &&
    repositoryName &&
    !repositoryName.endsWith('.github.io'),
)

// https://vite.dev/config/
export default defineConfig({
  base: isProjectPage ? `/${repositoryName}/` : '/',
  plugins: [react(), tailwindcss()],
})
