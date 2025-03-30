// Create a dark theme
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material"

const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#60a5fa",
      },
      secondary: {
        main: "#a78bfa",
      },
      background: {
        default: "#0f172a",
        paper: "#1e293b",
      },
      text: {
        primary: "#f1f5f9",
        secondary: "#cbd5e1",
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 800,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 700,
      },
      button: {
        textTransform: "none",
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: "8px 16px",
          },
          contained: {
            boxShadow: "0 4px 14px 0 rgba(96, 165, 250, 0.4)",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
          },
        },
      },
    },
  })

export default darkTheme;