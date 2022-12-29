import '../styles/globals.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from '../components/layout/Layout';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#b0de00', // or 9ce900
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
