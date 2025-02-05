import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });
  const product = response.data.map((item) => {
    const price = item.default_price as Stripe.Price;

    return {
      id: item.id,
      name: item.name,
      imageUrl: item.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: price.currency,
      }).format((price.unit_amount ?? 0) / 100),
    };
  });
  return product;
};
