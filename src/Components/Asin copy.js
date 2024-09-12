import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CombinedComponent = () => {
  const [asinData, setAsinData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  const fetchKeywordsByAsin = async (asin) => {
    const myHeaders = new Headers();
    myHeaders.append("X_API_Type", "junglescout");
    myHeaders.append("Accept", "application/vnd.junglescout.v1+json");
    myHeaders.append("Content-Type", "application/vnd.api+json");

    const authToken = "ECOM:XKgL8Yfmd0k9jIHc1HWJIlZHVvD5xtzjnyepxsgCP_8";
    myHeaders.append("Authorization", authToken);

    const raw = JSON.stringify({
      data: {
        type: "keywords_by_asin_query",
        attributes: {
          asins: [asin],
          include_variants: true,
        },
      },
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://developer.junglescout.com/api/keywords/keywords_by_asin_query?marketplace=in&sort=-monthly_search_volume_exact&page[size]=1",
        requestOptions
      );
      const result = await response.json();
      setAsinData(result.data);
      return true;
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error);
      return false;
    }
  };

  console.log("asinData======", asinData);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async () => {
    if (searchQuery) {
      await fetchKeywordsByAsin(searchQuery);
    }
  };

  // Prepare data for the chart
  const chartData = {
    labels: asinData ? asinData.map((item) => item.attributes.name) : [],
    datasets: [
      {
        label: "Monthly Search Volume",
        data: asinData
          ? asinData.map((item) => item.attributes.monthly_search_volume_exact)
          : [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="row">
            <div
              className="mb-4"
              style={{ color: "black", fontSize: "20px", fontWeight: "bold" }}
            >
              Welcome Proleverage
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5
                    className="card-title"
                    style={{
                      fontSize: "15px",
                      color: "black",
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
                        value={searchQuery}
                        onChange={handleSearch}
                      />
                    </div>
                    <div className="col-md-2">
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={handleSearchSubmit}
                      >
                        Search
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error.message}
                    </div>
                  )}

                  {asinData && (
                    <>
                      <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                          <thead className="thead-dark">
                            <tr>
                              <th style={{ fontSize: "14px" }}>Product Name</th>
                              <th style={{ fontSize: "14px" }}>Primary ASIN</th>
                              <th style={{ fontSize: "14px" }}>
                                Monthly Trend
                              </th>
                              <th style={{ fontSize: "14px" }}>
                                Monthly Search Volume
                              </th>
                              <th style={{ fontSize: "14px" }}>
                                Quarterly Trend
                              </th>
                              <th style={{ fontSize: "14px" }}>Category</th>
                              {/* <th style={{ fontSize: "14px" }}>
                                Recommended Promotions
                              </th> */}
                              <th style={{ fontSize: "14px" }}>
                                Organic Product Count
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {asinData.map((item) => (
                              <tr key={item.id}>
                                <td style={{ fontSize: "14px" }}>
                                  <a
                                    href={`https://www.amazon.in/dp/${item.attributes.primary_asin}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      textDecoration: "none",
                                      color: "inherit",
                                    }}
                                  >
                                    {item.attributes.name}
                                  </a>
                                </td>
                                <td style={{ fontSize: "14px" }}>
                                  {item.attributes.primary_asin}
                                </td>
                                <td style={{ fontSize: "14px" }}>
                                  {item.attributes.monthly_trend}
                                </td>
                                <td style={{ fontSize: "14px" }}>
                                  {item.attributes.monthly_search_volume_exact}
                                </td>
                                <td style={{ fontSize: "14px" }}>
                                  {item.attributes.quarterly_trend}
                                </td>
                                <td style={{ fontSize: "14px" }}>
                                  {item.attributes.dominant_category}
                                </td>
                                {/* <td style={{ fontSize: "14px" }}>
                                  {item.attributes.recommended_promotions}
                                </td> */}
                                <td style={{ fontSize: "14px" }}>
                                  {item.attributes.organic_product_count}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="mt-4">
                        <h5 className="text-center">
                          Keywords Monthly Search Volume
                        </h5>
                        <Bar
                          data={chartData}
                          options={{
                            animation: {
                              duration: 1000,
                              easing: "easeInOutQuad",
                            },
                            scales: {
                              x: {
                                beginAtZero: true,
                              },
                              y: {
                                beginAtZero: true,
                              },
                            },
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
              <h5
                className="card-title mt-4"
                style={{
                  fontSize: "18px",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Join our community and learn the latest seller strategies
              </h5>
              <p style={{ color: "grey", fontSize: "14px" }} className="mt-2">
                Check out our Facebook page and our Serious Sellers Podcast for
                more tips and tricks on how to use Proleverage to level up your
                business.
              </p>
              <p style={{ color: "grey", fontSize: "14px" }} className="mt-2">
                Check out our Facebook page and our Serious Sellers Podcast for
                more tips and tricks on how to use Proleverage to level up your
                business.
              </p>
              <p style={{ color: "grey", fontSize: "14px" }} className="mt-2">
                Check out our Facebook page and our Serious Sellers Podcast for
                more tips and tricks on how to use Proleverage to level up your
                business.
              </p>
            </div>
            <div className="col-md-6">
              <div className="">
                <iframe
                  width="100%"
                  height="350"
                  src="https://www.youtube.com/embed/ZeY07Asv4KE"
                  title="Big Reason Behind Changing My Youtube Channel Name!!!"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className=""
                  style={{ borderRadius: "10px" }}
                ></iframe>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-12">
              <img
                src="/images/chart.png"
                alt="loading...."
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedComponent;
