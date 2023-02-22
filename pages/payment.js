import CheckoutWizard from "@/components/CheckoutWizard";
import Layout from "@/components/Layout";
import { Store } from "@/utils/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Payment() {
  const router = useRouter();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  function submitHandler(e) {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error("Payment method is required");
    }
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );
    router.push("/placeorder");
  }

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    }
    setSelectedPaymentMethod(paymentMethod || "");
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <main className="bg-gray-200 ">
      <Layout title="payment-method">
        <CheckoutWizard activeStep={2} />

        <form
          className="mx-auto h-60  max-w-screen-md"
          onSubmit={submitHandler}
        >
          <h1 className="mb-4 text-center text-xl">Payment Method</h1>
          {["PayPal", "Direct Transaction"].map((payment) => (
            <div key={payment} className="mb-4 px-4">
              <input
                name="paymentMethod"
                className="p-2 outline-none focus:ring-0"
                id={payment}
                type="radio"
                checked={selectedPaymentMethod === payment}
                onChange={() => setSelectedPaymentMethod(payment)}
              />
              <label className="p-2" htmlFor={payment}>
                {payment}
              </label>
            </div>
          ))}
          <div className="mb-4 flex justify-around">
            <button
              style={{ border: "1px solid #ccc" }}
              onClick={() => router.push("/shipping")}
              type="button"
              className="default-button bg-gray-700  text-white"
            >
              Back
            </button>
            <button
              style={{ border: "2px solid #4cf2f5", color: "#4cf2f5" }}
              className="primary-button bg-gray-800"
            >
              Next
            </button>
          </div>
        </form>
      </Layout>
    </main>
  );
}
Payment.auth = true;
