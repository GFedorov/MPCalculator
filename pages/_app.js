import { MainProvider } from "../components/context/Main";
import "../scss/style.scss";
export default function App({ Component, pageProps }) {
  return <MainProvider>
    <Component {...pageProps} />
  </MainProvider>;
}
