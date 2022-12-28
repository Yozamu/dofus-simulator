import '../styles/globals.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from '../components/layout/Layout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#b0de00',
      contrastText: '#303030',
    },
    background: {
      default: '#303030',
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
