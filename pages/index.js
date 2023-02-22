// import Banner from "@/components/Banner";
import Banner from "@/components/Banner";
import Layout from "@/components/Layout";
import ProductItem from "@/components/ProductItem";
import Product from "@/models/Product";
//import data from "@/utils/data";
import db from "@/utils/db";
import { Store } from "@/utils/Store";
import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function Home({ products }) {
  // console.log(data);

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  async function addToCartHandler(product) {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Sorry, Product is out of stock");
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });

    toast.success("Product added to the cart");
  }
  return (
    <Layout title="Home Page">
      <main className=" mx-auto">
        <Banner />
      </main>
      <div className="grid grid-cols-2 mt-3 gap-4  md:grid-cols-3  lg:grid-cols-4 lg:mr-3 md:mr-2 ">
        {products.map((product) => (
          <ProductItem
            addToCartHandler={addToCartHandler}
            key={product.slug}
            product={product}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
