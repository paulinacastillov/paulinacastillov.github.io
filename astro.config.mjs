// @ts-check
import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'

// 👇 agrega estos imports
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

// https://astro.build/config
export default defineConfig({
  site: 'https://paulinacastillov.github.io',
  integrations: [tailwind()],
  markdown: {
    // habilita $...$ y $$...$$
    remarkPlugins: [remarkMath],
    // renderiza con KaTeX
    rehypePlugins: [rehypeKatex],
  },
})
