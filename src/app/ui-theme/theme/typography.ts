import palette from "./palette";

const typography = {
  fontFamily: "Montserrat, sans-serif",

  h4: {
    fontSize: '36px',
    fontWeight: 700,
    lineHeight: '44px',
    letterSpacing: '0.02em',
  },

  h5: {
    fontWeight: 700,
    fontSize: "24px",
    lineHeight: "24px",
    color: palette.secondary.main,
  },

  h6: {
    fontWeight: 600,
    fontSize: "18px",
    lineHeight: "21.5px",
    color: palette.secondary.main,
  },


  body1: {
    fontWeight: 400,
    fontSize: 18,
    lineHeight: '24px',
    letterSpacing: '0em',
  },
  body2: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '24px',
    letterSpacing: '0em',
    color: '#fff',
  }
};

export default typography;
