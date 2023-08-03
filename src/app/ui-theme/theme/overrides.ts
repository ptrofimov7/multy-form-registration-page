import palette from "./palette";

const overrides = {
  MuiButton: {
    defaultProps: {
      variant: "contained",
    },
    styleOverrides: {
      contained: {
        textTransform: "none",
        fontWeight: 500,
        borderRadius: "20px",
        color: palette.common.white,
        backgroundColor: palette.primary.main,
        height: "40px",
        paddingInline: "24px",

        "&:hover": {
          color: palette.common.white,
          backgroundColor: palette.primary.dark,
          boxShadow: "0px 4px 5px 0px rgba(0, 0, 0, 0.16)",
        },

        "&:active": {
          color: palette.common.white,
          backgroundColor: palette.primary.light,

        },

        "&:disabled": {
          color:  palette.primary.gray,
          backgroundColor:  palette.primary.extralight,
        },
      },
      outlined: {
        border: 'none',
        color: 'rgba(109, 120, 149, 1)',
        background: 'transparent',
        textTransform: "none",
        fontWeight: 500,
        fontSize: '12px',
        lineHeight: 2,
        borderRadius: "20px",
        paddingInline: "24px",
        height: "40px",
      }
    },
  },

  MuiTextField: {
    defaultProps: {
      variant: "outlined",
    },
    styleOverrides: {
      root: {
        textTransform: "none",
        fontWeight: 500,
        border: '1px solid rgba(203, 213, 226, 1)',
        borderRadius: "4px",
        color: palette.common.black,
        backgroundColor: palette.common.white,
        height: "40px",

        "& input": {
          padding: "10px 8px 10px 16px",
        },

        "&:hover": {
          border: '1px solid rgba(78, 90, 242, 1)',
        },

        "&:focus-within": {
          border: '2px solid rgba(56, 67, 237, 1)',
        },

        "&:disabled": {
          border: '1px solid rgba(203, 213, 226, 1)',
          color:  palette.primary.gray,
          backgroundColor:  palette.primary.extralight,
        },
      },
    },
    },

  MuiTab: {
    defaultProps: {
      disableRipple: true,
    },
    styleOverrrides: {
      root: {
        textTransform: 'none',
        '&.Mui-selected': {
          background: 'rgba(56, 67, 237, 1)'
        }
      }
    }
  },
  MuiSelect: {
    styleOverrides: {
      root: {
        textTransform: "none",
        fontWeight: 500,
        border: '1px solid rgba(203, 213, 226, 1)',
        borderRadius: "4px",
        color: palette.common.black,
        backgroundColor: palette.common.white,
        height: "40px",

        '& .MuiSelect-icon': {
          color: palette.primary.dark,
        },

        "&:hover": {
          border: '1px solid rgba(78, 90, 242, 1)',
        },

        "&:focus-within": {
          border: '2px solid rgba(56, 67, 237, 1)',
        },

        "& .MuiOutlinedInput-notchedOutline": {
            display: 'none'
        }
      },
    },
  },
  MuiPopover: {
    styleOverrides: {
      root: {
        '& .MuiMenuItem-root': {
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '14px',
        },
      }
  }},
  MuiFormControl: {
    styleOverrides: {
      root: {
        '& input, & .MuiSelect-select': {
          fontWeight: 500,
          fontSize: '12px',
          lineHeight: '2',
        },
        '& .MuiInput-root.Mui-disabled': {
          border: '1px solid rgba(203, 213, 226, 1)',
          color:  palette.primary.gray,
          backgroundColor:  palette.primary.extralight,
        },
        '& input:hover, & input:focus, & input:disabled': {
          borderBottom: 'none',
        },
        '& input::placeholder, & select::placeholder': {
          fontWeight: 400,
          fontSize: '12px',
          lineHeight: '2',
        },
      '& label': {
        color: palette.text.dark,
        fontWeight: 600,
        fontSize: '12px',
        lineHeight: '2',
      },
      "& label.Mui-focus": {
        color: palette.common.black,
        borderBottom: 'none',
      },
      '& .MuiInput-root::before, & .MuiInput-root::after': {
        borderBottom: 'none',
        content: '""',
        display: 'none'
      },
      '& .MuiInput-root:hover::before, & .MuiInput-root:hover::after': {
        borderBottom: 'none',
        content: '""',
      },
      '& .MuiInput-root:focus::before, & .MuiInput-root:focus::after': {
        borderBottom: 'none',
        content: '""',
      }
      },
    },
  },
};

export default overrides;
