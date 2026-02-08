module.exports = {
  darkMode: 'class',

    content: [
      "./index.html",
      "./js/**/*.js",
      "./css/**/*.css"
    ],

  theme: {
    extend: {

      fontFamily: {
        Outfit: ["Outfit", "sans-serif"],
        Ovo: ["Ovo", "serif"]
      },

      colors: {
        lightHover: '#fcf4ff',
        darkHover: '#2a004a',
        darkTheme: '#11001F'
      },

      boxShadow: {
        black: '4px 4px 0 #000',
        white: '4px 4px 0 #fff'
      },

      animation: {
        fade: "fadeIn 0.5s ease-in-out"
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        }
      }

    }
  },

  plugins: []
}
