/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/library/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      height: { '4.5': "1.125rem" },
      width: { '4.5': "1.125rem" }
    },
    colors: {
      white: "#FFFFFF",
      'white-smoke': {
        regular: "#EBEBEB",
        light: "#F5F5F5",
      },
      'night-black': "#121214",
      onyx: {
        dark: "#1C1C29",
        regular: "#3D3D4D",
        'extra-light': "#A09CB1",
      },
      red: "#AD273F",
      green: "#3FAD27",
      blue: "#273FAD",
    }

  },
  plugins: [],
}
