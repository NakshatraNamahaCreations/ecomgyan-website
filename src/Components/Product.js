import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Product = () => {
  const [query, setQuery] = useState("");
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
        "https://api.proleverageadmin.in/api/payment/orders",
        {
          amount: 1.0, // Amount in paise (₹1.00)
          currency: "INR",
          userId: userData?._id, // Pass user ID from localStorage
        }
      );
      return response.data.orderId;
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
  //   if (!orderId) {
  //     alert("Failed to create order. Please try again.");
  //     return;
  //   }

  //   const options = {
  //     key: "rzp_live_yzuuxyiOlu7Oyj", // Replace with your Razorpay key
  //     amount: 1.0, // Amount in paise
  //     currency: "INR",
  //     name: "Your Company Name",
  //     description: "Payment for additional search count",
  //     order_id: orderId,
  //     handler: async function (response) {
  //       console.log("Payment successful. Response:", response);
  //       await verifyPayment(response.razorpay_payment_id);
  //       alert("Payment successful! 500 searches added to your account.");
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
    // setIsLoading(true); // Disable button while processing
    const isRazorpayLoaded = await loadRazorpayScript();
    if (!isRazorpayLoaded) {
      alert("Failed to load Razorpay. Please try again.");
      // setIsLoading(false);
      return;
    }

    const orderId = await createOrder();
    if (!orderId) {
      alert("Failed to create order. Please try again.");
      // setIsLoading(false);
      return;
    }

    const options = {
      key: "rzp_live_yzuuxyiOlu7Oyj",
      amount: 1.0,
      currency: "INR",
      name: "Your Company Name",
      description: "Payment for additional search count",
      order_id: orderId,
      handler: async function (response) {
        await verifyPayment(response.razorpay_payment_id);
        alert("Payment successful! 500 searches added to your account.");
        window.location.assign("/product-search");
        setShowPaymentModal(false);
        // setIsLoading(false); // Re-enable button after success
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  // Verify payment and update user search limit
  const verifyPayment = async (paymentId) => {
    try {
      await axios.get(
        `https://api.proleverageadmin.in/api/payment/payment/${paymentId}`,
        {
          params: { userId: userData?._id },
        }
      );
    } catch (error) {
      console.error("Error verifying payment:", error);
    }
  };

  const handleSearch = async () => {
    if (!query) {
      setError("Please enter a search term.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        "https://api.proleverageadmin.in/api/amazon/getitems1",
        {
          params: { query, userId: userData?._id, country }, // Pass the user ID
        }
      );
      setData(response.data.data.products || []);
    } catch (err) {
      console.log("err", err);
      if (err.response?.status === 403) {
        // setError("Search limit reached. Please pay to continue searching.");
        const backendError =
          err.response?.data?.error || "An unexpected error occurred.";
        setShowPaymentModal(true);
        setError(backendError);
        setShowPaymentModal(true);
      } else {
        setError("Failed to fetch data. Please try again.");
      }
      console.error(err.message);
    }
    setLoading(false);
  };

  console.log("data", data);

  return (
    <div className="container">
      <div className="row justify-content-center web-tools">
        <div className="col-md-10 p-3">
          <div className="row mt-3 mb-4" style={{ justifyContent: "center" }}>
            <div className="col-md-2">
              {/* <Link to="/asin-code" style={{ textDecoration: "none" }}> */}
              <Link to="/asin-code" style={{ textDecoration: "none" }}>
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
                  ASIN/Product
                </div>
              </Link>
            </div>

            <div className="col-md-2">
              <Link to="/product-search" style={{ textDecoration: "none" }}>
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
                  Keyword
                </div>
              </Link>
            </div>

            {/* <div className="col-md-2">
              <div
                onClick={handlePayment1}
                className="poppins-regular"
                style={{
                  backgroundColor: "darkblue",
                  color: "white",
                  textAlign: "center",
                  padding: "10px",
                  borderRadius: "5px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Pay Now
              </div>
            </div> */}
          </div>

          <div className="search-container">
            <div className="row">
              <div className="col-md-3">
                {/* <select
                  className="form-select mb-3"
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
              <div className="col-md-9 d-flex">
                <input
                  className="input_box mr-3"
                  type="text"
                  placeholder="Search by ASIN, Product Name, or Category"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  style={{ marginBottom: "20px" }}
                />

                {/* <div className="col-md-2 mt-5" style={{ paddingTop: "7px" }}> */}
                <button
                  className="btn btn-primary search_icon"
                  type="submit"
                  onClick={handleSearch}
                  style={{ height: "40px" }}
                  disabled={loading} // Disable button while loading
                >
                  {loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    "Search"
                  )}
                </button>
                {/* </div> */}
              </div>
              {/* <div className="col-md-2">
                <button
                  className="btn btn-primary search_icon"
                  type="submit"
                  onClick={search}
                >
                  Search
                </button>
              </div> */}
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {data.length > 0 ? (
              <div>
                {data?.map((item) => (
                  <Link
                    to="/product-details"
                    state={{ data: item, dailySales: dailySales }}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div className="row mt-3" key={item.asin}>
                      <div className="col-2">
                        {/* {item.Images?.Primary?.Medium?.URL && ( */}
                        <div
                          className="d-flex"
                          style={{ justifyContent: "center" }}
                        >
                          <img
                            // onClick={() =>
                            //   handleProductClick(
                            //     `https://www.amazon.in/dp/${item.ASIN}`
                            //   )
                            // }

                            src={item.product_photo}
                            alt={item.product_title}
                            style={{ width: "100px", height: "100px" }}
                          />
                        </div>
                        {/* )} */}
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
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {item.product_title}
                        </div>
                        <div
                          className="poppins-regular"
                          style={{
                            color: "grey",
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {item.asin}
                        </div>

                        <div className="poppins-regular">
                          Rating : {item.product_num_ratings}
                        </div>

                        <div className="poppins-medium">
                          price :{" "}
                          {data.country === "USD"
                            ? `$${item.product_price}`
                            : ` ${item.product_price}`}
                          {/* price : ₹ {item.product_price} */}
                        </div>
                      </div>
                    </div>
                  </Link>
                  // </a>
                ))}
              </div>
            ) : (
              // <div className="poppins-medium mt-3" style={{ color: "red" }}>
              //   No data found
              // </div>
              ""
            )}

            {data.length === 0 && (
              <div className="row mt-2">
                <div className="poppins-black pb-4">Top Products</div>
                <div className="col-2">
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

                  <div className="poppins-regular pt-1 text-center">
                    Yoga Mat
                  </div>
                </div>
                <div className="col-2">
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
                  <div className="poppins-regular pt-1 text-center">
                    Ear buds
                  </div>
                </div>
                <div className="col-2">
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
                  <div className="poppins-regular pt-1 text-center">
                    Mobiles
                  </div>
                </div>

                <div className="col-2 mt-3">
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

                <div className="col-2 mt-3">
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
                  <div className="poppins-regular pt-1 text-center">
                    Jewellery
                  </div>
                </div>

                <div className="col-2 mt-3">
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

                <div className="col-2 mt-3">
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

                <div className="col-2 mt-3">
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

                <div className="col-2 mt-3">
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

                <div className="col-2 mt-3">
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

                <div className="col-2 mt-3">
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

                <div className="col-2 mt-3">
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

                <div className="col-2 mt-3">
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

                <div className="col-2 mt-3">
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

                <div className="col-2 mt-3">
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

                <div className="col-2 mt-3">
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
          </div>
        </div>
      </div>

      <div className="mobile-tools mt-3">
        <div className="row" style={{}}>
          <div className="col-6">
            <Link to="/asin-code" style={{ textDecoration: "none" }}>
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
                ASIN/Product
              </div>
            </Link>
          </div>

          <div className="col-6">
            <Link to="/product-search" style={{ textDecoration: "none" }}>
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
              placeholder="Keyword Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
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
          {/* <div className="col-2">
            <i
              onClick={search}
              className="fa-solid fa-magnifying-glass"
              style={{
                fontSize: "20px",
                backgroundColor: "darkblue",
                color: "white",
                padding: "12px",
                borderRadius: "5px",
              }}
            ></i>
          </div> */}
          <div className="col-md-2">
            <div
              // className="btn btn-primary search_icon"
              type="submit"
              onClick={handleSearch}
              disabled={loading}
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

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-5">
          {data.length > 0 ? (
            <div>
              {data?.map((item) => (
                // <Link
                //   to="/product-details"
                //   state={{ data: item, dailySales: dailySales }}
                //   style={{ textDecoration: "none", color: "black" }}
                // >
                <a
                  href={item.product_url}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className="row mt-3" key={item.asin}>
                    <div className="col-4">
                      {/* {item.Images?.Primary?.Medium?.URL && ( */}
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
                      {/* )} */}
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
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {item.product_title}
                      </div>
                      <div
                        className="poppins-regular"
                        style={{
                          color: "grey",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {item.asin}
                      </div>
                      <div className="poppins-regular">
                        Rating : {item.product_num_ratings}
                      </div>

                      <div className="poppins-medium">
                        price : ₹ {item.product_price}
                      </div>
                    </div>
                  </div>
                </a>
                // {/* </Link> */}
              ))}
            </div>
          ) : (
            // <div className="poppins-medium mt-3" style={{ color: "red" }}>
            //   No data found
            // </div>
            ""
          )}
        </div>

        {data.length === 0 && (
          <div className="row mt-2">
            <div className="poppins-black pb-2">Top Products</div>
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
      </div>

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
                  Buy this plan and get 500 searches free for a month
                </p>
                <h4 className="plan-price">₹1997/month</h4>
                <Button
                  onClick={handlePayment1}
                  variant="primary"
                  className="custom-proceed-button"
                  // onClick={handlePayment}
                >
                  Buy Plan
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Product;
