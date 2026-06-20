"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#E07B39", // Saffron
      light: "#F5A673",
      dark: "#A8541A",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#52B788", // Vibrant Green
      light: "#74C69D",
      dark: "#2D6A4F",
      contrastText: "#ffffff",
    },
    background: {
      default: "#06060c",
      paper: "rgba(15, 23, 42, 0.45)",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255, 255, 255, 0.7)",
    },
  },
  typography: {
    fontFamily: '"Outfit", "Roboto", "Noto Sans", "Arial", sans-serif',
    h1: { fontWeight: 800, fontFamily: '"Outfit", sans-serif' },
    h2: { fontWeight: 800, fontFamily: '"Outfit", sans-serif' },
    h3: { fontWeight: 700, fontFamily: '"Outfit", sans-serif' },
    h4: { fontWeight: 700, fontFamily: '"Outfit", sans-serif' },
    h5: { fontWeight: 600, fontFamily: '"Outfit", sans-serif' },
    h6: { fontWeight: 600, fontFamily: '"Outfit", sans-serif' },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 30, // Premium rounded pill shape
          padding: "12px 28px",
          fontSize: "0.95rem",
          transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #E07B39 0%, #a855f7 100%)",
          boxShadow: "0 4px 20px rgba(168, 85, 247, 0.3)",
          color: "#fff",
          "&:hover": {
            background: "linear-gradient(135deg, #a855f7 0%, #E07B39 100%)",
            boxShadow: "0 6px 24px rgba(168, 85, 247, 0.5)",
            transform: "translateY(-2px)",
          },
        },
        outlinedPrimary: {
          borderColor: "rgba(224, 123, 57, 0.5)",
          color: "#E07B39",
          "&:hover": {
            borderColor: "#E07B39",
            background: "rgba(224, 123, 57, 0.1)",
            transform: "translateY(-2px)",
          },
        },
        outlinedSecondary: {
          borderColor: "rgba(82, 183, 136, 0.5)",
          color: "#52B788",
          "&:hover": {
            borderColor: "#52B788",
            background: "rgba(82, 183, 136, 0.1)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: "rgba(15, 23, 42, 0.45) !important",
          backdropFilter: "blur(12px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
          borderRadius: 16,
          color: "#ffffff",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "rgba(15, 23, 42, 0.6) !important",
          backdropFilter: "blur(12px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
          borderRadius: 16,
          color: "#ffffff",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "rgba(6, 6, 12, 0.75) !important",
          backdropFilter: "blur(16px) saturate(180%)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "none",
        },
      },
    },
  },
});

export default theme;
