/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#88d3ea', // Lighter shade
                    DEFAULT: '#5BC0DE', // Brand Color
                    dark: '#31b0d5',   // Darker shade for hover
                },
                secondary: '#2d3e50', // Dark blue/gray for contrast
            }
        },
    },
    plugins: [],
}
