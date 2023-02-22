import Layout from "@/components/Layout";
import Product from "@/models/Product";
//import data from "@/utils/data";
import db from "@/utils/db";
import { Store } from "@/utils/Store";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { toast } from "react-toastify";

export default function ProductDetail({ product }) {
  const router = useRouter();

  const { state, dispatch } = useContext(Store);

  // const product = data.products.find((x) => x.slug === slug);
  // console.log(product);
  // console.log(slug);

  if (!product) {
    return (
      <Layout title="not-found">
        <main className="bg-gray-200">
          <h2>Product Not Found</h2>
        </main>
      </Layout>
    );
  }

  async function addToCartHandler() {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Sorry, Product is out of stock");
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  }
  return (
    <Layout title={product.name}>
      <div className="bg-white text-black text-center">
        <div className="py-2">
          <Link className="flex text-blue-500  items-center px-2 mb-2" href="/">
            <span className="mr-1">
              {" "}
              <AiOutlineArrowLeft />
            </span>{" "}
            <span> back to products</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-3">
          <div className="md:col-span-2">
            <Image
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
            />
          </div>
          <div>
            <ul>
              <li>
                <h1 className="text-lg font-bold">{product.name}</h1>
              </li>
              <li>Catogory: {product.category}</li>
              <li>Rating: {product.rating}</li>
              <li>Description: {product.description}</li>
            </ul>
          </div>
          <div className=" lg:mr-2 rounded-lg mb-1  font-semibold">
            <div>Price: ₩ {product.price} </div>
            <div>
              {product.countInStock > 0 ? (
                <span>In Stock </span>
              ) : (
                <span className="text-red-500"> Out of Stock</span>
              )}
            </div>
            <button
              onClick={addToCartHandler}
              type="button"
              // disabled={true}
              className="productButton w-80 md:w-60 bg-gray-800 p-2 rounded-lg hover:opacity-80"
              style={{
                border: "3px solid #4cf2f5",
                cursor: "pointer",
                fontSize: "18px",
                color: "#4cf2f5",
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}

//   const addScript = () => {
//       const s = document.createElement('script')
//       s.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit')
//       s.setAttribute('id', id)
//       const q = document.getElementById(id)
//       if (!q) {
//         document.body.appendChild(s)
//         window.googleTranslateElementInit = googleTranslateElementInit
//       }
//     }

//     const removeScript = () => {
//       const q = document.getElementById(id)
//       if (q) q.remove()
//       const w = document.getElementById('google_translate_element')
//       if (w) w.innerHTML = ''
//     }

//     isFallback || addScript()

//     events.on('routeChangeStart', removeScript)
//     events.on('routeChangeComplete', addScript)

//     return () => {
//       events.off('routeChangeStart', removeScript)
//       events.off('routeChangeComplete', addScript)
//     }
//   }, [])

//   return <Component {...pageProps} />
// }

// export default MyApp
// https://github.com/i18next/next-i18next#readme
