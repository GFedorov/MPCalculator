import { CartProvider } from "../components/context/Cart";
import { MainProvider } from "../components/context/Main";
import "../scss/style.scss";
export default function App({ Component, pageProps }) {
  return (
    <MainProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </MainProvider>
  );
}
