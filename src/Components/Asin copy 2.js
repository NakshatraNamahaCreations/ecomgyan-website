import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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
  const [asinNo, setAsinNo] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const search = async () => {
    if (!asinNo) {
      setError("Please enter ASIN");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:8500/api/amazon/getitems`, {
        params: { asinNo },
      });

      if (res.status === 200) {
        setData(res.data.ItemsResult.Items);
        console.log("res.data.ItemsResult.Items", res.data.ItemsResult.Items);
        setError(""); // Clear error if the request is successful
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again.");
    }
  };

  console.log("data====23", data);

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
            <div className="col-md-12">
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
                        value={asinNo}
                        onChange={(e) => setAsinNo(e.target.value)}
                      />
                    </div>
                    <div className="col-md-2">
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={search}
                      >
                        Search
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}

                  {data.map((item) => (
                    <div
                      className="col-12 col-sm-12 col-md-12 mb-4"
                      key={item.ASIN}
                    >
                      <Card className="h-100">
                        {item.Images?.Primary?.Medium?.URL && (
                          <Card.Img
                            variant="top"
                            src={item.Images.Primary.Medium.URL}
                            alt={item.Title}
                            style={{ height: "200px", width: "200px" }}
                          />
                        )}
                        <Card.Body>
                          <Card.Title>Product Information</Card.Title>
                          <Card.Text>ASIN: {item.ASIN}</Card.Text>
                          <Card.Text>
                            {item.ItemInfo?.Title.DisplayValue}
                          </Card.Text>
                          {item.BrowseNodeInfo?.BrowseNodes && (
                            <>
                              <Card.Title>Browse Nodes</Card.Title>
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>Display Name</th>
                                    <th>Sales Rank</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {item.BrowseNodeInfo.BrowseNodes.map(
                                    (node) => (
                                      <tr key={node.Id}>
                                        <td>{node.DisplayName}</td>
                                        <td>{node.SalesRank || "N/A"}</td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </>
                          )}
                          {item.SalesRank && (
                            <Card.Text>
                              Website Sales Rank: {item.SalesRank}
                            </Card.Text>
                          )}
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
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
