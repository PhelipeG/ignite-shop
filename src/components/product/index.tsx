import { HomeContainer, Product } from "@/styles/pages/home";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import Link from "next/link";

interface ProductsProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    unitAmount: number;
    quantity: number;
    description?: string;
  }[];
}

export default function Products({ products }: ProductsProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => {
        return (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            prefetch={false}
          >
            <Product className="keen-slider__slide">
              <Image src={product.imageUrl} width={520} height={480} alt="" />
              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
                <span>{product.description}</span>
              </footer>
            </Product>
          </Link>
        );
      })}
    </HomeContainer>
  );
}
