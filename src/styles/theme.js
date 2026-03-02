import { createTheme } from "@mui/material/styles";

const plum = "#980061";

export const theme = createTheme({
  typography: {
    fontFamily: `"casual_sunday", serif`,
  },

  components: {
    // Global typography color
    MuiTypography: {
      styleOverrides: {
        root: {
          color: plum
        }
      }
    },

    // All TextFields: fullWidth + shrink
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        InputLabelProps: { shrink: true }
      }
    },

    // All Selects: fullWidth + shrink + plum styling
    MuiSelect: {
      defaultProps: {
        fullWidth: true,
        displayEmpty: true
      },
      styleOverrides: {
        select: {
          color: plum,
          fontSize: "1.25rem",
          textAlign: "left"
        }
      }
    },

    // Label color (TextField, Select, etc.)
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: plum,
        },
        shrink: {
          color: plum,
        }
      }
    },

    // Outlined inputs (TextField, Select)
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: plum,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: plum,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: plum,
          }
        },
        input: {
          color: plum,
          fontSize: "1.25rem",
        }
      }
    },

    // Plum button variants
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1.25rem",
        }
      },
      variants: [
        {
          props: { variant: "plum-contained" },
          style: {
            textTransform: "none",
            color: "white",
            backgroundColor: plum,
            border: `1px solid ${plum}`,
            "&:hover": {
              backgroundColor: "#7a004e",
              borderColor: plum
            }
          }
        },
        {
          props: { variant: "plum-outlined" },
          style: {
            textTransform: "none",
            color: plum,
            backgroundColor: "transparent",
            border: `1px solid ${plum}`,
            "&:hover": {
              backgroundColor: "rgba(152, 0, 97, 0.08)",
              borderColor: plum
            }
          }
        }
      ]
    }
  }
});