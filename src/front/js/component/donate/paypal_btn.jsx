import React, { useRef, useEffect } from "react";
import Swal from "sweetalert2";

export const Paypal = () => {
  const paypal = useRef();
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Donation",
                amount: {
                  currency_code: "USD",
                  value: 1,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          Swal.fire({
            icon: "success",
            title: "Gracias por tu donación!",
            showConfirmButton: false,
            timer: 2500,
            background: "#222328",
            color: "#FFFFFF",
          });
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);
  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
};

export const PaypalFive = () => {
  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Donation",
                amount: {
                  currency_code: "USD",
                  value: 5,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          Swal.fire({
            icon: "success",
            title: "Gracias por tu donación!",
            showConfirmButton: false,
            timer: 2500,
            background: "#222328",
            color: "#FFFFFF",
          });
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);
  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
};
