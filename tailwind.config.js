/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik-Regular", "sans-serif"],
        rubikExtraBold: ["Rubik-ExtraBold", "sans-serif"],
        rubikBold: ["Rubik-Bold", "sans-serif"],
        rubikSemiBold: ["Rubik-SemiBold", "sans-serif"],
        rubikMedium: ["Rubik-Medium", "sans-serif"],
        rubikLight: ["Rubik-Light", "sans-serif"],
        rubikItalic: ["Rubik-Italic", "sans-serif"],
        rubikMediumItalic: ["Rubik-MediumItalic", "sans-serif"],
        rubikBlack: ["Rubik-Black", "sans-serif"],
      },
      colors: {
        primary: "#E3562A",
        secondary: "#65AAEA",
        success: "#5BA092",
        error: "#EF4949",
        warning: "#F2A03F",
        ink: {
          dark: "#3C3A36",
          darkGray: "#78746D",
          gray: "#BEBAB3",
          lightGray: "#F8F2EE",
          light: "#F3F2F0",
        }
      }
    },
  },
  plugins: [],
}