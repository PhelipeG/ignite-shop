/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/product";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { getProducts } from "@/services/get-products";
import Head from "next/head";
import { useCartContext } from "@/contexts/CartShoppingContext";

interface Product {
  id: string;
  imageUrl: string;
  name: string;
  price: string;
  description?: string;
  defaultPriceId: string;
  quantity: number;
  unitAmount: number;
}

interface ProductPageProps {
  product: Product;
}

export default function ProductPage({ product }: ProductPageProps) {
  const { addProduct } = useCartContext();
  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image
            src={product.imageUrl}
            width={520}
            height={480}
            alt={product.name}
          />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>R$ {product.price}</span>
          <p>
            {product.description ||
              "Descrição não disponível para este produto."}
          </p>
          <button type="button" onClick={() => addProduct(product)}>
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id;

  if (!productId) {
    return {
      notFound: true,
    };
  }
  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });
  const price = product.default_price as Stripe.Price;
  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        unitAmount: price.unit_amount,
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id,
        quantity: 1,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hours
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  // Obtenha uma lista de todos os IDs de produto.
  // Certifique-se de implementar a função `getAllProductIds` em seu serviço,
  // ou substitua por outra lógica que retorne um array de strings (IDs).
  const productIds = await getProducts();
  const paths = productIds.map((product) => ({
    params: { id: product.id },
  }));

  return {
    paths,
    fallback: "blocking", // Pode ser "blocking", "true" ou "false", conforme sua estratégia.
  };
};
// fallback -> true -> gera a página no servidor e salva em cache
// fallback -> blocking -> gera a página no servidor e salva em cache
// fallback -> false -> gera a página no build time
