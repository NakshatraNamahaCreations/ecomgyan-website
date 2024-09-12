import React, { useState } from "react";
import axios from "axios";

const CombinedComponent = () => {
  const [keywords, setKeywords] = useState("");
  const [TotaSearchvolume, setTotaSearchvolume] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [error, setError] = useState("");

  const search = async () => {
    if (!keywords) {
      setError("Please enter a keyword");
      return;
    }

    try {
      const res = await axios.get(
        `https://api.proleverage.io/api/amazon/keyword`,
        {
          params: { keywords },
        }
      );

      if (res.status === 200) {
        const keywordSuggestions = res.data.keywordSuggestions.keywords;

        // Map search volume to display format
        const searchVolumes = Object.keys(keywordSuggestions).map((key) => ({
          keyword: key,
          searchVolume: keywordSuggestions[key]["search volume"],
          cpc: keywordSuggestions[key]["cpc"],
        }));

        setTotaSearchvolume(searchVolumes);
        setError("");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again.");
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = TotaSearchvolume.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => setCurrentPage(currentPage + 1);

  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-12 p-3">
          <div className="row mt-3 mb-3">
            <div className="about-heading">Welcome Proleverage</div>
            <div className="col-md-12 row">
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
            <div className="poppins-medium" style={{ color: "blue" }}>
              Search Volume:
              {currentItems.map((item, index) => (
                <div key={index}>
                  {`${item.keyword}: Search Volume - ${item.searchVolume}, CPC - ${item.cpc}`}
                </div>
              ))}
            </div>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Pagination controls */}
      <div className="row mt-3">
        <div className="col-md-12">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                <button className="page-link" onClick={prevPage}>
                  Previous
                </button>
              </li>
              {Array.from(
                { length: Math.ceil(TotaSearchvolume.length / itemsPerPage) },
                (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                )
              )}
              <li
                className={`page-item ${
                  currentPage ===
                    Math.ceil(TotaSearchvolume.length / itemsPerPage) &&
                  "disabled"
                }`}
              >
                <button className="page-link" onClick={nextPage}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default CombinedComponent;
