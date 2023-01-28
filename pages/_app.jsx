import '../styles/globals.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from '../components/layout/Layout';
import { WindowContextProvider } from '../components/layout/WindowContext';

const fontColor = '#b0de00'; // or 9ce900

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: fontColor,
    },
    background: {
      paper: '#424242',
    },
    text: {
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
      <WindowContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WindowContextProvider>
    </ThemeProvider>
  );
}
