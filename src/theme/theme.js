import { createTheme } from '@mui/material/styles';

// VS Code Dark Theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#007acc',
      light: '#4fa3d1',
      dark: '#005a9e',
    },
    secondary: {
      main: '#68217a',
    },
    background: {
      default: '#1e1e1e',
      paper: '#252526',
    },
    text: {
      primary: '#cccccc',
      secondary: '#858585',
    },
    divider: '#3e3e3e',
    action: {
      hover: 'rgba(255, 255, 255, 0.1)',
      selected: 'rgba(255, 255, 255, 0.15)',
    },
  },
  typography: {
    fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace",
    fontSize: 13,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
    },
  },
});

// VS Code Light Theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#007acc',
      light: '#4fa3d1',
      dark: '#005a9e',
    },
    secondary: {
      main: '#68217a',
    },
    background: {
      default: '#ffffff',
      paper: '#f3f3f3',
    },
    text: {
      primary: '#3c3c3c',
      secondary: '#616161',
    },
    divider: '#e5e5e5',
    action: {
      hover: 'rgba(0, 0, 0, 0.05)',
      selected: 'rgba(0, 0, 0, 0.1)',
    },
  },
  typography: {
    fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace",
    fontSize: 13,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },
  },
});
