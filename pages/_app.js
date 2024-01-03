import '@/styles/globals.css'
import '@/styles/login.css';
import Navbar from '@/src/navbar';
import Footer from '@/src/footer';

export default function App({ Component, pageProps }) {
  return <><Navbar/><Component {...pageProps} /><Footer/></>
}
