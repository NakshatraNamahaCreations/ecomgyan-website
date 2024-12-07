import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Asindetails() {
  const location = useLocation();

  const data = location.state?.data;
  const dailySales = location.state?.dailySales;
  console.log("data=====", data);

  const [referralFee, setReferralFee] = useState(0);
  const [closingFee, setClosingFee] = useState(0);
  const [sales, setSales] = useState(0);
  const [costPerUnit, setCostPerUnit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [randomGeneratedNumber, setRandomGeneratedNumber] = useState(0);

  // Equivalent to initState
  useEffect(() => {
    calculateReferralFee();

    // calculateSales();

    // Equivalent of Future.delayed
    // setTimeout(() => {
    // calculateCostPerUnit();
    // }, 1200);
  }, [costPerUnit]); // Empty array to run effect only once on component mount

  const calculateReferralFee = () => {
    console.log("Price1 - ", data.product_price || 0);
    let price = parseFloat(data.product_price || 0);
    let finalPrice;
    console.log("Price2 - ", price);

    if (price <= 299) {
      finalPrice = price * 0.05;
      finalPrice = finalPrice * 1.18;
      finalPrice = parseFloat(finalPrice.toFixed(2));
      console.log("Price3 - ", finalPrice);
      setReferralFee(finalPrice);
      console.log("Price4 - ", finalPrice);
    } else if (price >= 300 && price <= 500) {
      finalPrice = price * 0.09;
      finalPrice = finalPrice * 1.18;
      finalPrice = parseFloat(finalPrice.toFixed(2));
      console.log("Price5 - ", finalPrice);
      setReferralFee(finalPrice);
      console.log("Price6 - ", finalPrice);
    } else if (price > 500) {
      finalPrice = price * 0.13;
      finalPrice = finalPrice * 1.18;
      finalPrice = parseFloat(finalPrice.toFixed(2));
      console.log("Price7 - ", finalPrice);
      setReferralFee(finalPrice);
      console.log("Price8 - ", finalPrice);
    }
  };

  const calculateCostPerUnit = () => {
    const referral = referralFee || 0;
    const closing = closingFee || 0;
    const fbaFee = data.country === "US" ? 2 : 80; // FBA Fee conditionally set based on country
    const price = parseFloat(data.product_price || 0); // Product price

    const totalCost = referral + closing + fbaFee;
    const cost = price + totalCost; // Subtract fees from product price
    setCostPerUnit(cost);
    console.log("CostPerUnit = ", cost);
  };

  useEffect(() => {
    calculateCostPerUnit();
  }, [referralFee, closingFee, data.product_price]);

  const copyToClipboard = (asin) => {
    // Check if the Clipboard API is available
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(asin).then(
        () => {
          alert("ASIN copied to clipboard!");
        },
        (err) => {
          console.error("Failed to copy: ", err);
          alert("Failed to copy ASIN. Please try again.");
        }
      );
    } else {
      // Fallback approach: Select and copy text manually
      fallbackCopyTextToClipboard(asin);
    }
  };

  // Fallback function to copy text manually if Clipboard API is not available
  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      const msg = successful
        ? "ASIN copied to clipboard!"
        : "Failed to copy ASIN";
      alert(msg);
    } catch (err) {
      console.error("Fallback: Unable to copy", err);
    }

    document.body.removeChild(textArea);
  };

  const handleProductClick = (url) => {
    window.location.href = url;
  };

  const convertSalesVolume = (volume) => {
    if (!volume) return 0;

    const match = volume.match(/^([\d.]+)([a-zA-Z]*)/);
    if (!match) return 0;

    const value = parseFloat(match[1]);
    const unit = match[2];

    const units = {
      K: 1_000,
      M: 1_000_000,
      B: 1_000_000_000,
    };

    return unit in units ? value * units[unit] : value;
  };

  const convertedVolume = convertSalesVolume(data.sales_volume || "");
  const productPrice = parseFloat(
    data.product_price.replace(/[^0-9.]/g, "") || 0
  );
  // const salesestimate = convertedVolume * productPrice;

  useEffect(() => {
    if (productPrice >= 0 && productPrice <= 250) {
      setClosingFee(25);
    } else if (productPrice >= 251 && productPrice <= 500) {
      setClosingFee(20);
    } else if (productPrice >= 501 && productPrice <= 1000) {
      setClosingFee(25);
    } else if (productPrice > 1000) {
      setClosingFee(50);
    } else {
      setClosingFee(0); // Fallback for invalid product price
    }
  }, [productPrice]);

  console.log("Closing Fee", closingFee);

  const salesestimate = convertedVolume;

  const Revenueestimate = convertedVolume * productPrice;

  console.log("Revenueestimate", Revenueestimate);

  console.log("Converted Sales Volume:", convertedVolume);
  console.log("Product Price:", productPrice);
  console.log("Sales Estimate:", salesestimate);

  // const generateRandomMultiplier = (min, max) => {
  //   // Generate a random number between min and max
  //   return Math.random() * (max - min) + min;
  // };

  // const generateRandomMultiplier = (min, max) => {
  //   // Generate a random number between min and max and fix to 3 decimal places
  //   const randomValue = Math.random() * (max - min) + min;
  //   return parseFloat(randomValue.toFixed(3)); // Ensure the result has 3 decimal places
  // };

  // const randomNumberGenerate = (salesestimate) => {
  //   const minMultiplier = 1.101; // Minimum multiplier
  //   const maxMultiplier = 1.501; // Maximum multiplier

  //   const randomMultiplier = generateRandomMultiplier(
  //     minMultiplier,
  //     maxMultiplier
  //   );
  //   console.log("Random Multiplier:", randomMultiplier);

  //   const result = randomMultiplier * salesestimate; // Multiply random multiplier with salesestimate
  //   console.log("Result:", result);

  //   return result.toFixed(2); // Return the result rounded to 2 decimal places
  // };

  // const randomGeneratedNumber = randomNumberGenerate(salesestimate);

  // console.log("Random Generated Number:", randomGeneratedNumber);

  const generateRandomMultiplier = (min, max) => {
    const randomValue = Math.random() * (max - min) + min;
    return parseFloat(randomValue.toFixed(3)); // Ensure the result has 3 decimal places
  };

  const randomNumberGenerate = (salesestimate) => {
    const minMultiplier = 1.101;
    const maxMultiplier = 1.501;

    const randomMultiplier = generateRandomMultiplier(
      minMultiplier,
      maxMultiplier
    );
    console.log("Random Multiplier:", randomMultiplier);

    const result = randomMultiplier * salesestimate; // Multiply random multiplier with salesestimate
    console.log("Result:", result);

    setRandomGeneratedNumber(result.toFixed(2)); // Update the state
  };

  // Call the random number generator once when the component mounts
  useEffect(() => {
    randomNumberGenerate(salesestimate);
  }, [salesestimate]);

  console.log("randomGeneratedNumber", randomGeneratedNumber);
  const revenue = randomGeneratedNumber * data?.product_price;

  console.log("revenue", revenue);
  return (
    <div className="container">
      <div className="row" style={{ justifyContent: "center" }}>
        <div className="col-12 col-md-8">
          <div
            className="mt-4 p-3 mb-4"
            style={{ backgroundColor: "#012a4a", borderRadius: "10px" }}
          >
            <div className="row">
              <div className="col-4 col-md-2">
                {/* {data.Images?.Primary?.Medium?.URL && ( */}
                <div className="d-flex" style={{ justifyContent: "center" }}>
                  <img
                    src={data.product_photo}
                    alt={data.product_title}
                    style={{ height: "100px" }}
                  />
                </div>
                {/* )} */}
              </div>

              <div
                className="col-8 d-flex col-md-10"
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  className="poppins-regular"
                  style={{
                    color: "white",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {data.product_title}
                </div>
                <div
                  className="poppins-regular pt-2 pb-2"
                  style={{ color: "white" }}
                >
                  {" "}
                  {data.asin}{" "}
                  <span onClick={() => copyToClipboard(data.ASIN)}>
                    <i className="fa-regular fa-copy mx-2"></i>
                  </span>
                </div>
                <div className="poppins-medium" style={{ color: "white" }}>
                  {/* <span style={{ textDecoration: "line-through" }}>
                 
                    {data.country === "US"
                      ? `$${data.product_original_price}`
                      : `Rs. ${data.product_original_price}`}
                  </span> */}
                  <span className="poppins-medium mx-1">
                    {" "}
                    {/* ₹ {data.product_price} */}
                    {data.country === "US"
                      ? `$${data.product_price}`
                      : `Rs. ${data.product_price}`}
                  </span>
                </div>
              </div>
            </div>
            {/* <div className="poppins-black">Asin Details Page</div>
        <p>Referral Fee: {referralFee}</p>
        <p>Closing Fee: {closingFee}</p>
        <p>Sales: {sales}</p>
        <p>Cost Per Unit: {costPerUnit}</p> */}
          </div>

          <div className="row mb-3">
            <div className="col-6">
              <div
                className="p-2"
                style={{ backgroundColor: "lightgrey", borderRadius: "5px" }}
              >
                <div
                  className="poppins-regular text-center"
                  style={{ fontWeight: "bold", fontSize: "13px" }}
                >
                  Ratings
                </div>

                <div
                  className="d-flex mt-3"
                  style={{ justifyContent: "center" }}
                >
                  <div
                    className="poppins-regular"
                    style={{
                      fontSize: "11px",
                      color: "#012a4a",
                      fontWeight: "bold",
                    }}
                  >
                    Star Rating
                    <span
                      className="poppins-regular mx-2"
                      style={{
                        fontSize: "11px",
                      }}
                    >
                      {/* {data.BrowseNodeInfo?.BrowseNodes[0]?.SalesRank ?? 0} */}
                      {data.product_star_rating}
                    </span>
                  </div>
                </div>

                <div
                  className="d-flex mt-3"
                  style={{ justifyContent: "center" }}
                >
                  <div
                    className="poppins-regular"
                    style={{
                      fontSize: "11px",
                      color: "#012a4a",
                      fontWeight: "bold",
                    }}
                  >
                    No of Ratings
                    <span
                      className="poppins-regular mx-2"
                      style={{
                        fontSize: "11px",
                      }}
                    >
                      {/* #{data.BrowseNodeInfo?.WebsiteSalesRank.SalesRank || 0} */}
                      {data.product_num_ratings}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6">
              <div
                className="p-2"
                style={{
                  backgroundColor: "lightgrey",
                  borderRadius: "5px",
                  height: "100px",
                }}
              >
                <div
                  className="poppins-regular text-center"
                  style={{
                    fontWeight: "bold",
                    fontSize: "13px",
                  }}
                >
                  Sales Estimate
                </div>

                <div
                  className="poppins-regular text-center mt-3"
                  style={{
                    fontSize: "11px",
                    color: "#012a4a",
                    fontWeight: "bold",
                  }}
                >
                  {randomGeneratedNumber}
                  <span>
                    <i
                      className="fa-solid fa-arrow-up mx-2"
                      style={{ fontSize: "14px", color: "blue" }}
                    ></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="d-flex p-3 mb-3"
            style={{
              backgroundColor: "lightgrey",
              justifyContent: "space-between",
              borderRadius: "10px",
            }}
          >
            <div
              className="poppins-regular"
              style={{ fontWeight: "bold", fontSize: "13px" }}
            >
              Revenue estimation
            </div>
            <div
              className="poppins-regular"
              style={{ fontWeight: "bold", fontSize: "13px" }}
            >
              {data.country === "US" ? `$${revenue}` : ` ₹ ${revenue}`}
              {/* {Revenueestimate} */}
            </div>
          </div>

          <div
            className="p-2 mb-3"
            style={{
              backgroundColor: "lightgrey",
              borderRadius: "5px",
            }}
          >
            <div
              className="poppins-regular text-center"
              style={{
                fontWeight: "bold",
                fontSize: "13px",
              }}
            >
              Amazon Fee Estimation
            </div>

            <div
              className="poppins-regular text-center mt-2"
              style={{ fontSize: "13px", color: "blue" }}
            >
              Referral Fee - {Math.round(referralFee)}
            </div>

            <div
              className="poppins-regular text-center mt-2"
              style={{ fontSize: "13px", color: "blue" }}
            >
              Closing Fee - {Math.round(closingFee)}
            </div>

            <div
              className="poppins-regular text-center mt-2"
              style={{ fontSize: "13px", color: "blue" }}
            >
              FBA Fee - {data.country === "US" ? `$${2}` : ` ₹ ${80}`}
            </div>

            <div
              className="poppins-regular text-center mt-2"
              style={{ fontSize: "13px", color: "blue" }}
            >
              {/* FBA Fee - {Math.round(dailySales)} */}
            </div>
          </div>

          <div
            className="d-flex p-3 mb-3"
            style={{
              backgroundColor: "lightgrey",
              justifyContent: "space-between",
              borderRadius: "10px",
            }}
          >
            <div
              className="poppins-regular"
              style={{ fontWeight: "bold", fontSize: "13px" }}
            >
              Cost Per Unit
            </div>
            <div
              className="poppins-regular"
              style={{ fontWeight: "bold", fontSize: "13px" }}
            >
              {/* ₹ {Math.round(costPerUnit)} */}₹ {Math.round(costPerUnit)}
            </div>
          </div>

          <a href={data.product_url} style={{ textDecoration: "none" }}>
            <div
              // onClick={() =>
              //   handleProductClick(`https://www.amazon.in/dp/${data?.ASIN}`)
              // }

              className="poppins-black text-center mb-3 mt-4"
              style={{
                backgroundColor: "#012a4a",
                padding: "10px",
                color: "white",
                borderRadius: "5px",
                textDecoration: "none",
              }}
            >
              Go To Amazon
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
export default Asindetails;
