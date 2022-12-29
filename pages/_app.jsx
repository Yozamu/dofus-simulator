import '../styles/globals.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from '../components/layout/Layout';

const fontColor = '#b0de00'; // or 9ce900

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: fontColor,
      contrastText: '#303030',
    },
    background: {
      default: '#303030',
      paper: '#424242',
    },
    text: {
      primary: '#fff',
      secondary: '#fff',
    },
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          backgroundColor: fontColor,
        },
      },
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
