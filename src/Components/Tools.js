// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Card,
//   CardContent,
//   CardMedia,
//   Grid,
// } from "@mui/material";

// const App = () => {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [searched, setSearched] = useState(false);

// const fetchProducts = async () => {
//   const myHeaders = new Headers();
//   myHeaders.append("X_API_Type", "junglescout");
//   myHeaders.append("Accept", "application/vnd.junglescout.v1+json");
//   myHeaders.append("Content-Type", "application/vnd.api+json");
//   myHeaders.append(
//     "Authorization",
//     "ECOM:XKgL8Yfmd0k9jIHc1HWJIlZHVvD5xtzjnyepxsgCP_8"
//   );

//   const raw = JSON.stringify({
//     data: {
//       type: "product_database_query",
//       attributes: {
//         product_tiers: ["oversize", "standard"],
//         seller_types: ["amz"],
//         categories: [
//           "Home & Kitchen",
//           "Baby Products",
//           "Beauty",
//           "Clothing & Accessories",
//           "Jewellery",
//           "Office Products",
//           "Shoes & Handbags",
//           "Toys & Games",
//         ],
//       },
//     },
//   });

//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow",
//   };

//   try {
//     const response = await fetch(
//       "https://developer.junglescout.com/api/product_database_query?marketplace=in&sort=name&page[size]=50",
//       requestOptions
//     );
//     const result = await response.json();
//     setProducts(result.data);
//   } catch (error) {
//     console.error(error);
//   }
// };

//   useEffect(() => {
//     if (searched) {
//       const filtered = products.filter((product) => {
//         const { title, category, parent_asin } = product.attributes;
//         return (
//           title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           category.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           parent_asin.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//       });
//       setFilteredProducts(filtered);
//     }
//   }, [searchTerm, products, searched]);

//   const handleSearch = () => {
//     if (!searched) {
//       fetchProducts();
//       setSearched(true);
//     }
//   };

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Product Search
//       </Typography>
//       <TextField
//         label="Search by title, category, or parent_asin"
//         variant="outlined"
//         fullWidth
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleSearch}
//         style={{ marginTop: "20px" }}
//       >
//         Search
//       </Button>
//       {searched && (
//         <div id="results" style={{ marginTop: "20px" }}>
//           {filteredProducts.length === 0 ? (
//             // <Typography>No products found</Typography>
//             <></>
//           ) : (
//             <Grid container spacing={4}>
//               {filteredProducts.map((product) => (
//                 <Grid item key={product.id} xs={12} sm={6} md={4}>
//                   <Card>
//                     <CardMedia
//                       component="img"
//                       height="140"
//                       image={product.attributes.image_url}
//                       alt={product.attributes.title}
//                     />
//                     <CardContent>
//                       <Typography variant="h6">
//                         {product.attributes.title}
//                       </Typography>
//                       <Typography>
//                         Category: {product.attributes.category}
//                       </Typography>
//                       <Typography>
//                         Price: ₹{product.attributes.price}
//                       </Typography>
//                       <Typography>
//                         Rating: {product.attributes.rating}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           )}
//         </div>
//       )}
//     </Container>
//   );
// };

// export default App;

// import React, { useState, useEffect } from "react";

// const CombinedComponent = () => {
//   // State management for Product List
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [productError, setProductError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [hasSearched, setHasSearched] = useState(false);
//   const [searchMessage, setSearchMessage] = useState("");

//   // Fetch Product List data
//   const fetchProducts = async (page) => {
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/vnd.api+json");
//     myHeaders.append("Accept", "application/vnd.junglescout.v1+json");
//     myHeaders.append(
//       "Authorization",
//       "ECOM:XKgL8Yfmd0k9jIHc1HWJIlZHVvD5xtzjnyepxsgCP_8"
//     );
//     myHeaders.append("X-API-Type", "junglescout");

//     const raw = JSON.stringify({
//       data: {
//         type: "product_database_query",
//         attributes: {
//           product_tiers: ["oversize", "standard"],
//           seller_types: ["amz"],
//           categories: [
//             "Home & Kitchen",
//             "Baby Products",
//             "Beauty",
//             "Clothing & Accessories",
//             "Jewellery",
//             "Office Products",
//             "Shoes & Handbags",
//             "Toys & Games",
//             //  "Bags, Wallets and Luggage",
//             "Car & Motorbike",
//             "Electronics",
//             "Health & Personal Care",
//             "Industrial & Scientific",
//             "Musical Instruments",
//             "Pet Supplies",
//             "Sports, Fitness & Outdoors",
//             "Watches",
//           ],
//         },
//       },
//     });

//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow",
//     };

//     try {
//       const response = await fetch(
//         "https://developer.junglescout.com/api/product_database_query?marketplace=in&sort=name&page[size]=50",
//         requestOptions
//       );
//       const result = await response.json();
//       if (result.data) {
//         setProducts(result.data);
//         setTotalPages(Math.ceil(result.meta.total / 50));
//       } else {
//         setProducts([]);
//       }
//     } catch (error) {
//       setProductError(error);
//       console.log("error", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts(currentPage);
//   }, [currentPage]);

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleSearchSubmit = () => {
//     setHasSearched(true); // Set the search flag to true
//     if (searchQuery) {
//       const filtered = products.filter(
//         (product) =>
//           product.attributes.parent_asin
//             .toLowerCase()
//             .includes(searchQuery.toLowerCase()) ||
//           product.attributes.title
//             .toLowerCase()
//             .includes(searchQuery.toLowerCase()) ||
//           product.attributes.category
//             .toLowerCase()
//             .includes(searchQuery.toLowerCase())
//       );
//       setFilteredProducts(filtered);
//       if (filtered.length === 0) {
//         setSearchMessage("No products found with the given search criteria.");
//       } else {
//         setSearchMessage("");
//       }
//     } else {
//       setFilteredProducts([]);
//       setSearchMessage(""); // Clear the search message if the search query is empty
//     }
//   };

//   const handleProductClick = (url) => {
//     window.location.href = url;
//   };

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   if (productError) {
//     return <div>Error: {productError.message}</div>;
//   }

//   console.log("products=======", products);

//   return (
//     <div className="container">
//       {/* Product List */}
//       <div className="row mt-3 justify-content-center mb-3">
//         <div className="col-md-12 p-3">
//           <div className="row mt-3 mb-3">
//             <div className="about-heading">Research a Keyword</div>
//             <div className="col-md-10">
//               <input
//                 className="input_box"
//                 type="text"
//                 placeholder="Search by ASIN, Product Name, or Category"
//                 value={searchQuery}
//                 onChange={handleSearch}
//               />
//             </div>
//             <div className="col-md-2 d-flex justify-content-end">
//               <button
//                 className="btn btn-primary search_icon"
//                 type="submit"
//                 onClick={handleSearchSubmit}
//               >
//                 Search
//               </button>
//             </div>
//           </div>

//           {hasSearched && searchMessage && (
//             <div className="alert alert-info">{searchMessage}</div>
//           )}

//           {hasSearched && filteredProducts.length > 0 && (
//             <table className="table table-bordered mt-3">
//               <thead>
//                 <tr>
//                   <th style={{ width: "310px" }} className="t_head" scope="col">
//                     Product Image
//                   </th>
//                   <th className="t_head" scope="col">
//                     Product Name
//                   </th>
//                   <th className="t_head" scope="col">
//                     Product Asin
//                   </th>
//                   <th className="t_head" scope="col">
//                     Product Brand
//                   </th>
//                   <th className="t_head" scope="col">
//                     Product Category
//                   </th>
//                   <th className="t_head" scope="col">
//                     30 Days Revenue
//                   </th>
//                   <th className="t_head" scope="col">
//                     30 Unit Sold
//                   </th>
//                   <th className="t_head" scope="col">
//                     Product Price
//                   </th>
//                   <th className="t_head" scope="col">
//                     Product Rating
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredProducts.map((product) => (
//                   <tr
//                     key={product.id}
//                     onClick={() =>
//                       handleProductClick(
//                         `https://www.amazon.com/dp/${product.attributes.title}`
//                       )
//                     }
//                     style={{ cursor: "pointer" }}
//                   >
//                     <td style={{ textAlign: "center" }}>
//                       <img
//                         src={product.attributes.image_url}
//                         alt={product.attributes.title}
//                         className="t-img"
//                       />
//                     </td>
//                     <td style={{ color: "black", fontSize: "14px" }}>
//                       {product.attributes.title}
//                     </td>
//                     <td style={{ color: "black", fontSize: "14px" }}>
//                       {product.attributes.parent_asin}
//                     </td>
//                     <td style={{ color: "black", fontSize: "14px" }}>
//                       {product.attributes.brand}
//                     </td>
//                     <td style={{ color: "black", fontSize: "14px" }}>
//                       {product.attributes.category}
//                     </td>
//                     <td style={{ color: "black", fontSize: "14px" }}>
//                       {product.attributes.approximate_30_day_revenue}
//                     </td>
//                     <td style={{ color: "black", fontSize: "14px" }}>
//                       {product.attributes.approximate_30_day_units_sold}
//                     </td>
//                     <td style={{ color: "black", fontSize: "14px" }}>
//                       {product.attributes.price}
//                     </td>
//                     <td style={{ color: "black", fontSize: "14px" }}>
//                       {product.attributes.rating}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CombinedComponent;

// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// const CombinedComponent = () => {
//   const [responseData, setResponseData] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [error, setError] = useState(null);

//   const fetchKeywordsByAsin = async (asin) => {
//     const myHeaders = new Headers();
//     myHeaders.append("X_API_Type", "junglescout");
//     myHeaders.append("Accept", "application/vnd.junglescout.v1+json");
//     myHeaders.append("Content-Type", "application/vnd.api+json");

//     // Replace 'YOUR_AUTHORIZATION_TOKEN' with your actual token
//     const authToken = "ECOM:XKgL8Yfmd0k9jIHc1HWJIlZHVvD5xtzjnyepxsgCP_8";
//     myHeaders.append("Authorization", authToken);

//     const raw = JSON.stringify({
//       data: {
//         type: "keywords_by_asin_query",
//         attributes: {
//           asins: [asin],
//           include_variants: true,
//           min_monthly_search_volume_exact: 1,
//           max_monthly_search_volume_exact: 99999,
//           min_monthly_search_volume_broad: 1,
//           max_monthly_search_volume_broad: 99999,
//           min_word_count: 1,
//           max_word_count: 99999,
//           min_organic_product_count: 1,
//           max_organic_product_count: 99999,
//         },
//       },
//     });

//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow",
//     };

//     try {
//       const response = await fetch(
//         "https://developer.junglescout.com/api/keywords/keywords_by_asin_query?marketplace=in&sort=-monthly_search_volume_exact&page[size]=50",
//         requestOptions
//       );
//       const result = await response.json();
//       setResponseData(result.data);
//     } catch (error) {
//       setError(error);
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleSearchSubmit = () => {
//     if (searchQuery) {
//       fetchKeywordsByAsin(searchQuery);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card">
//             <div className="card-body">
//               <h5 className="card-title text-center">Search by ASIN</h5>
//               <div className="input-group mb-3">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter ASIN"
//                   value={searchQuery}
//                   onChange={handleSearch}
//                 />
//                 <div className="input-group-append">
//                   <button
//                     className="btn btn-primary"
//                     type="button"
//                     onClick={handleSearchSubmit}
//                   >
//                     Search
//                   </button>
//                 </div>
//               </div>
//               {error && (
//                 <div className="alert alert-danger" role="alert">
//                   {error.message}
//                 </div>
//               )}
//               {responseData && (
//                 <div className="table-responsive">
//                   <table className="table table-bordered table-hover">
//                     <thead className="thead-dark">
//                       <tr>
//                         <th>Name</th>
//                         <th>Primary ASIN</th>
//                         <th>Monthly Trend</th>
//                         <th>Monthly Search Volume (Exact)</th>
//                         <th>Quarterly Trend</th>
//                         <th>Monthly Search Volume (Broad)</th>
//                         <th>Dominant Category</th>
//                         <th>Recommended Promotions</th>
//                         <th>Ease of Ranking Score</th>
//                         <th>Relevancy Score</th>
//                         <th>Organic Product Count</th>
//                         <th>Sponsored Product Count</th>
//                         <th>Updated At</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {responseData.map((item) => (
//                         <tr key={item.id}>
//                           <td>{item.attributes.name}</td>
//                           <td>{item.attributes.primary_asin}</td>
//                           <td>{item.attributes.monthly_trend}</td>
//                           <td>{item.attributes.monthly_search_volume_exact}</td>
//                           <td>{item.attributes.quarterly_trend}</td>
//                           <td>{item.attributes.monthly_search_volume_broad}</td>
//                           <td>{item.attributes.dominant_category}</td>
//                           <td>{item.attributes.recommended_promotions}</td>
//                           <td>{item.attributes.ease_of_ranking_score}</td>
//                           <td>{item.attributes.relevancy_score}</td>
//                           <td>{item.attributes.organic_product_count}</td>
//                           <td>{item.attributes.sponsored_product_count}</td>
//                           <td>
//                             {new Date(
//                               item.attributes.updated_at
//                             ).toLocaleString()}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CombinedComponent;

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CombinedComponent = () => {
  const [keywordsData, setKeywordsData] = useState(null);
  const [productsData, setProductsData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  const fetchKeywordsByAsin = async (asin) => {
    const myHeaders = new Headers();
    myHeaders.append("X_API_Type", "junglescout");
    myHeaders.append("Accept", "application/vnd.junglescout.v1+json");
    myHeaders.append("Content-Type", "application/vnd.api+json");

    // Replace 'YOUR_AUTHORIZATION_TOKEN' with your actual token
    const authToken = "ECOM:XKgL8Yfmd0k9jIHc1HWJIlZHVvD5xtzjnyepxsgCP_8";
    myHeaders.append("Authorization", authToken);

    const raw = JSON.stringify({
      data: {
        type: "keywords_by_asin_query",
        attributes: {
          asins: [asin],
          include_variants: true,
          min_monthly_search_volume_exact: 1,
          max_monthly_search_volume_exact: 99999,
          min_monthly_search_volume_broad: 1,
          max_monthly_search_volume_broad: 99999,
          min_word_count: 1,
          max_word_count: 99999,
          min_organic_product_count: 1,
          max_organic_product_count: 99999,
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
        "https://developer.junglescout.com/api/keywords/keywords_by_asin_query?marketplace=in&sort=-monthly_search_volume_exact&page[size]=50",
        requestOptions
      );
      const result = await response.json();
      setKeywordsData(result.data);
      return true; // Indicate that fetching was successful
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error);
      return false; // Indicate that fetching failed
    }
  };

  const fetchProducts = async (asin) => {
    const myHeaders = new Headers();
    myHeaders.append("X_API_Type", "junglescout");
    myHeaders.append("Accept", "application/vnd.junglescout.v1+json");
    myHeaders.append("Content-Type", "application/vnd.api+json");
    myHeaders.append(
      "Authorization",
      "ECOM:XKgL8Yfmd0k9jIHc1HWJIlZHVvD5xtzjnyepxsgCP_8"
    );

    const raw = JSON.stringify({
      data: {
        type: "product_database_query",
        attributes: {
          product_tiers: ["oversize", "standard"],
          seller_types: ["amz"],
          categories: [
            "Home & Kitchen",
            "Baby Products",
            "Beauty",
            "Clothing & Accessories",
            "Jewellery",
            "Office Products",
            "Shoes & Handbags",
            "Toys & Games",
          ],
          asins: [asin], // Add ASIN to product query
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
        "https://developer.junglescout.com/api/product_database_query?marketplace=in&sort=name&page[size]=50",
        requestOptions
      );
      const result = await response.json();
      setProductsData(result.data);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async () => {
    if (searchQuery) {
      const keywordsFetched = await fetchKeywordsByAsin(searchQuery);
      if (keywordsFetched) {
        await fetchProducts(searchQuery);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Search by ASIN</h5>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter ASIN"
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <div className="input-group-append">
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
              {keywordsData && (
                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead className="thead-dark">
                      <tr>
                        <th>Name</th>
                        <th>Primary ASIN</th>
                        <th>Monthly Trend</th>
                        <th>Monthly Search Volume (Exact)</th>
                        <th>Quarterly Trend</th>
                        <th>Monthly Search Volume (Broad)</th>
                        <th>Dominant Category</th>
                        <th>Recommended Promotions</th>
                        <th>Ease of Ranking Score</th>
                        <th>Relevancy Score</th>
                        <th>Organic Product Count</th>
                        <th>Sponsored Product Count</th>
                        <th>Updated At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {keywordsData.map((item) => (
                        <tr key={item.id}>
                          <td>{item.attributes.name}</td>
                          <td>{item.attributes.primary_asin}</td>
                          <td>{item.attributes.monthly_trend}</td>
                          <td>{item.attributes.monthly_search_volume_exact}</td>
                          <td>{item.attributes.quarterly_trend}</td>
                          <td>{item.attributes.monthly_search_volume_broad}</td>
                          <td>{item.attributes.dominant_category}</td>
                          <td>{item.attributes.recommended_promotions}</td>
                          <td>{item.attributes.ease_of_ranking_score}</td>
                          <td>{item.attributes.relevancy_score}</td>
                          <td>{item.attributes.organic_product_count}</td>
                          <td>{item.attributes.sponsored_product_count}</td>
                          <td>
                            {new Date(
                              item.attributes.updated_at
                            ).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {productsData && (
                <div className="table-responsive mt-4">
                  <h5 className="text-center">Product Details</h5>
                  <table className="table table-bordered table-hover">
                    <thead className="thead-dark">
                      <tr>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Seller Type</th>
                        <th>Product Tier</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productsData.map((product) => (
                        <tr key={product.id}>
                          <td>{product.attributes.product_name}</td>
                          <td>{product.attributes.category}</td>
                          <td>{product.attributes.seller_type}</td>
                          <td>{product.attributes.product_tier}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedComponent;
