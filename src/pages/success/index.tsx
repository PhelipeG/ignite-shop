import { stripe } from "@/lib/stripe";
import { ImageContainer, SuccessContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Stripe } from "stripe";

interface SuccessProps {
  costumerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
}

export default function SuccessOrderPage({
  costumerName,
  product,
}: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada</h1>
        <ImageContainer>
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={200}
            height={200}
          />
        </ImageContainer>
        <p>
          Uhuul <strong>{costumerName} </strong>, sua{" "}
          <strong>{product.name}</strong> já está a caminho da sua casa.
        </p>
        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = String(query.session_id);

  if (!sessionId) {
    //redirect do getServerSideProps
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });
  const costumerName = session?.customer_details?.name;
  const product = session.line_items?.data[0].price?.product as Stripe.Product;
  return {
    props: {
      costumerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  };
};
