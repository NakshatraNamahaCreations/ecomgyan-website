import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CardContent,
  Grid,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Card, Table } from "react-bootstrap";

const CombinedComponent = () => {
  const [keywords, setKeywords] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const search = async () => {
    if (!keywords) {
      setError("Please enter a keyword");
      return;
    }
    try {
      const res = await axios.get(`http://localhost:8500/api/amazon/keyword`, {
        params: { keywords },
      });

      if (res.status === 200) {
        setData(res.data.amazonData.SearchResult.Items);

        console.log("res.data", res.data);
        setError("");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again.");
    }
  };

  const calculateSalesEstimation = (salesRank) => {
    if (salesRank) {
      return 238000 / salesRank / 4;
    }
    return "N/A"; // Return a default value if salesRank is not available
  };

  console.log("data====", data);

  const handleProductClick = (url) => {
    window.location.href = url;
  };
  return (
    <div className="container">
      {/* Product List */}
      <div className="row mt-3 justify-content-center mb-3">
        <div className="col-md-12 p-3">
          <div className="row mt-3 mb-3">
            <div className="about-heading">Welcome Proleverage</div>
            <div className="col-md-12">
              <div className="card">
                <div className="card-body row">
                  <div className="about-heading">Product Search</div>
                  <div className="col-md-10">
                    <input
                      className="input_box"
                      type="text"
                      placeholder="Search by ASIN, Product Name, or Category"
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      style={{ marginBottom: "20px" }}
                    />
                  </div>
                  <div className="col-md-2">
                    <button
                      className="btn btn-primary search_icon"
                      type="submit"
                      onClick={search}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
              <div className="about-heading">
                Welcome to Your Insights Dashboard
              </div>
              <p style={{ color: "grey", fontSize: "14px" }}>
                Insights Dashboard is the base of operations for your business
                within Helium 10.
              </p>
              <p style={{ color: "grey", fontSize: "14px" }}>
                Track and visualize all your key metrics at a glance.
              </p>
              <p style={{ color: "grey", fontSize: "14px" }}>
                Manage your catalog of products in one consolidated view. Access
                critical data fast to make the right decisions. Get daily
                insights showing you what to do now to simplify your operations
                and maximize ROI.
              </p>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {data.length > 0 && (
            <Grid
              container
              spacing={3}
              style={{ marginTop: "20px", width: "100%" }}
            >
              {data.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.ASIN}>
                  <Card
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      handleProductClick(
                        `https://www.amazon.in/dp/${item.ASIN}`
                      )
                    }
                  >
                    <CardContent>
                      <Typography variant="h6" component="div">
                        Product Information
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        ASIN: {item.ASIN}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Sales estimation:{" "}
                        {calculateSalesEstimation(
                          item.BrowseNodeInfo.BrowseNodes[0]?.SalesRank
                        )}
                      </Typography>
                      {item.Images?.Primary?.Medium?.URL && (
                        <img
                          src={item.Images.Primary.Medium.URL}
                          alt={item.Title}
                          style={{ width: "200px", height: "auto" }}
                        />
                      )}
                      <Typography variant="body1" component="div">
                        {item.ItemInfo?.Title.DisplayValue}
                      </Typography>
                      {item.BrowseNodeInfo?.BrowseNodes && (
                        <>
                          <Typography
                            variant="h6"
                            component="div"
                            style={{ marginTop: "20px" }}
                          >
                            Browse Nodes
                          </Typography>
                          <TableContainer component={Paper}>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell>Display Name</TableCell>
                                  <TableCell>Sales Rank</TableCell>
                                </TableRow>
                              </TableHead>
                            </Table>
                          </TableContainer>
                        </>
                      )}
                      {item.SalesRank && (
                        <Typography variant="body2">
                          Website Sales Rank: {item.SalesRank}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
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
  );
};

export default CombinedComponent;
