import { createTheme } from "@mui/material/styles";
import "@fontsource/fraunces/latin-700.css";
import "@fontsource/nunito-sans/latin-400.css";
import "@fontsource/nunito-sans/latin-500.css";
import "@fontsource/nunito-sans/latin-700.css";
import { brand } from "./tokens";

const theme = createTheme({
  brand,
  palette: {
    mode: "light",
    primary: {
      main: brand.color.plum,
      dark: brand.color.plumHover,
      contrastText: brand.color.paper
    },
    background: {
      default: brand.color.cream,
      paper: brand.color.paper
    },
    text: {
      primary: brand.color.ink,
      secondary: brand.color.mutedInk
    },
    divider: brand.color.line
  },
  shape: {
    borderRadius: brand.radius.medium
  },
  typography: {
    fontFamily: '"Nunito Sans", sans-serif',
    h1: {
      fontFamily: '"Fraunces", serif',
      fontWeight: 700,
      letterSpacing: "-0.045em"
    },
    h2: {
      fontFamily: '"Fraunces", serif',
      fontWeight: 700,
      letterSpacing: "-0.025em"
    },
    h3: {
      fontFamily: '"Fraunces", serif',
      fontWeight: 700
    },
    h4: {
      fontFamily: '"Fraunces", serif',
      fontWeight: 700
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.7
    },
    body2: {
      fontSize: "0.9375rem",
      lineHeight: 1.65
    },
    button: {
      fontWeight: 700,
      letterSpacing: "0.01em",
      textTransform: "none"
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: brand.color.cream,
          color: brand.color.ink
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          borderRadius: brand.radius.small,
          minHeight: 46,
          padding: "0.72rem 1.25rem",
          transition: `background-color ${brand.motion.quick}, border-color ${brand.motion.quick}, color ${brand.motion.quick}, transform ${brand.motion.quick}`,
          "&:hover": {
            transform: "translateY(-1px)"
          },
          "&:focus-visible": {
            outline: "3px solid rgba(152, 0, 97, 0.3)",
            outlineOffset: 3
          }
        }
      },
      variants: [
        {
          props: { variant: "plum-contained" },
          style: {
            color: brand.color.paper,
            backgroundColor: brand.color.plum,
            border: `1px solid ${brand.color.plum}`,
            "&:hover": {
              backgroundColor: brand.color.plumHover,
              borderColor: brand.color.plumHover
            }
          }
        },
        {
          props: { variant: "plum-outlined" },
          style: {
            color: brand.color.plum,
            backgroundColor: "transparent",
            border: `1px solid ${brand.color.line}`,
            "&:hover": {
              backgroundColor: brand.color.whiteWash,
              borderColor: brand.color.plum
            }
          }
        }
      ]
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: brand.color.paper,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: brand.color.line
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: brand.color.plum
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: brand.color.plum
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: brand.color.mutedInk,
          "&.Mui-focused": {
            color: brand.color.plum
          }
        }
      }
    }
  }
});

export default theme;
