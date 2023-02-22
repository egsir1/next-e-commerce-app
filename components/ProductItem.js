import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <div
      className="card   "
      style={{ boxShadow: "0 0px 4px rgba(0,0,0,0.35)" }}
    >
      <Link href={`/product/${product.slug}`}>
        <div className="rounded-md">
          <Image
            style={{ objectFit: "fill" }}
            src={product.image}
            alt={product.name}
            className="rounded-md shadow"
            width={200}
            height={200}
          />
        </div>
      </Link>

      <div className="flex flex-col items-center text-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>

        {/* <p className="mb-2">{product.description}</p> */}

        <p style={{ letterSpacing: "4px" }}>₩ {product.price}</p>
        <button
          style={{
            background: "#4cf2f5",
            color: "black",
            fontSize: "18px",
            fontWeight: "bold",
            marginTop: "0.5rem",
          }}
          className="w-full primary-button hover:opacity-80"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
