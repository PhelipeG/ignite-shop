import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export const getProductById = async (id: string) => {
  try {
    const response = await stripe.products.retrieve(id, {
      expand: ["default_price"],
    });
    const price = response.default_price as Stripe.Price;

    return {
      id: response.id,
      name: response.name,
      imageUrl: response.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: price.currency,
      }).format((price.unit_amount ?? 0) / 100),
      description: response.description,
    };
  } catch (error) {
    console.error("Erro ao buscar produto no Stripe:", error);
    throw new Error("Erro ao buscar produto no Stripe");
  }
};
