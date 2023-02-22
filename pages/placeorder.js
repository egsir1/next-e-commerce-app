import CheckoutWizard from "@/components/CheckoutWizard";
import Layout from "@/components/Layout";
import { getError } from "@/utils/error";
import { Store } from "@/utils/Store";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Placeorder() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  const shippingPrice =
    itemsPrice > 99000 ? 0 : 5000 && itemsPrice === 0 ? 0 : 5000;
  const totalPrice = round2(itemsPrice + shippingPrice);

  const router = useRouter();

  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router]);
  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/orders", {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: "CART_CLEAR_ITEMS" });
      Cookies.set(
        "cart",
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <main className="bg-gray-200 h-auto">
      <Layout title="place-order">
        <CheckoutWizard activeStep={3} />
        <h1 className="mb-4 text-xl text-center  font-bold">Place Order</h1>
        {cartItems.length === 0 ? (
          <div className="text-center h-60">
            Cart is empty.{" "}
            <Link className="text-center text-blue-600 mt-2" href="/">
              Go shopping
            </Link>
          </div>
        ) : (
          <div className="grid p-3 md:grid-cols-4 md:gap-5">
            <div className=" md:col-span-3">
              <div className="mb-2 p-5" style={{ border: "1px solid #ccc" }}>
                <h2 className="mb-2 text-center text-lg">Shipping Address</h2>
                <div>
                  {shippingAddress.fullName}, {shippingAddress.address},{" "}
                  {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                  {shippingAddress.country}
                </div>
                <div>
                  <Link className="text-blue-600 " href="/shipping">
                    Edit
                  </Link>
                </div>
              </div>
              <div className="p-5 mb-2 " style={{ border: "1px solid #ccc" }}>
                <h2 className="mb-2 text-lg text-center">Payment Method</h2>
                <div>{paymentMethod}</div>
                <div>
                  <Link className="text-blue-600" href="/payment">
                    Edit
                  </Link>
                </div>
              </div>
              <div className="py-5 mb-2" style={{ border: "1px solid #ccc" }}>
                <h2 className="mb-2 text-lg text-center">Order Items</h2>
                <table className="min-w-full">
                  <thead
                    className="border-b"
                    style={{
                      borderBottom: "2px solid #ccc",
                    }}
                  >
                    <tr>
                      <th className="px-5 text-left">Item</th>
                      <th className="p-5 text-right">Quantity</th>
                      <th className="p-5 text-right">Price</th>
                      <th className="p-5 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr
                        key={item._id}
                        style={{ borderBottom: "2px solid #ccc" }}
                      >
                        <td>
                          <Link
                            href={`/product/${item.slug}`}
                            className="flex text-center items-center"
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
                        <td className="p-5 text-right">{item.quantity}</td>
                        <td className="p-5 text-right">{item.price}</td>
                        <td className="p-5 text-right">
                          ₩ {item.quantity * item.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div>
                  <Link href="/cart" className="text-blue-600 ml-5">
                    Edit
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-5" style={{ border: "1px solid #ccc" }}>
              <h2 className="mb-2 text-center font-semibold text-lg">
                Order Summary
              </h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Items</div>
                    <div>₩ {itemsPrice}</div>
                  </div>
                </li>
                {/* <li>
                  <div className="mb-2 flex justify-between">
                    <div>Tax</div>
                    <div>₩ {taxPrice}</div>
                  </div>
                </li> */}
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Delivery fee</div>
                    <div>₩ {shippingPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Total</div>
                    <div>₩ {totalPrice}</div>
                  </div>
                </li>
                <li>
                  {totalPrice === 0 ? (
                    <div className="text-center mt-3">
                      <Link
                        className="bg-gray-800 cursor-pointer hover:opacity-80 focus:opacity-90 w-full"
                        style={{
                          color: "#4cf2f5",
                          border: "2px solid '#4cf2f5",
                          padding: "0.5rem",
                          borderRadius: "4px",
                          fontSize: "18px",
                        }}
                        href="/"
                      >
                        Go Shopping
                      </Link>
                    </div>
                  ) : (
                    <button
                      style={{
                        color: "#4cf2f5",
                        border: "2px solid '#4cf2f5",
                        padding: "0.5rem",
                        borderRadius: "4px",
                        fontSize: "18px",
                      }}
                      disabled={loading}
                      onClick={placeOrderHandler}
                      className="bg-gray-800 cursor-pointer hover:opacity-80 focus:opacity-90 w-full"
                    >
                      {loading ? "Loading..." : "Place Order"}
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
        )}
      </Layout>
    </main>
  );
}
Placeorder.auth = true;
