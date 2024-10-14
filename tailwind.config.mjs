/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				orange: '#bf8673',
				white: '#e5e5e2',
			},
		},
	},
	plugins: [],
}
