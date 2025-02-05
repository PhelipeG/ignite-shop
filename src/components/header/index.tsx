import { HeaderContainer, ShoppingCartButton } from "./styles";
import { Handbag } from "phosphor-react";
import LogoImg from "@/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useCartContext } from "@/contexts/CartShoppingContext";
import { useState } from "react";
import { keyframes } from "@stitches/react";
import { CartShopping } from "../cartShopping";

export function Header() {
  const { cartShopping } = useCartContext();
  const [cartShoppingIsOpen, setCartShoppingIsOpen] = useState(false);
  const [animation, setAnimation] = useState("");

  const openAnimation = keyframes({
    "0%": { transform: "translateX(100%)" },
    "100%": { transform: "translateX(0%)" },
  });

  const closeAnimation = keyframes({
    "0%": { transform: "translateX(0%)" },
    "100%": { transform: "translateX(100%)" },
  });

  function openCartShopping() {
    setAnimation(`${openAnimation} 200ms`);
    setCartShoppingIsOpen(true);
  }
  function closeCartShopping() {
    setAnimation(`${closeAnimation} 200ms`);

    setTimeout(() => {
      setCartShoppingIsOpen(false);
    }, 200);
  }

  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={LogoImg} alt="" />
      </Link>

      <ShoppingCartButton onClick={openCartShopping}>
        {cartShopping.length > 0 && <span>{cartShopping.length}</span>}

        <Handbag weight="bold" size={24} />
      </ShoppingCartButton>

      {cartShoppingIsOpen && (
        <CartShopping
          styles={{ animation: `${animation}` }}
          closeCartShopping={closeCartShopping}
        />
      )}
    </HeaderContainer>
  );
}
