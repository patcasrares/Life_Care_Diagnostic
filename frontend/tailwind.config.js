module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width:{
        'elem':'30%',
        'sidebar':'40%'
      },
      height:{
        'list':"60%",
        'grafic':"400px"
      },
      colors:{
        'sidebar':'#D8A858',
        'medGreen':'#29ab87'
      },
      borderRadius: {
        '1/4':"25px"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
