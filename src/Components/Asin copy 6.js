import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Header1 from "./Header1";

const Asin = () => {
  const [asin, setAsin] = useState("");
  const [country, setCountry] = useState("IN");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [price, setPrice] = useState(100);
  const [feeDetails, setFeeDetails] = useState({});
  const [dailySales, setDailySales] = useState(0);
  const [responseId, setResponseId] = React.useState("");
  const [responseState, setResponseState] = React.useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

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

  console.log("userData===suman", userData?._id);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = src;

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const calculateFees = () => {
    let referralFee;
    let closingFee;
    const taxRate = 0.18;
    if (price <= 300) {
      referralFee = price * 0.05;
    } else if (price > 300 && price <= 500) {
      referralFee = price * 0.09;
    } else if (price > 500) {
      referralFee = price * 0.13;
    }
    if (price <= 250) {
      closingFee = 4;
    } else if (price > 250 && price <= 500) {
      closingFee = 9;
    } else if (price > 500 && price <= 1000) {
      closingFee = 30;
    } else if (price > 1000) {
      closingFee = 61;
    }

    const tax = (referralFee + closingFee) * taxRate;
    const costPerUnit = referralFee + closingFee + tax;
    const totalCost = price + costPerUnit;
    setFeeDetails({
      price,
      referralFee,
      closingFee,
      tax,
      costPerUnit,
      totalCost,
    });
  };

  const calculateDailySales = (itemPrice) => {
    const estimatedDailySales = itemPrice * 0.1;
    setDailySales(estimatedDailySales);
  };

  useEffect(() => {
    if (price) {
      calculateFees();
    }
  }, [price]);

  const handleProductClick = (url) => {
    window.location.href = url;
  };

  console.log("data====", data);

  const handlePayment = () => {
    setShowPaymentModal(false);
    // Initiate payment process (Razorpay or other)
    console.log("Proceeding to payment...");
  };

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
      const response = await axios.post(
        "https://api.proleverageadmin.in/orders",
        {
          amount: 100, // Amount in paise (₹1997)
          currency: "INR",
        }
      );
      setOrderId(response.data.order_id); // Save order ID for later verification
      return response.data.order_id;
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
    }
  };

  // Handle the Razorpay payment screen
  // const handlePayment1 = async () => {
  //   const isRazorpayLoaded = await loadRazorpayScript();
  //   if (!isRazorpayLoaded) {
  //     alert("Failed to load Razorpay. Please try again.");
  //     return;
  //   }

  //   const orderId = await createOrder();
  //   if (!orderId) return;

  //   const options = {
  //     key: "rzp_live_yzuuxyiOlu7Oyj", // Replace with your Razorpay key
  //     amount: 100, // Amount in paise
  //     currency: "INR",
  //     name: "Your Company Name",
  //     description: "Payment for additional search count",
  //     order_id: orderId,
  //     handler: async function (response) {
  //       try {
  //         await verifyPayment(response.razorpay_payment_id);
  //         alert("Payment successful! 500 searches added to your account.");
  //       } catch (error) {
  //         console.error("Payment verification failed:", error);
  //         alert("Payment verification failed. Please contact support.");
  //       }
  //     },
  //     prefill: {
  //       name: "Customer Name",
  //       email: "customer@example.com",
  //     },
  //     theme: {
  //       color: "#3399cc",
  //     },
  //   };

  //   const rzp1 = new window.Razorpay(options);
  //   rzp1.open();
  // };

  const handlePayment1 = async () => {
    // if (!userData) {
    //   alert("User not logged in. Please log in and try again.");
    //   return;
    // }

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
        name: "Your Company Name",
        description: "Payment for additional search count",
        order_id: orderId,
        handler: async function (response) {
          try {
            // Call backend to verify the payment
            const verifyResponse = await axios.get(
              `https://api.proleverageadmin.in/api/payment/payment/${response.razorpay_payment_id}`,
              {
                params: { userId: "672f4cab5ec0d6f27393a10e" }, // Pass userId as query parameter
              }
            );
            if (verifyResponse.data.paymentStatus) {
              alert("Payment successful! Search count updated.");
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            alert("Payment verification failed. Please contact support.");
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
      rzp1.open();
    } catch (error) {
      console.error("Error handling payment:", error);
      alert("Failed to process payment. Please try again.");
    }
  };

  // // Verify payment and update user search limit
  // const verifyPayment = async (paymentId) => {
  //   try {
  //     await axios.get(
  //       `https://api.proleverageadmin.in/api/payment/payment/${paymentId}`,
  //       {
  //         params: { userId: "672f4cab5ec0d6f27393a10e" },
  //       }
  //     );
  //   } catch (error) {
  //     console.error("Error verifying payment:", error);
  //   }
  // };

  const handleSearch = async () => {
    if (!asin) {
      setError("Please enter a valid ASIN.");
      return;
    }

    setLoading(true);
    setError(""); // Clear any previous errors

    try {
      const response = await axios.get(
        "https://api.proleverageadmin.in/api/amazon/affiliatekeyword1",
        {
          params: { asin, country, userId: "672f4cab5ec0d6f27393a10e" },
        }
      );

      if (response.data.data && Object.keys(response.data.data).length > 0) {
        setData(response.data.data); // Set data if valid
      } else {
        setData([]); // Clear data if response is empty
        setError("ASIN code is incorrect or no data available.");
      }
    } catch (err) {
      // setError(
      //   "Failed to fetch data. Please check the ASIN code and try again."
      // );
      const backendError =
        err.response?.data?.error || "An unexpected error occurred.";
      setShowPaymentModal(true);
      setError(backendError);
      console.error("Error fetching data:", err.message);
    }

    setLoading(false);
  };

  console.log("data", data);

  return (
    <div className="container">
      <div className="row justify-content-center web-tools">
        <div className="col-md-12">
          <div className="row">
            <div className="row mt-3 mb-3" style={{ justifyContent: "center" }}>
              <div className="col-md-2">
                <div
                  className="poppins-regular"
                  style={{
                    backgroundColor: "darkblue",
                    color: "white",
                    textAlign: "center",
                    padding: "10px",
                    borderRadius: "5px",
                    fontSize: "14px",
                  }}
                >
                  ASIN/Product
                </div>
              </div>

              <div className="col-md-2">
                <Link to="/product-search" style={{ textDecoration: "none" }}>
                  <div
                    className="poppins-regular"
                    style={{
                      // backgroundColor: "darkblue",
                      border: "1px solid darkblue",
                      color: "black",
                      textAlign: "center",
                      padding: "10px",
                      borderRadius: "5px",
                      fontSize: "14px",
                    }}
                  >
                    Keyword
                  </div>
                </Link>
              </div>

              {/* <div className="col-md-2">
                <div
                  // onClick={() => createRazorpayOrder(100)}
                  onClick={handlePayment1}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="poppins-regular"
                    style={{
                      // backgroundColor: "darkblue",
                      border: "1px solid darkblue",
                      color: "black",
                      textAlign: "center",
                      padding: "10px",
                      borderRadius: "5px",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    Pay Now
                  </div>
                </div>
              </div> */}
            </div>
            {/* <div
              className="mb-4"
              style={{ color: "black", fontSize: "20px", fontWeight: "bold" }}
            >
              Welcome Proleverage
            </div> */}

            <div className="col-md-6">
              <h5
                className="poppins-medium"
                style={{
                  fontSize: "15px",
                  color: "darkblue",
                  fontWeight: "bold",
                }}
              >
                Search by ASIN
              </h5>
              <div className="row mt-3 mb-3">
                <div className="col-md-12">
                  {/* <select
                    className="form-select"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="IN">amazon.in</option>
                    <option value="US">amazon.com</option>
                  </select> */}
                  <div className="custom-select-container">
                    <select
                      className="form-select custom-select"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <option value="IN" className="flag-option">
                        amazon.in
                      </option>
                      <option value="US" className="flag-option">
                        amazon.com
                      </option>
                    </select>
                    <div className="flag-container">
                      {country === "IN" && (
                        <img
                          src="https://flagcdn.com/w40/in.png"
                          alt="India Flag"
                          className="flag-icon"
                        />
                      )}
                      {country === "US" && (
                        <img
                          src="https://flagcdn.com/w40/us.png"
                          alt="United States Flag"
                          className="flag-icon"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-3 mb-3">
                <div className="col-md-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="B0D3R1JQ7D"
                    value={asin}
                    onChange={(e) => setAsin(e.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <button
                    className="btn btn-primary search_icon"
                    type="submit"
                    // onClick={search}
                    onClick={handleSearch}
                    disabled={loading} // Disable button while loading
                  >
                    {loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      "Search"
                    )}
                  </button>
                </div>
              </div>
              {error && (
                <div className="alert alert-danger mt-3 poppin-regular">
                  {error}
                </div>
              )}

              {!data && !Object.keys(data).length && !error && (
                <div className="alert alert-warning mt-3">
                  No data available for the entered ASIN code.
                </div>
              )}

              {data && Object.keys(data).length > 0 && (
                <div>
                  <Link
                    to="/asin-details"
                    state={{ data, dailySales: dailySales }}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div className="row mt-3" key={data.asin}>
                      <div className="col-2">
                        <img
                          src={data.product_photo}
                          alt={data.product_title}
                          style={{ width: "100%", height: "100px" }}
                        />
                      </div>
                      <div
                        className="col-10 d-flex"
                        style={{
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          className="poppins-regular"
                          style={{
                            color: "grey",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {data.product_title}
                        </div>
                        <div className="poppins-medium">
                          {data.country === "US"
                            ? `$${data.product_price}`
                            : `Rs. ${data.product_price}`}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {dailySales > 0 && (
                <div style={{ marginTop: "20px" }}>
                  <h2 className="poppins-medium" style={{ color: "blue" }}>
                    FBA fee: {dailySales.toFixed(2)}
                  </h2>
                </div>
              )}
              {data.length === 0 && (
                <div className="row mt-2">
                  <div className="poppins-black pb-2">Search Products</div>
                  <div className="col-4">
                    <div
                      className="d-flex"
                      style={{ justifyContent: "center" }}
                    >
                      <img
                        src="./images/yogamat.jpg"
                        alt="loading....."
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "10px",
                        }}
                      />
                    </div>

                    <div className="poppins-regular pt-1 text-center">
                      Yoga Mat
                    </div>
                  </div>
                  <div className="col-4">
                    <div
                      className="d-flex"
                      style={{ justifyContent: "center" }}
                    >
                      <img
                        src="./images/ear.jpg"
                        alt="loading....."
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "10px",
                        }}
                      />
                    </div>
                    <div className="poppins-regular pt-1 text-center">
                      Ear buds
                    </div>
                  </div>
                  <div className="col-4">
                    <div
                      className="d-flex"
                      style={{ justifyContent: "center" }}
                    >
                      <img
                        src="./images/mobile.jpg"
                        alt="loading....."
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "10px",
                        }}
                      />
                    </div>
                    <div className="poppins-regular pt-1 text-center">
                      Mobiles
                    </div>
                  </div>

                  <div className="col-4 mt-3">
                    <div
                      className="d-flex"
                      style={{ justifyContent: "center" }}
                    >
                      <img
                        src="./images/dress.jpg"
                        alt="loading....."
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "10px",
                        }}
                      />
                    </div>
                    <div className="poppins-regular pt-1 text-center">
                      Tables
                    </div>
                  </div>

                  <div className="col-4 mt-3">
                    <div
                      className="d-flex"
                      style={{ justifyContent: "center" }}
                    >
                      <img
                        src="./images/jewellery.png"
                        alt="loading....."
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "10px",
                        }}
                      />
                    </div>
                    <div className="poppins-regular pt-1 text-center">
                      Jewellery
                    </div>
                  </div>

                  <div className="col-4 mt-3">
                    <div
                      className="d-flex"
                      style={{ justifyContent: "center" }}
                    >
                      <img
                        src="./images/pen.png"
                        alt="loading....."
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "10px",
                        }}
                      />
                    </div>
                    <div className="poppins-regular pt-1 text-center">Pen</div>
                  </div>

                  <div className="col-4 mt-3">
                    <div
                      className="d-flex"
                      style={{ justifyContent: "center" }}
                    >
                      <img
                        src="./images/shoes.png"
                        alt="loading....."
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "10px",
                        }}
                      />
                    </div>
                    <div className="poppins-regular pt-1 text-center">
                      Shoes
                    </div>
                  </div>

                  <div className="col-4 mt-3">
                    <div
                      className="d-flex"
                      style={{ justifyContent: "center" }}
                    >
                      <img
                        src="./images/toy.jfif"
                        alt="loading....."
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "10px",
                        }}
                      />
                    </div>
                    <div className="poppins-regular pt-1 text-center">
                      Toys & Games
                    </div>
                  </div>

                  <div className="col-4 mt-3">
                    <div
                      className="d-flex"
                      style={{ justifyContent: "center" }}
                    >
                      <img
                        src="./images/car.jpg"
                        alt="loading....."
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "10px",
                        }}
                      />
                    </div>
                    <div className="poppins-regular pt-1 text-center">
                      Car & Motorbike
                    </div>
                  </div>

                  <div className="col-4 mt-3">
                    <div
                      className="d-flex"
                      style={{ justifyContent: "center" }}
                    >
                      <img
                        src="./images/electronic.png"
                        alt="loading....."
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "10px",
                        }}
                      />
                    </div>
                    <div className="poppins-regular pt-1 text-center">
                      Electronics
                    </div>
                  </div>

                  <div className="col-4 mt-3">
                    <div
                      className="d-flex"
                      style={{ justifyContent: "center" }}
                    >
                      <img
                        src="./images/bp.jfif"
                        alt="loading....."
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "10px",
                        }}
                      />
                    </div>
                    <div className="poppins-regular pt-1 text-center">
                      Health & Personal Care
                    </div>
                  </div>

                  <div className="col-4 mt-3">
                    <div
                      className="d-flex"
                      style={{ justifyContent: "center" }}
                    >
                      <img
                        src="./images/science.jfif"
                        alt="loading....."
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "10px",
                        }}
                      />
                    </div>
                    <div className="poppins-regular pt-1 text-center">
                      Industrial & Scientific
                    </div>
                  </div>

                  <div className="col-4 mt-3">
                    <div
                      className="d-flex"
                      style={{ justifyContent: "center" }}
                    >
                      <img
                        src="./images/music.png"
                        alt="loading....."
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "10px",
                        }}
                      />
                    </div>
                    <div className="poppins-regular pt-1 text-center">
                      Musical Instruments
                    </div>
                  </div>

                  <div className="col-4 mt-3">
                    <div
                      className="d-flex"
                      style={{ justifyContent: "center" }}
                    >
                      <img
                        src="./images/pet.png"
                        alt="loading....."
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "10px",
                        }}
                      />
                    </div>
                    <div className="poppins-regular pt-1 text-center">
                      Pet Supplies
                    </div>
                  </div>

                  <div className="col-4 mt-3">
                    <div
                      className="d-flex"
                      style={{ justifyContent: "center" }}
                    >
                      <img
                        src="./images/sports.png"
                        alt="loading....."
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "10px",
                        }}
                      />
                    </div>
                    <div className="poppins-regular pt-1 text-center">
                      Sports, Fitness & Outdoor
                    </div>
                  </div>

                  <div className="col-4 mt-3">
                    <div
                      className="d-flex"
                      style={{ justifyContent: "center" }}
                    >
                      <img
                        src="./images/watch.jpg"
                        alt="loading....."
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "10px",
                        }}
                      />
                    </div>
                    <div className="poppins-regular pt-1 text-center">
                      Watch
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="col-md-6">
              <h1 className="poppins-medium" style={{ color: "darkblue" }}>
                FBA Fee Calculator
              </h1>

              <div className="row mt-3 mb-3">
                <div className="col-md-10">
                  <input
                    className="form-control"
                    placeholder="Enter ASIN"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>
                <div className="col-md-2">
                  <button
                    className="btn btn-primary poppins-medium"
                    type="button"
                    onClick={calculateFees}
                  >
                    Calculate
                  </button>
                </div>
              </div>

              {feeDetails.price !== undefined && (
                <div>
                  <h2 className="poppins-medium" style={{ color: "darkblue" }}>
                    Fee Details
                  </h2>
                  <p className="poppins-regular">
                    Price:{" "}
                    <span className="poppins-light">
                      {feeDetails.price.toFixed(2)}
                    </span>
                  </p>
                  <p className="poppins-regular">
                    Referral Fee:{" "}
                    <span className="poppins-light">
                      {feeDetails.referralFee.toFixed(2)}
                    </span>
                  </p>
                  <p className="poppins-regular">
                    Closing Fee:{" "}
                    <span className="poppins-light">
                      {feeDetails.closingFee.toFixed(2)}
                    </span>
                  </p>
                  <p className="poppins-regular">
                    Tax:{" "}
                    <span className="poppins-light">
                      {feeDetails.tax.toFixed(2)}
                    </span>
                  </p>
                  <p className="poppins-regular">
                    Cost per unit:{" "}
                    <span className="poppins-light">
                      {feeDetails.costPerUnit.toFixed(2)}
                    </span>
                  </p>
                  <p className="poppins-regular">
                    Total Cost:{" "}
                    <span className="poppins-light">
                      {feeDetails.totalCost.toFixed(2)}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className=" mobile-tools">
        <div className="row" style={{}}>
          <div className="col-6">
            <div
              className="poppins-regular"
              style={{
                backgroundColor: "darkblue",
                color: "white",

                textAlign: "center",
                padding: "10px",
                borderRadius: "5px",
                fontSize: "14px",
              }}
            >
              ASIN/Product
            </div>
          </div>

          <div className="col-6">
            <Link to="/product-search" style={{ textDecoration: "none" }}>
              <div
                className="poppins-regular"
                style={{
                  // backgroundColor: "darkblue",
                  border: "1px solid darkblue",
                  color: "black",

                  textAlign: "center",
                  padding: "10px",
                  borderRadius: "5px",
                  fontSize: "14px",
                }}
              >
                Keyword
              </div>
            </Link>
          </div>
        </div>

        <div className="d-flex mt-3">
          <div className="col-10">
            <i
              className="fa-solid fa-magnifying-glass"
              style={{
                position: "absolute",

                marginTop: "14px",
                marginLeft: "15px",
              }}
            ></i>
            <input
              type="text"
              className="col-12 poppins-regular"
              placeholder="ASIN Search"
              value={asin}
              onChange={(e) => setAsin(e.target.value)}
              style={{
                outline: "none",
                height: "45px",
                paddingLeft: "45px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid lightgrey",
              }}
            />
          </div>

          <div className="col-md-2 mx-2">
            <div
              className=" search_icon "
              type="submit"
              // onClick={search}
              onClick={handleSearch}
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <i
                  onClick={handleSearch}
                  className="fa-solid fa-magnifying-glass"
                  style={{
                    fontSize: "20px",
                    backgroundColor: "darkblue",
                    color: "white",
                    padding: "12px",
                    borderRadius: "5px",
                  }}
                ></i>
              )}
            </div>
          </div>
        </div>

        {/* {error && (
          <div className="alert alert-danger mt-2" role="alert">
            {error}
          </div>
        )} */}

        {data.length > 0 ? (
          <div>
            {data.map((item) => (
              <Link
                to="/product-details"
                state={{ data, dailySales: dailySales }}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="row mt-3" key={item.ASIN}>
                  <div className="col-4">
                    <img
                      // onClick={() =>
                      //   handleProductClick(
                      //     `https://www.amazon.in/dp/${item?.ASIN}`
                      //   )
                      // }
                      // src={item.Images.Primary.Medium.URL}
                      src={item.product_photo}
                      alt={item.product_title}
                      style={{ width: "100%", height: "100px" }}
                    />
                  </div>
                  <div
                    className="col-8 d-flex"
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      className="poppins-regular"
                      style={{
                        color: "grey",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.product_title}
                    </div>
                    <div className="poppins-medium">
                      Rs. {item.product_price}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // <div className="poppins-medium mt-3" style={{ color: "red" }}>
          //   No data found
          // </div>
          ""
        )}

        {/* {dailySales > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h2 className="poppins-medium" style={{ color: "blue" }}>
              FBA fee: {dailySales.toFixed(2)}
            </h2>
          </div>
        )} */}

        {data.length === 0 && (
          <div className="row mt-2">
            <div className="poppins-black pb-2">Search Products</div>
            <div className="col-4">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/yogamat.jpg"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>

              <div className="poppins-regular pt-1 text-center">Yoga Mat</div>
            </div>
            <div className="col-4">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/ear.jpg"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="poppins-regular pt-1 text-center">Ear buds</div>
            </div>
            <div className="col-4">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/mobile.jpg"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="poppins-regular pt-1 text-center">Mobiles</div>
            </div>

            <div className="col-4 mt-3">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/dress.jpg"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="poppins-regular pt-1 text-center">Tables</div>
            </div>

            <div className="col-4 mt-3">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/jewellery.png"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="poppins-regular pt-1 text-center">Jewellery</div>
            </div>

            <div className="col-4 mt-3">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/pen.png"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="poppins-regular pt-1 text-center">Pen</div>
            </div>

            <div className="col-4 mt-3">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/shoes.png"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="poppins-regular pt-1 text-center">Shoes</div>
            </div>

            <div className="col-4 mt-3">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/toy.jfif"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="poppins-regular pt-1 text-center">
                Toys & Games
              </div>
            </div>

            <div className="col-4 mt-3">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/car.jpg"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="poppins-regular pt-1 text-center">
                Car & Motorbike
              </div>
            </div>

            <div className="col-4 mt-3">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/electronic.png"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="poppins-regular pt-1 text-center">
                Electronics
              </div>
            </div>

            <div className="col-4 mt-3">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/bp.jfif"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="poppins-regular pt-1 text-center">
                Health & Personal Care
              </div>
            </div>

            <div className="col-4 mt-3">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/science.jfif"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="poppins-regular pt-1 text-center">
                Industrial & Scientific
              </div>
            </div>

            <div className="col-4 mt-3">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/music.png"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="poppins-regular pt-1 text-center">
                Musical Instruments
              </div>
            </div>

            <div className="col-4 mt-3">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/pet.png"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="poppins-regular pt-1 text-center">
                Pet Supplies
              </div>
            </div>

            <div className="col-4 mt-3">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/sports.png"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="poppins-regular pt-1 text-center">
                Sports, Fitness & Outdoor
              </div>
            </div>

            <div className="col-4 mt-3">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/watch.jpg"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="poppins-regular pt-1 text-center">Watch</div>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        <Modal
          centered
          show={showPaymentModal}
          onHide={() => setShowPaymentModal(false)}
          dialogClassName="custom-modal"
        >
          {/* <Modal.Header closeButton>
            <Modal.Title className="custom-title">Subscription</Modal.Title>
          </Modal.Header> */}
          <Modal.Body className="custom-body">
            <div className="modal-content-wrapper">
              <div className="plan basic-plan">
                <div className="plan-icon">
                  <img
                    src="https://via.placeholder.com/80"
                    alt="Basic Plan Icon"
                  />
                </div>
                <div className="plan-details">
                  <h3 className="plan-title">Basic</h3>
                  <p className="plan-description">
                    25+ episodic series, 10+ movies & specials! Watch on any
                    phone, tablet, computer, or TV.
                  </p>
                  <h4 className="plan-price">₹1997/month</h4>
                  <Button
                    variant="primary"
                    className="custom-proceed-button"
                    onClick={handlePayment1}
                  >
                    Buy Plan
                  </Button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Asin;
