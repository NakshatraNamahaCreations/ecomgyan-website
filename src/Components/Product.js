import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  TablePagination,
} from "@mui/material";
// Import your CSS file for styling

const CombinedComponent = () => {
  const [keywords, setKeywords] = useState("");
  const [TotaSearchvolume, setTotaSearchvolume] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Default to 0 for TablePagination
  const [itemsPerPage, setItemsPerPage] = useState(25); // Default items per page
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
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0); // Reset to first page when items per page changes
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = TotaSearchvolume.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-12 p-3">
          <div className="search-container">
            <h2 className="about-heading">Welcome Proleverage</h2>
            <div className="row">
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

            {currentItems.length > 0 && (
              <>
                <TableContainer component={Paper} className="table-container">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Keyword</TableCell>
                        <TableCell>Search Volume</TableCell>
                        <TableCell>CPC</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentItems.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.keyword}</TableCell>
                          <TableCell>{item.searchVolume}</TableCell>
                          <TableCell>{item.cpc}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  rowsPerPageOptions={[10, 25, 50, 100]}
                  component="div"
                  count={TotaSearchvolume.length}
                  rowsPerPage={itemsPerPage}
                  page={currentPage}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            )}
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedComponent;
