/* eslint-disable @typescript-eslint/no-explicit-any */
import { CircleNotch, Minus, Plus, TrashSimple, X } from "phosphor-react";
import {
  Actions,
  CartShoppingContainer,
  CloseButton,
  ImageContainer,
  Info,
  Item,
  Items,
  PurchaseDetails,
} from "./styles";
import Image from "next/image";
import { useCartContext } from "@/contexts/CartShoppingContext";
import { useState } from "react";

interface CartShoppingProps {
  styles: any;
  closeCartShopping: () => void;
}

export function CartShopping({ styles, closeCartShopping }: CartShoppingProps) {
  const { cartShopping } = useCartContext();
  const amount = cartShopping.reduce((acc, product) => {
    return acc + product.unitAmount * product.quantity;
  }, 0);
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  async function handleBuyButton() {
    try {
      setIsCreatingCheckoutSession(true);
      const response = await axios.post("/api/checkout", {
        priceId: product.defaultPriceId,
      });
      const { checkoutUrl } = response.data;
      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);
      alert("Falha ao redirecionar ao checkout!");
      console.log(err);
    }
  }

  return (
    <CartShoppingContainer style={styles}>
      <CloseButton onClick={closeCartShopping}>
        <X weight="bold" size={24} />
      </CloseButton>

      <h2>Sacola de compras</h2>

      <Items>
        {cartShopping.map((product) => {
          return (
            <Item key={product.id}>
              <ImageContainer>
                <Image src={product.imageUrl} width={100} height={100} alt="" />
              </ImageContainer>

              <Info>
                <span>{product.name}</span>
                <strong>{product.price}</strong>
              </Info>

              <Actions>
                <div className="quantity">
                  {/* <button onClick={() => decreaseItemQuantity(product)}>
                    <Minus weight="bold" color="white" size={14} />
                  </button>

                  <span>{product.quantity}</span>

                  <button onClick={() => increaseItemQuantity(product)}>
                    <Plus weight="bold" color="white" size={14} />
                  </button> */}
                </div>

                {/* <button className="remove" onClick={() => removeItem(product)}>
                  <TrashSimple weight="bold" color="white" size={14} />
                  Remover
                </button> */}
              </Actions>
            </Item>
          );
        })}
      </Items>

      <PurchaseDetails>
        <div>
          <p>Quantidade</p>
          <span>{cartShopping.length} items</span>
        </div>

        <div>
          <p>Valor total</p>
          <span>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(amount / 100)}
          </span>
        </div>

        <button onClick={handleBuyButton} disabled={isCreatingCheckoutSession}>
          {isCreatingCheckoutSession ? (
            <CircleNotch className="loading" weight="bold" />
          ) : (
            "Finalizar compra"
          )}
        </button>
      </PurchaseDetails>
    </CartShoppingContainer>
  );
}
