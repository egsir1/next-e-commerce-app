import React from "react";

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <div className="mb-5 bg-gray-200 p-3 font-bold  flex justify-between flex-wrap">
      {["User Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step, index) => (
          <div
            key={step}
            className={`flex-1 border-b-2  
          text-center 
       ${
         index <= activeStep
           ? "border-blue-800   text-blue-800"
           : "border-gray-500 text-gray-500"
       }
          
       `}
          >
            {step}
          </div>
        )
      )}
    </div>
  );
}
