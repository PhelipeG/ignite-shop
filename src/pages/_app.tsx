import { globalStyles } from "@/styles/global";
import { Container, Content } from "@/styles/pages/app";
import type { AppProps } from "next/app";
import { CartShoppingProvider } from "@/contexts/CartShoppingContext";
import { Header } from "@/components/header";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartShoppingProvider>
      <Container>
        <Content>
          <Header />
          <Component {...pageProps} />
        </Content>
      </Container>
    </CartShoppingProvider>
  );
}
