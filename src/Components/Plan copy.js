import axios from "axios";
import React, { useEffect, useState } from "react";

const Plan = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [plandata, setplandata] = useState([]);

  const [userData, setUserdata] = useState(null);

  useEffect(() => {
    // Retrieve the user data from localStorage
    const userdata = localStorage.getItem("user");

    if (userdata) {
      try {
        // Parse the JSON string into an object
        const parsedUser = JSON.parse(userdata);

        // Set the _id in state
        setUserdata(parsedUser);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    } else {
      console.log("No user data found in localStorage.");
    }
  }, []);
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Payment gateway
  const createOrder = async () => {
    try {
      const response = await axios.post("http://localhost:8082/orders", {
        amount: 100, // Amount in paise (₹1997)
        currency: "INR",
      });
      setOrderId(response.data.order_id); // Save order ID for later verification
      return response.data.order_id;
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
    }
  };

  const handlePayment1 = async () => {
    const isRazorpayLoaded = await loadRazorpayScript();
    if (!isRazorpayLoaded) {
      alert("Failed to load Razorpay. Please try again.");
      return;
    }

    try {
      const orderId = await createOrder(); // Create Razorpay order
      if (!orderId) {
        throw new Error("Order ID not generated");
      }

      const options = {
        key: "rzp_live_yzuuxyiOlu7Oyj", // Replace with your Razorpay key
        amount: 100, // Amount in paise
        currency: "INR",
        name: "Proleveragea",
        description: "Payment for additional search count",
        order_id: orderId,
        handler: async function (response) {
          try {
            // Verify payment on the backend
            const verifyResponse = await axios.get(
              `http://localhost:8082/api/payment/payment/${response.razorpay_payment_id}`,
              {
                params: { userId: "6749afc4d3e0ef7428b5a09e" }, // Pass userId dynamically
              }
            );

            if (verifyResponse.data.paymentStatus) {
              // Redirect to success page
              setShowPaymentModal(false);
              window.location.href = "/asin-code";
            } else {
              // Redirect to failure page if payment status is false
              window.location.href = "/payment-failure";
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            // Redirect to failure page on error
            window.location.href = "/payment-failure";
          }
        },
        prefill: {
          name: userData?.name || "Customer Name",
          email: userData?.email || "customer@example.com",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);

      // Handle payment closure by the user
      rzp1.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        // Redirect to failure page on user closure
        window.location.href = "/payment-failure";
      });

      rzp1.open();
    } catch (error) {
      console.error("Error handling payment:", error);
      alert("Failed to process payment. Please try again.");
    }
  };
  const plans = [
    {
      icon: "📅",
      title: "Monthly Plan",
      price: "₹1,997",
      searches: "500 searches/month",
      buttonText: "Buy Now",
    },
    {
      icon: "⭐",
      title: "6 Months Plan",
      price: "₹10,997",
      searches: "3,300 searches (300 extra)",
      save: "Save 10%",
      buttonText: "Buy Now",
    },
    {
      icon: "➕",
      title: "Yearly Plan",
      price: "₹20,997",
      searches: "6,500 searches (500 extra)",
      save: "Save 24%",
      buttonText: "Buy Now",
    },
  ];

  useEffect(() => {
    getallplan();
  }, []);

  const getallplan = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8082/api/plans/getallplan"
      );
      if (response.status === 200) {
        setplandata(response.data.data);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  console.log("plandata", plandata);

  return (
    <div className="pricingSection">
      {/* {plans.map((plan, index) => (
        <div className="card" key={index}>
          <div className="icon">{plan.icon}</div>
          <h3 className="title poppins-regular">{plan.title}</h3>
          <h4 className="price poppins-semibold">{plan.price}</h4>
          <p className="searches poppins-regular">{plan.searches}</p>
          {plan.save && <p className="save poppins-regular">{plan.save}</p>}
          <button className="button poppins-medium" onClick={handlePayment1}>
            {plan.buttonText}
          </button>
        </div>
      ))} */}

      {plandata.map((plan, index) => (
        <div className="card" key={index}>
          {/* <div className="icon">{plan.imagelink}</div> */}
          <div className="d-flex" style={{ justifyContent: "center" }}>
            <img
              src={plan.imagelink}
              alt="loading...."
              style={{ width: "80px", height: "80px" }}
            />
          </div>
          <h3 className="title poppins-regular">{plan.planName}</h3>
          <h4 className="price poppins-semibold">₹ {plan.price}</h4>
          <p className="searches poppins-regular">
            {plan.searchCount} Searches
          </p>
          {/* {plan.save && <p className="save poppins-regular">{plan.save}</p>} */}
          <button className="button poppins-medium" onClick={handlePayment1}>
            {/* {plan.buttonText} */}
            Buy Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default Plan;
