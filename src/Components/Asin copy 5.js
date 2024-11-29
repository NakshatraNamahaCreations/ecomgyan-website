import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const CombinedComponent = () => {
  const [asinNo, setAsinNo] = useState("");
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

  const createRazorpayOrder = (amount) => {
    let data = JSON.stringify({
      amount: amount * 1,
      currency: "INR",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.proleverageadmin.in/orders",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        handleRazorpayScreen(response.data.amount);
      })
      .catch((error) => {
        console.log("error at", error);
      });
  };

  const handleRazorpayScreen = async (amount) => {
    const res = await loadScript("https:/checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Some error at razorpay screen loading");
      return;
    }

    const options = {
      key: "rzp_live_yzuuxyiOlu7Oyj",
      amount: amount,
      currency: "INR",
      name: "Proleverage coders",
      description: "payment to Proleverage coders",
      image: "https://papayacoders.com/demo.png",
      handler: function (response) {
        setResponseId(response.razorpay_payment_id);
      },
      prefill: {
        name: "papaya coders",
        email: "papayacoders@gmail.com",
      },
      theme: {
        color: "#F4C430",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const paymentFetch = (e) => {
    e.preventDefault();

    const paymentId = e.target.paymentId.value;

    axios
      .get(`https://api.proleverageadmin.in/payment/${paymentId}`)
      .then((response) => {
        console.log(response.data);
        setResponseState(response.data);
      })
      .catch((error) => {
        console.log("error occures", error);
      });
  };

  // const search = async () => {
  //   if (!asinNo) {
  //     setError("Please enter ASIN");
  //     return;
  //   }

  //   try {
  //     const res = await axios.get(`https://api.proleverageadmin.in/api/amazon/getitems`, {
  //       params: { asinNo },
  //     });

  //     if (res.status === 200) {
  //       setData(res.data.ItemsResult.Items);
  //       console.log("res.data.ItemsResult.Items", res.data.ItemsResult.Items);
  //       setError("");
  //       if (res.data.ItemsResult.Items.length > 0) {
  //         const itemPrice =
  //           res.data.ItemsResult.Items[0]?.Offers?.Listings[0]?.Price?.Amount ||
  //           0;
  //         calculateDailySales(itemPrice);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setError("Error fetching data. Please try again.");
  //   }
  // };

  // const search = async () => {
  //   if (!asinNo) {
  //     setError("Please enter ASIN");
  //     return;
  //   }

  //   try {
  //     const res = await axios.get(`https://api.proleverageadmin.in/api/amazon/getitems`, {
  //       params: {
  //         asinNo,
  //         userId: "672f4cab5ec0d6f27393a10e",
  //       },
  //     });

  //     if (res.data.showPaymentModal) {
  //       setShowPaymentModal(true);
  //     } else {
  //       setData(res.data.data.ItemsResult.Items || []);
  //       setError("");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setError("Error fetching data. Please try again.");
  //   }
  // };

  // const search = async () => {
  //   if (!asinNo) {
  //     setError("Please enter ASIN");
  //     return;
  //   }

  //   try {
  //     const res = await axios.get(`https://api.proleverageadmin.in/api/amazon/getitems`, {
  //       params: { asinNo, userId: "672f4cab5ec0d6f27393a10e" },
  //     });

  //     if (res.data.showPaymentModal) {
  //       // setShowPaymentModal(true);
  //       alert("Free search limit reached. Please make a payment.");
  //     } else {
  //       setData(res.data.data.ItemsResult.Items || []);
  //       setError("");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setError("Error fetching data. Please try again.");
  //   }
  // };
  // Working Condition
  const search = async () => {
    if (!asinNo) {
      setError("Please enter ASIN");
      return;
    }
    setLoading(true);

    try {
      const res = await axios.get(
        `https://api.proleverageadmin.in/api/amazon/getitems`,
        {
          params: {
            asinNo,
            // userId: userData?._id,
            userId: "672f4cab5ec0d6f27393a10e",
          },
        }
      );

      if (res.data.showPaymentModal) {
        alert("Free search limit reached. Please make a payment.");
      } else {
        setData(res.data.data.ItemsResult.Items || []);
        setError("");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError(error.response.data.message);
        // window.location.assign("/payment");
        handlePayment1();
      } else {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again.");
      }
    }
    setLoading(false);
  };

  console.log("data", data);

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
  const handlePayment1 = async () => {
    const isRazorpayLoaded = await loadRazorpayScript();
    if (!isRazorpayLoaded) {
      alert("Failed to load Razorpay. Please try again.");
      return;
    }

    const orderId = await createOrder();
    if (!orderId) return;

    const options = {
      key: "rzp_live_yzuuxyiOlu7Oyj", // Replace with your Razorpay key
      amount: 100, // Amount in paise
      currency: "INR",
      name: "Your Company Name",
      description: "Payment for additional search count",
      order_id: orderId,
      handler: async function (response) {
        try {
          await verifyPayment(response.razorpay_payment_id);
          alert("Payment successful! 500 searches added to your account.");
          setShowPaymentModal(false);
        } catch (error) {
          console.error("Payment verification failed:", error);
          alert("Payment verification failed. Please contact support.");
        }
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
      await axios.get(`https://api.proleverageadmin.in/payment/${paymentId}`, {
        params: { userId: userData?._id },
      });
    } catch (error) {
      console.error("Error verifying payment:", error);
      throw new Error("Payment verification failed.");
    }
  };

  return (
    <div className="container mt-3 mb-3">
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

              <div className="col-md-2">
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
              </div>
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
                <div className="col-md-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter ASIN"
                    value={asinNo}
                    onChange={(e) => setAsinNo(e.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <button
                    className="btn btn-primary search_icon"
                    type="submit"
                    onClick={search}
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
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {/* <div
                className="poppins-medium mt-1"
                style={{ color: "darkblue" }}
              >
                Try Our Keyword Research Tool for Amazon!
              </div>

              <div className="poppins-regular mt-2">
                Find more keywords for your Amazon product listing effortlessly
                with our Amazon Keyword Research Tool. Get insights on search
                volume, competition, sales, and revenue data.Try our Amazon
                Keyword Tool for free today.
              </div> */}

              {/* {data.length > 0 && (
                <div>
                  {data.map((item) => (
                    <div className="row">
                      <div className="poppins-medium">Product Information</div>
                      <div className="poppins-regular">ASIN: {item.ASIN}</div>
                      {item.Images?.Primary?.Medium?.URL && (
                        <img
                          onClick={() =>
                            handleProductClick(
                              `https://www.amazon.in/dp/${item.ASIN}`
                            )
                          }
                          src={item.Images.Primary.Medium.URL}
                          alt={item.Title}
                          style={{ width: "150px", height: "150px" }}
                        />
                      )}
                      <div className="poppins-medium">
                        Rs. {item.Offers?.Listings[0]?.Price?.Amount || 0}
                      </div>
                      <div className="poppins-regular">
                        {item.ItemInfo?.Title.DisplayValue}
                      </div>
                      {item.SalesRank && (
                        <div className="poppins-regular">
                          Website Sales Rank: {item.SalesRank}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {dailySales > 0 && (
                <div style={{ marginTop: "20px" }}>
                  <h2 className="poppins-medium" style={{ color: "blue" }}>
                    FBA fee: {dailySales.toFixed(2)}
                  </h2>
                </div>
              )} */}

              {data.length > 0 ? (
                <div>
                  {data.map((item) => (
                    <Link
                      to="/product-details"
                      state={{ data: item, dailySales: dailySales }}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div className="row mt-3" key={item.ASIN}>
                        <div className="col-4">
                          {item.Images?.Primary?.Medium?.URL && (
                            <img
                              onClick={() =>
                                handleProductClick(
                                  `https://www.amazon.in/dp/${item?.ASIN}`
                                )
                              }
                              src={item.Images.Primary.Medium.URL}
                              alt={item.Title}
                              style={{ width: "100%", height: "100px" }}
                            />
                          )}
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
                            {item.ItemInfo?.Title.DisplayValue}
                          </div>
                          <div className="poppins-medium">
                            Rs. {item.Offers?.Listings[0]?.Price?.Amount || 0}
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
              value={asinNo}
              onChange={(e) => setAsinNo(e.target.value)}
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
              onClick={search}
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
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
                state={{ data: item, dailySales: dailySales }}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="row mt-3" key={item.ASIN}>
                  <div className="col-4">
                    {item.Images?.Primary?.Medium?.URL && (
                      <img
                        onClick={() =>
                          handleProductClick(
                            `https://www.amazon.in/dp/${item.ASIN}`
                          )
                        }
                        src={item.Images.Primary.Medium.URL}
                        alt={item.Title}
                        style={{ width: "100%", height: "100px" }}
                      />
                    )}
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
                      {item.ItemInfo?.Title.DisplayValue}
                    </div>
                    <div className="poppins-medium">
                      Rs. {item.Offers?.Listings[0]?.Price?.Amount || 0}
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
          show={showPaymentModal}
          onHide={() => setShowPaymentModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Payment Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You have used all 10 free searches. Please pay ₹199 to continue
            using the service.
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowPaymentModal(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handlePayment}>
              Proceed to Pay
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default CombinedComponent;
