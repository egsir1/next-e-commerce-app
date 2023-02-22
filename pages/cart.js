import Layout from "@/components/Layout";
import { Store } from "@/utils/Store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { BiXCircle } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";
import dynamic from "next/dynamic";
import axios from "axios";
import { toast } from "react-toastify";

function CartScreen() {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const router = useRouter();

  function removeHandler(item) {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  }

  async function updateCartHandler(item, qty) {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      return toast.error("Sorry, Product is out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
    return toast.success("Product updated in the cart");
  }
  return (
    <Layout title="Shopping Cart">
      <div className="bg-gray-100 h-auto">
        <h1 className=" text-center mb-8 font-bold text-xl"> Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="h-80">
            <div className="flex justify-center ">
              Cart is empty.
              <Link href="/">
                <span className="flex mx-2 text-lg  text-blue-600  items-center">
                  Go shopping{" "}
                  <BiChevronRight style={{ marginTop: "0.25rem" }} />
                </span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 md:gap-5 ">
            <div className="overflow-x-auto text-lg md:col-span-3">
              <table className="min-w-full">
                <thead
                  className="border-b"
                  style={{ borderBottom: "1px solid #ccc" }}
                >
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="p-5 text-right">Quantity</th>
                    <th className="p-5 text-right">Price</th>
                    <th className="p-5">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr
                      key={item.slug}
                      className="border-b"
                      style={{ borderBottom: "1px solid #ccc" }}
                    >
                      <td className="text-center">
                        <Link
                          className=" flex items-center"
                          href={`/product/${item.slug}`}
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                          &nbsp;
                          {item.name}
                        </Link>
                      </td>
                      <td className="p-5 text-right">
                        <select
                          className="bg-gray-100"
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartHandler(item, e.target.value)
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-5 text-right">{item.price}</td>
                      <td className="p-5 text-center">
                        <button onClick={() => removeHandler(item)}>
                          <BiXCircle className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="cardCheckout p-5">
              <ul>
                <li>
                  <div
                    className="pb-3 text-xl flex justify-between"
                    style={{ letterSpacing: "1.5px" }}
                  >
                    <span>
                      {" "}
                      Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)})
                      :{" "}
                    </span>
                    <span>
                      ₩{" "}
                      {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                    </span>
                  </div>
                </li>
                <li className="text-center">
                  <button
                    style={{
                      background: "#03162e",
                      fontSize: "18px",
                      padding: " 0.25rem 1rem",
                      borderRadius: "4px",
                      color: "#4cf2f5",
                    }}
                    onClick={() => router.push(`login?redirect=/shipping`)}
                  >
                    Checkout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
