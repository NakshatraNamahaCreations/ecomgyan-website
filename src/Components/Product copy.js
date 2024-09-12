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
//         "https://developer.junglescout.com/api/product_database_query?marketplace=in&sort=name&page[size]=10",
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
//             <div className="about-heading">Product Search</div>
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
//                     30 days Unit Sold
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
//   const [averagePriceLast30Days, setAveragePriceLast30Days] = useState(0);
//   const [averageReviewLast30Days, setAverageReviewLast30Days] = useState(0);
//   const [totalAvgPriceHomeKitchen, setTotalAvgPriceHomeKitchen] = useState(0);

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
//         // Calculate average price and review for filtered products
//         calculateAverages(result.data);
//       } else {
//         setProducts([]);
//       }
//     } catch (error) {
//       setProductError(error);
//       console.log("error", error);
//     }
//   };
//   useEffect(() => {
//     if (filteredProducts.length > 0) {
//       const homeKitchenProducts = filteredProducts.filter(
//         (product) => product.attributes.category === "Home & Kitchen"
//       );
//       const totalHomeKitchenPrice = homeKitchenProducts.reduce(
//         (total, product) => total + product.attributes.price,
//         0
//       );
//       const totalAvgPrice = totalHomeKitchenPrice / homeKitchenProducts.length;
//       setTotalAvgPriceHomeKitchen(totalAvgPrice);
//     } else {
//       setTotalAvgPriceHomeKitchen(0);
//     }
//   }, [filteredProducts]);
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
//       calculateAverages(filtered);
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

//   // Function to calculate average price and review
//   const calculateAverages = (productsArray) => {
//     const totalPrices = productsArray.reduce(
//       (acc, product) => acc + product.attributes.price,
//       0
//     );
//     const totalReviews = productsArray.reduce(
//       (acc, product) => acc + product.attributes.reviews,
//       0
//     );
//     setAveragePriceLast30Days(totalPrices / productsArray.length);
//     setAverageReviewLast30Days(totalReviews / productsArray.length);
//   };

//   if (productError) {
//     return <div>Error: {productError.message}</div>;
//   }

//   return (
//     <div className="container">
//       {/* Product List */}
//       <div className="row mt-3 justify-content-center mb-3">
//         <div className="col-md-12 p-3">
//           <div className="row mt-3 mb-3">
//             <div className="about-heading">Product Search</div>
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
//                     Average BSR
//                   </th>
//                   {/* <th className="t_head" scope="col">
//                     Product Price
//                   </th> */}
//                   {/* <th className="t_head" scope="col">
//                     Product Rating
//                   </th> */}
//                   <th className="t_head" scope="col">
//                     Average Price
//                   </th>
//                   <th className="t_head" scope="col">
//                     Average Review
//                   </th>
//                   {/* <th className="t_head" scope="col">
//                     Total Revenue
//                   </th> */}
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
//                     {/* <td style={{ color: "black", fontSize: "14px" }}>
//                       {product.attributes.price}
//                     </td> */}
//                     {/* <td style={{ color: "black", fontSize: "14px" }}>
//                       {product.attributes.rating}
//                     </td> */}
//                     <td style={{ color: "black", fontSize: "14px" }}>
//                       {averagePriceLast30Days.toFixed(2)}
//                     </td>
//                     <td style={{ color: "black", fontSize: "14px" }}>
//                       {averageReviewLast30Days.toFixed(2)}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//           {/* <div>
//             Total Average Price (Home & Kitchen): $
//             {totalAvgPriceHomeKitchen.toFixed(2)}
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CombinedComponent;

import React, { useState, useEffect } from "react";
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
  // State management for Product List
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productError, setProductError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchMessage, setSearchMessage] = useState("");
  const [averagePriceLast30Days, setAveragePriceLast30Days] = useState(0);
  const [averageReviewLast30Days, setAverageReviewLast30Days] = useState(0);
  const [totalAvgPriceHomeKitchen, setTotalAvgPriceHomeKitchen] = useState(0);

  // Fetch Product List data
  const fetchProducts = async (page) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/vnd.api+json");
    myHeaders.append("Accept", "application/vnd.junglescout.v1+json");
    myHeaders.append(
      "Authorization",
      "ECOM:XKgL8Yfmd0k9jIHc1HWJIlZHVvD5xtzjnyepxsgCP_8"
    );
    myHeaders.append("X-API-Type", "junglescout");

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
            "Car & Motorbike",
            "Electronics",
            "Health & Personal Care",
            "Industrial & Scientific",
            "Musical Instruments",
            "Pet Supplies",
            "Sports, Fitness & Outdoors",
            "Watches",
          ],
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
      if (result.data) {
        setProducts(result.data);
        setTotalPages(Math.ceil(result.meta.total / 50));
        // Calculate average price and review for filtered products
        calculateAverages(result.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      setProductError(error);
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (filteredProducts.length > 0) {
      const homeKitchenProducts = filteredProducts.filter(
        (product) => product.attributes.category === "Home & Kitchen"
      );
      const totalHomeKitchenPrice = homeKitchenProducts.reduce(
        (total, product) => total + product.attributes.price,
        0
      );
      const totalAvgPrice = totalHomeKitchenPrice / homeKitchenProducts.length;
      setTotalAvgPriceHomeKitchen(totalAvgPrice);
    } else {
      setTotalAvgPriceHomeKitchen(0);
    }
  }, [filteredProducts]);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    setHasSearched(true);
    if (searchQuery) {
      const filtered = products.filter(
        (product) =>
          product.attributes.parent_asin
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.attributes.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.attributes.category
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
      calculateAverages(filtered);
      if (filtered.length === 0) {
        setSearchMessage("No products found with the given search criteria.");
      } else {
        setSearchMessage("");
      }
    } else {
      setFilteredProducts([]);
      setSearchMessage(""); // Clear the search message if the search query is empty
    }
  };

  const handleProductClick = (url) => {
    window.location.href = url;
  };

  const renderApi = () => {
    const otp = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    console.log("renderApi", renderApi);
    return otp;
  };

  // Function to calculate average price and review
  const calculateAverages = (productsArray) => {
    const totalPrices = productsArray.reduce(
      (acc, product) => acc + product.attributes.price,
      0
    );
    const totalReviews = productsArray.reduce(
      (acc, product) => acc + product.attributes.reviews,
      0
    );
    setAveragePriceLast30Days(totalPrices / productsArray.length);
    setAverageReviewLast30Days(totalReviews / productsArray.length);
  };

  // Prepare data for the chart
  const chartData = {
    labels: filteredProducts.map((product) => product.attributes.title),
    datasets: [
      {
        label: "Average Price",
        data: filteredProducts.map((product) => product.attributes.price),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Define animation options
  const chartOptions = {
    animation: {
      duration: 1000, // duration of the animation in milliseconds
      easing: "easeInOutQuad", // easing function to use for the animation
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  if (productError) {
    return <div>Error: {productError.message}</div>;
  }

  console.log("averageReviewLast30Days====", averageReviewLast30Days);

  return (
    <div className="container">
      {/* Product List */}
      <div className="row mt-3 justify-content-center mb-3">
        <div className="col-md-12 p-3">
          <div className="row mt-3 mb-3">
            <div className="about-heading">Welcome Proleverage</div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body row">
                  <div className="about-heading">Product Search</div>
                  <div className="col-md-10">
                    <input
                      className="input_box"
                      type="text"
                      placeholder="Search by ASIN, Product Name, or Category"
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                  </div>
                  <div className="col-md-2">
                    <button
                      className="btn btn-primary search_icon"
                      type="submit"
                      onClick={handleSearchSubmit}
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
            <div className="col-md-6">
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

            {/* <div className="about-heading">Product Search</div>
            <div className="col-md-10">
              <input
                className="input_box"
                type="text"
                placeholder="Search by ASIN, Product Name, or Category"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <div className="col-md-2 d-flex justify-content-end">
              <button
                className="btn btn-primary search_icon"
                type="submit"
                onClick={handleSearchSubmit}
              >
                Search
              </button>
            </div> */}
          </div>

          {hasSearched && searchMessage && (
            <div className="alert alert-info">{searchMessage}</div>
          )}

          {hasSearched && filteredProducts.length > 0 && (
            <>
              <table className="table table-bordered mt-3">
                <thead>
                  <tr>
                    <th
                      style={{ width: "310px" }}
                      className="t_head"
                      scope="col"
                    >
                      Product Image
                    </th>
                    <th className="t_head" scope="col">
                      Product Name
                    </th>
                    <th className="t_head" scope="col">
                      Product Asin
                    </th>
                    <th className="t_head" scope="col">
                      Product Brand
                    </th>
                    <th className="t_head" scope="col">
                      Product Category
                    </th>
                    <th className="t_head" scope="col">
                      30 Days Revenue
                    </th>
                    <th className="t_head" scope="col">
                      Average BSR
                    </th>
                    <th className="t_head" scope="col">
                      Average Price
                    </th>
                    <th className="t_head" scope="col">
                      Average Review
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      onClick={() =>
                        handleProductClick(
                          `https://www.amazon.in/dp/${product.attributes.parent_asin}`
                        )
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <td style={{ textAlign: "center" }}>
                        <img
                          src={product.attributes.image_url}
                          alt={product.attributes.title}
                          className="t-img"
                        />
                      </td>
                      <td style={{ color: "black", fontSize: "14px" }}>
                        {product.attributes.title}
                      </td>
                      <td style={{ color: "black", fontSize: "14px" }}>
                        {product.attributes.parent_asin}
                      </td>
                      <td style={{ color: "black", fontSize: "14px" }}>
                        {product.attributes.brand}
                      </td>
                      <td style={{ color: "black", fontSize: "14px" }}>
                        {product.attributes.category}
                      </td>
                      <td style={{ color: "black", fontSize: "14px" }}>
                        {product.attributes.approximate_30_day_revenue}
                      </td>
                      <td style={{ color: "black", fontSize: "14px" }}>
                        {product.attributes.approximate_30_day_units_sold}
                      </td>
                      <td style={{ color: "black", fontSize: "14px" }}>
                        {averagePriceLast30Days.toFixed(2)}
                      </td>
                      <td style={{ color: "black", fontSize: "14px" }}>
                        {averageReviewLast30Days.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4">
                <h5 className="text-center">
                  Average Prices of Filtered Products
                </h5>
                <Bar data={chartData} options={chartOptions} />
              </div>
            </>
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

// import React, { useState, useEffect } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import "bootstrap/dist/css/bootstrap.min.css";

// // Register the necessary components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const CombinedComponent = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [productError, setProductError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [hasSearched, setHasSearched] = useState(false);
//   const [searchMessage, setSearchMessage] = useState("");
//   const [averagePriceLast30Days, setAveragePriceLast30Days] = useState(0);
//   const [averageReviewLast30Days, setAverageReviewLast30Days] = useState(0);
//   const [totalAvgPriceHomeKitchen, setTotalAvgPriceHomeKitchen] = useState(0);

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
//         calculateAverages(result.data);
//       } else {
//         setProducts([]);
//       }
//     } catch (error) {
//       setProductError(error);
//       console.log("error", error);
//     }
//   };

//   useEffect(() => {
//     if (filteredProducts.length > 0) {
//       const homeKitchenProducts = filteredProducts.filter(
//         (product) => product.attributes.category === "Home & Kitchen"
//       );
//       const totalHomeKitchenPrice = homeKitchenProducts.reduce(
//         (total, product) => total + product.attributes.price,
//         0
//       );
//       const totalAvgPrice = totalHomeKitchenPrice / homeKitchenProducts.length;
//       setTotalAvgPriceHomeKitchen(totalAvgPrice);
//     } else {
//       setTotalAvgPriceHomeKitchen(0);
//     }
//   }, [filteredProducts]);

//   useEffect(() => {
//     fetchProducts(currentPage);
//   }, [currentPage]);

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleSearchSubmit = () => {
//     setHasSearched(true);
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
//       calculateAverages(filtered);
//       if (filtered.length === 0) {
//         setSearchMessage("No products found with the given search criteria.");
//       } else {
//         setSearchMessage("");
//       }
//     } else {
//       setFilteredProducts([]);
//       setSearchMessage("");
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

//   const calculateAverages = (productsArray) => {
//     const totalPrices = productsArray.reduce(
//       (acc, product) => acc + product.attributes.price,
//       0
//     );
//     const totalReviews = productsArray.reduce(
//       (acc, product) => acc + product.attributes.reviews,
//       0
//     );
//     setAveragePriceLast30Days(totalPrices / productsArray.length);
//     setAverageReviewLast30Days(totalReviews / productsArray.length);
//   };

//   const chartData = {
//     labels: filteredProducts.map((product) => product.attributes.title),
//     datasets: [
//       {
//         label: "Average Price",
//         data: filteredProducts.map((product) => product.attributes.price),
//         backgroundColor: "rgba(75, 192, 192, 0.6)",
//         borderColor: "rgba(75, 192, 192, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const reviewChartData = {
//     labels: filteredProducts.map((product) => product.attributes.title),
//     datasets: [
//       {
//         label: "Average Review",
//         data: filteredProducts.map((product) => product.attributes.reviews),
//         backgroundColor: "rgba(153, 102, 255, 0.6)",
//         borderColor: "rgba(153, 102, 255, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     animation: {
//       duration: 1000,
//       easing: "easeInOutQuad",
//     },
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Average Prices of Filtered Products",
//       },
//     },
//     scales: {
//       x: {
//         beginAtZero: true,
//       },
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   const reviewChartOptions = {
//     responsive: true,
//     animation: {
//       duration: 1000,
//       easing: "easeInOutQuad",
//     },
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Average Reviews of Filtered Products",
//       },
//     },
//     scales: {
//       x: {
//         beginAtZero: true,
//       },
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   if (productError) {
//     return <div>Error: {productError.message}</div>;
//   }

//   return (
//     <div className="container mt-5">
//       <div className="card p-4">
//         <h2 className="text-center mb-4">Product Search</h2>
//         <div className="row mb-4">
//           <div className="col-md-10">
//             <input
//               className="form-control"
//               type="text"
//               placeholder="Search by ASIN, Product Name, or Category"
//               value={searchQuery}
//               onChange={handleSearch}
//             />
//           </div>
//           <div className="col-md-2 d-flex justify-content-end">
//             <button
//               className="btn btn-primary"
//               type="submit"
//               onClick={handleSearchSubmit}
//             >
//               Search
//             </button>
//           </div>
//         </div>

//         {hasSearched && searchMessage && (
//           <div className="alert alert-info">{searchMessage}</div>
//         )}

//         {hasSearched && filteredProducts.length > 0 && (
//           <>
//             <table className="table table-bordered mt-3">
//               <thead className="thead-dark">
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
//                     Average BSR
//                   </th>
//                   <th className="t_head" scope="col">
//                     Average Price
//                   </th>
//                   <th className="t_head" scope="col">
//                     Average Review
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
//                       {averagePriceLast30Days.toFixed(2)}
//                     </td>
//                     <td style={{ color: "black", fontSize: "14px" }}>
//                       {averageReviewLast30Days.toFixed(2)}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Bar Chart for Average Price */}
//             <div className="mb-4">
//               <h3 className="text-center">Average Price Chart</h3>
//               <div className="chart-container">
//                 <Bar data={chartData} options={chartOptions} />
//               </div>
//             </div>

//             {/* Bar Chart for Average Review */}
//             <div className="mb-4">
//               <h3 className="text-center">Average Review Chart</h3>
//               <div className="chart-container">
//                 <Bar data={reviewChartData} options={reviewChartOptions} />
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CombinedComponent;
