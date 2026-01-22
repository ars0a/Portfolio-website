tailwind.config = {
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
        'black': '4px 4px 0 #000',
        'white': '4px 4px 0 #fff',
      },
      animation: {
        'spin-slow': 'spin 6s linear infinite'
      }
    }
  },
  darkMode: 'class'
}