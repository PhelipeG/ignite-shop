import { createContext, ReactNode, useContext, useState } from "react";

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

interface CartShoppingContextData {
  cartShopping: Product[];
  addProduct: (item: Product) => void;
  removeProduct: (item: Product) => void;
}
// Criando o contexto com um valor padrão
const CartShoppingContext = createContext({} as CartShoppingContextData);

// Hook personalizado para facilitar o uso do contexto
export const useCartContext = () => {
  const context = useContext(CartShoppingContext);
  if (!context) {
    throw new Error("useAppContext deve ser usado dentro de um AppProvider");
  }
  return context;
};

export const CartShoppingProvider = ({ children }: { children: ReactNode }) => {
  const [cartShopping, setCartShopping] = useState<Product[]>([]);

  function addProduct(item: Product) {
    const filteredProduct = cartShopping.filter(
      (product) => product.id === item.id
    );
    if (filteredProduct.length > 0) {
      return;
    } else {
      setCartShopping([...cartShopping, { ...item, quantity: 1 }]);
    }
  }
  function removeProduct(item: Product) {
    const filteredProduct = cartShopping.filter(
      (product) => product.id !== item.id
    );
    setCartShopping(filteredProduct);
  }

  return (
    <CartShoppingContext.Provider
      value={{
        cartShopping,
        addProduct,
        removeProduct,
      }}
    >
      {children}
    </CartShoppingContext.Provider>
  );
};
