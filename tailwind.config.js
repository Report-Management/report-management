/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite/plugin";
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
    ],
    darkMode: "media",
    theme: {
        extend: {
            fontFamily: {
                nunito: ['Nunito', 'sans-serif'],
                rubik: ['Rubik', 'sans-serif']
            }
        },
    },
    plugins: [
        flowbite,
        require("daisyui")
    ],
    daisyui: {
        themes: ["light", "dark", "cupcake"],
    },
}

