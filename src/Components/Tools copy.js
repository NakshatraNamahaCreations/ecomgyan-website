// import React, { useEffect, useState } from "react";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
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
//           include_keywords: ["Watches"],
//           categories: ["Clothing, Shoes & Jewelry"],
//           exclude_unavailable_products: true,
//         },
//       },
//     });

//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow",
//     };

//     fetch(
//       "https://developer.junglescout.com/api/product_database_query?marketplace=us",
//       requestOptions
//     )
//       .then((response) => response.json())
//       .then((result) => {
//         if (result.data) {
//           setProducts(result.data);
//           setFilteredProducts(result.data); // Initialize filtered products
//         } else {
//           setProducts([]);
//           setFilteredProducts([]);
//         }
//       })
//       .catch((error) => {
//         setError(error);
//         console.log("error", error);
//       });
//   }, []);

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//     const filtered = products.filter((product) =>
//       product.attributes.parent_asin
//         .toLowerCase()
//         .includes(event.target.value.toLowerCase())
//     );
//     setFilteredProducts(filtered);
//   };

//   const handleProductClick = (url) => {
//     window.location.href = url;
//   };

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   console.log("products=====",products.length)

//   return (
//     <div className="container">
//       <div className="row mt-3 justify-content-center mb-3">
//         <div className="col-md-12 p-3">
//           <div className="row mt-3 mb-3">
//             <div className="about-heading">Research a Keyword</div>
//             <div className="col-md-10">
//               <input
//                 className="input_box"
//                 type="text"
//                 placeholder="Search by ASIN"
//                 value={searchQuery}
//                 onChange={handleSearch}
//               />
//             </div>
//             <div className="col-md-2 d-flex justify-content-end">
//               <button className="btn btn-primary search_icon" type="submit">
//                 Search
//               </button>
//             </div>
//           </div>

//           <div className="desc">Learn about competitors</div>

//           <table className="table table-bordered mt-3">
//             <thead>
//               <tr>
//                 <th style={{ width: "310px" }} className="t_head" scope="col">
//                   Product Image
//                 </th>
//                 <th className="t_head" scope="col">
//                   Product Name
//                 </th>
//                 <th className="t_head" scope="col">
//                   Product Asin
//                 </th>
//                 <th className="t_head" scope="col">
//                   Product Brand
//                 </th>
//                 <th className="t_head" scope="col">
//                   Product Category
//                 </th>
//                 <th className="t_head" scope="col">
//                   30 Days Revenue
//                 </th>
//                 <th className="t_head" scope="col">
//                   30 Unit Sold
//                 </th>

//                 <th className="t_head" scope="col">
//                   Product Price
//                 </th>
//                 <th className="t_head" scope="col">
//                   Product Rating
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredProducts && filteredProducts.length > 0 ? (
//                 filteredProducts.map((product) => (
//                   <tr
//                     key={product.id}
//                     onClick={() =>
//                       handleProductClick(
//                         `https://www.amazon.com/dp/${product.attributes.parent_asin}`
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
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7">Loading...</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductList;

// import React, { useState, useEffect } from "react";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchProducts = (page) => {
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
//           include_keywords: ["Watches"],
//           categories: [
//             "Appliances",
//             "Arts, Crafts & Sewing",
//             "Automotive",
//             "Baby",
//             "Beauty & Personal Care",
//             "Camera & Photo",
//             "Cell Phones & Accessories",
//             "Clothing, Shoes & Jewelry",
//             "Computers & Accessories",
//             "Electronics",
//             "Grocery & Gourmet Food",
//             "Health & Household",
//             "Home & Kitchen",
//             "Industrial & Scientific",
//             "Kitchen & Dining",
//             "Musical Instruments",
//             "Office Products",
//             "Patio, Lawn & Garden",
//             "Pet Supplies",
//             "Software",
//             "Sports & Outdoors",
//             "Tools & Home Improvement",
//             "Toys & Games",
//             "Video Games",
//           ],
//           exclude_unavailable_products: true,
//         },
//       },
//     });

//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow",
//     };

//     fetch(
//       `https://developer.junglescout.com/api/product_database_query?marketplace=us&page[size]=50&page[number]=${page}`,
//       requestOptions
//     )
//       .then((response) => response.json())
//       .then((result) => {
//         if (result.data) {
//           setProducts(result.data);
//           setFilteredProducts(result.data); // Initialize filtered products
//           setTotalPages(Math.ceil(result.meta.total / 50)); // Assuming total items count is available in meta.total
//         } else {
//           setProducts([]);
//           setFilteredProducts([]);
//         }
//       })
//       .catch((error) => {
//         setError(error);
//         console.log("error", error);
//       });
//   };

//   useEffect(() => {
//     fetchProducts(currentPage);
//   }, [currentPage]);

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//     const filtered = products.filter((product) =>
//       product.attributes.parent_asin
//         .toLowerCase()
//         .includes(event.target.value.toLowerCase())
//     );
//     setFilteredProducts(filtered);
//   };

//   const handleProductClick = (url) => {
//     window.location.href = url;
//   };

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div className="container">
//       <div className="row mt-3 justify-content-center mb-3">
//         <div className="col-md-12 p-3">
//           <div className="row mt-3 mb-3">
//             <div className="about-heading">Research a Keyword</div>
//             <div className="col-md-10">
//               <input
//                 className="input_box"
//                 type="text"
//                 placeholder="Search by ASIN"
//                 value={searchQuery}
//                 onChange={handleSearch}
//               />
//             </div>
//             <div className="col-md-2 d-flex justify-content-end">
//               <button className="btn btn-primary search_icon" type="submit">
//                 Search
//               </button>
//             </div>
//           </div>

//           <div className="desc">Learn about competitors</div>

//           <table className="table table-bordered mt-3">
//             <thead>
//               <tr>
//                 <th style={{ width: "310px" }} className="t_head" scope="col">
//                   Product Image
//                 </th>
//                 <th className="t_head" scope="col">
//                   Product Name
//                 </th>
//                 <th className="t_head" scope="col">
//                   Product Asin
//                 </th>
//                 <th className="t_head" scope="col">
//                   Product Brand
//                 </th>
//                 <th className="t_head" scope="col">
//                   Product Category
//                 </th>
//                 <th className="t_head" scope="col">
//                   30 Days Revenue
//                 </th>
//                 <th className="t_head" scope="col">
//                   30 Unit Sold
//                 </th>

//                 <th className="t_head" scope="col">
//                   Product Price
//                 </th>
//                 <th className="t_head" scope="col">
//                   Product Rating
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredProducts && filteredProducts.length > 0 ? (
//                 filteredProducts.map((product) => (
//                   <tr
//                     key={product.id}
//                     onClick={() =>
//                       handleProductClick(
//                         `https://www.amazon.com/dp/${product.attributes.parent_asin}`
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
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="9">Loading...</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//           {/* Pagination Controls */}
//           <div className="pagination-controls">
//             <button
//               className="btn btn-secondary"
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </button>
//             <span className="mx-2">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               className="btn btn-secondary"
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductList;

// import React, { useState, useEffect } from "react";

// const KeywordSearch = () => {
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       const myHeaders = new Headers();
//       myHeaders.append("X_API_Type", "junglescout");
//       myHeaders.append("Accept", "application/vnd.junglescout.v1+json");
//       myHeaders.append("Content-Type", "application/vnd.api+json");
//       myHeaders.append(
//         "Authorization",
//         "ECOM:XKgL8Yfmd0k9jIHc1HWJIlZHVvD5xtzjnyepxsgCP_8"
//       ); // Replace with your actual API key

//       const raw = JSON.stringify({
//         data: {
//           type: "keywords_by_keyword_query",
//           attributes: {
//             categories: [
//               "Appliances",
//               "Arts, Crafts & Sewing",
//               "Automotive",
//               "Baby",
//               "Beauty & Personal Care",
//               "Camera & Photo",
//               "Cell Phones & Accessories",
//               "Clothing, Shoes & Jewelry",
//               "Computers & Accessories",
//               "Electronics",
//               "Grocery & Gourmet Food",
//               "Health & Household",
//               "Home & Kitchen",
//               "Industrial & Scientific",
//               "Kitchen & Dining",
//               "Musical Instruments",
//               "Office Products",
//               "Patio, Lawn & Garden",
//               "Pet Supplies",
//               "Software",
//               "Sports & Outdoors",
//               "Tools & Home Improvement",
//               "Toys & Games",
//               "Video Games",
//             ],
//             search_terms: "yoga",
//             min_monthly_search_volume_exact: 1,
//             max_monthly_search_volume_exact: 99999,
//             min_monthly_search_volume_broad: 1,
//             max_monthly_search_volume_broad: 99999,
//             min_word_count: 1,
//             max_word_count: 99999,
//             min_organic_product_count: 1,
//             max_organic_product_count: 99999,
//           },
//         },
//       });

//       const requestOptions = {
//         method: "POST",
//         headers: myHeaders,
//         body: raw,
//         redirect: "follow",
//       };

//       try {
//         const response = await fetch(
//           "https://developer.junglescout.com/api/keywords/keywords_by_keyword_query?marketplace=us&sort=-monthly_search_volume_exact&page[size]=50",
//           requestOptions
//         );
//         const result = await response.json();
//         setResult(result);
//       } catch (error) {
//         setError(error.toString());
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array means this useEffect runs once when the component mounts

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!result || !result.data) {
//     return <div>No data available</div>;
//   }

//   return (
//     <div>
//       {result.data.map((item) => (
//         <div key={item.id}>
//           <div>Name: {item.attributes.name}</div>
//           <div>Dominant Category: {item.attributes.dominant_category}</div>
//           <div>
//             Monthly Search Volume (Exact):
//             {item.attributes.monthly_search_volume_exact}
//           </div>
//           <div>
//             Monthly Search Volume (Broad):
//             {item.attributes.monthly_search_volume_broad}
//           </div>
//           <div>
//             Organic Product Count: {item.attributes.organic_product_count}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default KeywordSearch;

// Category Vise Filter

// import React, { useState, useEffect } from "react";

// const KeywordSearch = () => {
//   const categories = [
//     "Appliances",
//     "Arts, Crafts & Sewing",
//     "Automotive",
//     "Baby",
//     "Beauty & Personal Care",
//     "Camera & Photo",
//     "Cell Phones & Accessories",
//     "Clothing, Shoes & Jewelry",
//     "Computers & Accessories",
//     "Electronics",
//     "Grocery & Gourmet Food",
//     "Health & Household",
//     "Home & Kitchen",
//     "Industrial & Scientific",
//     "Kitchen & Dining",
//     "Musical Instruments",
//     "Office Products",
//     "Patio, Lawn & Garden",
//     "Pet Supplies",
//     "Software",
//     "Sports & Outdoors",
//     "Tools & Home Improvement",
//     "Toys & Games",
//     "Video Games",
//   ];

//   const [selectedCategory, setSelectedCategory] = useState(categories[0]);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const myHeaders = new Headers();
//       myHeaders.append("X_API_Type", "junglescout");
//       myHeaders.append("Accept", "application/vnd.junglescout.v1+json");
//       myHeaders.append("Content-Type", "application/vnd.api+json");
//       myHeaders.append(
//         "Authorization",
//         "ECOM:XKgL8Yfmd0k9jIHc1HWJIlZHVvD5xtzjnyepxsgCP_8"
//       );

//       const raw = JSON.stringify({
//         data: {
//           type: "keywords_by_keyword_query",
//           attributes: {
//             categories: [selectedCategory],
//             search_terms: "yoga",
//             min_monthly_search_volume_exact: 1,
//             max_monthly_search_volume_exact: 99999,
//             min_monthly_search_volume_broad: 1,
//             max_monthly_search_volume_broad: 99999,
//             min_word_count: 1,
//             max_word_count: 99999,
//             min_organic_product_count: 1,
//             max_organic_product_count: 99999,
//           },
//         },
//       });

//       const requestOptions = {
//         method: "POST",
//         headers: myHeaders,
//         body: raw,
//         redirect: "follow",
//       };

//       try {
//         const response = await fetch(
//           "https://developer.junglescout.com/api/keywords/keywords_by_keyword_query?marketplace=us&sort=-monthly_search_volume_exact&page[size]=50",
//           requestOptions
//         );
//         const result = await response.text();
//         setResult(result);
//       } catch (error) {
//         setError(error.toString());
//       }
//     };

//     fetchData();
//   }, [selectedCategory]); // Dependency array now includes selectedCategory to refetch on change

//   console.log("RESULT=====", result);

//   return (
//     <div>
//       <div>
//         <label htmlFor="category-select">Select Category:</label>
//         <select
//           id="category-select"
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           {categories.map((category) => (
//             <option key={category} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>
//       </div>
//       {error ? (
//         <div>Error: {error}</div>
//       ) : (
//         <pre>{JSON.stringify(result, null, 2)}</pre>
//       )}
//     </div>
//   );
// };

// export default KeywordSearch;

// updated

// import React, { useState, useEffect } from "react";

// const CombinedComponent = () => {
//   // State management for Keyword Search
//   const [keywordResult, setKeywordResult] = useState(null);
//   const [keywordError, setKeywordError] = useState(null);
//   const [keywordLoading, setKeywordLoading] = useState(true);

//   // State management for Product List
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [productError, setProductError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   // Fetch Keyword Search data
//   const fetchKeywordData = async () => {
//     const myHeaders = new Headers();
//     myHeaders.append("X_API_Type", "junglescout");
//     myHeaders.append("Accept", "application/vnd.junglescout.v1+json");
//     myHeaders.append("Content-Type", "application/vnd.api+json");
//     myHeaders.append(
//       "Authorization",
//       "ECOM:XKgL8Yfmd0k9jIHc1HWJIlZHVvD5xtzjnyepxsgCP_8"
//     );

//     const raw = JSON.stringify({
//       data: {
//         type: "keywords_by_keyword_query",
//         attributes: {
//           categories: [
//             "Appliances",
//             "Arts, Crafts & Sewing",
//             "Automotive",
//             "Baby",
//             "Beauty & Personal Care",
//             "Camera & Photo",
//             "Cell Phones & Accessories",
//             "Clothing, Shoes & Jewelry",
//             "Computers & Accessories",
//             "Electronics",
//             "Grocery & Gourmet Food",
//             "Health & Household",
//             "Home & Kitchen",
//             "Industrial & Scientific",
//             "Kitchen & Dining",
//             "Musical Instruments",
//             "Office Products",
//             "Patio, Lawn & Garden",
//             "Pet Supplies",
//             "Software",
//             "Sports & Outdoors",
//             "Tools & Home Improvement",
//             "Toys & Games",
//             "Video Games",
//           ],
//           search_terms: "yoga",
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
//         "https://developer.junglescout.com/api/keywords/keywords_by_keyword_query?marketplace=us&sort=-monthly_search_volume_exact&page[size]=50",
//         requestOptions
//       );
//       const result = await response.json();
//       setKeywordResult(result);
//     } catch (error) {
//       setKeywordError(error.toString());
//     } finally {
//       setKeywordLoading(false);
//     }
//   };

//   // Fetch Product List data
//   const fetchProducts = (page) => {
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
//           include_keywords: ["Watches"],
//           categories: [
//             "Appliances",
//             "Arts, Crafts & Sewing",
//             "Automotive",
//             "Baby",
//             "Beauty & Personal Care",
//             "Camera & Photo",
//             "Cell Phones & Accessories",
//             "Clothing, Shoes & Jewelry",
//             "Computers & Accessories",
//             "Electronics",
//             "Grocery & Gourmet Food",
//             "Health & Household",
//             "Home & Kitchen",
//             "Industrial & Scientific",
//             "Kitchen & Dining",
//             "Musical Instruments",
//             "Office Products",
//             "Patio, Lawn & Garden",
//             "Pet Supplies",
//             "Software",
//             "Sports & Outdoors",
//             "Tools & Home Improvement",
//             "Toys & Games",
//             "Video Games",
//           ],
//           exclude_unavailable_products: true,
//         },
//       },
//     });

//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow",
//     };

//     fetch(
//       `https://developer.junglescout.com/api/product_database_query?marketplace=us&page[size]=50&page[number]=${page}`,
//       requestOptions
//     )
//       .then((response) => response.json())
//       .then((result) => {
//         if (result.data) {
//           setProducts(result.data);
//           setFilteredProducts(result.data);
//           setTotalPages(Math.ceil(result.meta.total / 50));
//         } else {
//           setProducts([]);
//           setFilteredProducts([]);
//         }
//       })
//       .catch((error) => {
//         setProductError(error);
//         console.log("error", error);
//       });
//   };

//   useEffect(() => {
//     fetchKeywordData();
//     fetchProducts(currentPage);
//   }, [currentPage]);

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//     const filtered = products.filter((product) =>
//       product.attributes.parent_asin
//         .toLowerCase()
//         .includes(event.target.value.toLowerCase())
//     );
//     setFilteredProducts(filtered);
//   };

//   const handleProductClick = (url) => {
//     window.location.href = url;
//   };

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   if (keywordLoading) {
//     return <div>Loading...</div>;
//   }

//   if (keywordError) {
//     return <div>Error: {keywordError}</div>;
//   }

//   if (productError) {
//     return <div>Error: {productError.message}</div>;
//   }

//   if (!keywordResult || !keywordResult.data) {
//     return <div>No data available</div>;
//   }

//   console.log("products=======", products);

//   return (
//     <div className="container">
//       {/* Keyword Search Results */}
//       <div className="row mt-3 justify-content-center mb-3">
//         <div className="col-md-12 p-3">
//           <div className="about-heading">Keyword Search Results</div>
//           <div className="desc">Learn about keywords</div>
//           {keywordResult.data.map((item) => (
//             <div key={item.id} className="keyword-item">
//               <div style={{ color: "black", fontSize: "14px" }}>
//                 Name:
//                 <span
//                   style={{
//                     fontSize: "14px",
//                     fontWeight: "bold",
//                     color: "black",
//                   }}
//                 >
//                   {item.attributes.name}
//                 </span>
//               </div>
//               <div style={{ color: "black", fontSize: "14px" }}>
//                 Dominant Category:
//                 <span
//                   style={{
//                     fontSize: "14px",
//                     fontWeight: "bold",
//                     color: "black",
//                   }}
//                 >
//                   {item.attributes.dominant_category}
//                 </span>
//               </div>
//               <div style={{ color: "black", fontSize: "14px" }}>
//                 Monthly Search Volume (Exact):
//                 <span
//                   style={{
//                     fontSize: "14px",
//                     fontWeight: "bold",
//                     color: "black",
//                   }}
//                 >
//                   {item.attributes.monthly_search_volume_exact}
//                 </span>
//               </div>
//               <div style={{ color: "black", fontSize: "14px" }}>
//                 Monthly Search Volume (Broad):
//                 <span
//                   style={{
//                     fontSize: "14px",
//                     fontWeight: "bold",
//                     color: "black",
//                   }}
//                 >
//                   {item.attributes.monthly_search_volume_broad}
//                 </span>
//               </div>
//               <div style={{ color: "black", fontSize: "14px" }}>
//                 Organic Product Count:
//                 <span
//                   style={{
//                     fontSize: "14px",
//                     fontWeight: "bold",
//                     color: "black",
//                   }}
//                 >
//                   {item.attributes.organic_product_count}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Product List */}
//       <div className="row mt-3 justify-content-center mb-3">
//         <div className="col-md-12 p-3">
//           <div className="row mt-3 mb-3">
//             <div className="about-heading">Research a Keyword</div>
//             <div className="col-md-10">
//               <input
//                 className="input_box"
//                 type="text"
//                 placeholder="Search by ASIN"
//                 value={searchQuery}
//                 onChange={handleSearch}
//               />
//             </div>
//             <div className="col-md-2 d-flex justify-content-end">
//               <button className="btn btn-primary search_icon" type="submit">
//                 Search
//               </button>
//             </div>
//           </div>

//           <div className="desc">Learn about competitors</div>

//           <table className="table table-bordered mt-3">
//             <thead>
//               <tr>
//                 <th style={{ width: "310px" }} className="t_head" scope="col">
//                   Product Image
//                 </th>
//                 <th className="t_head" scope="col">
//                   Product Name
//                 </th>
//                 <th className="t_head" scope="col">
//                   Product Asin
//                 </th>
//                 <th className="t_head" scope="col">
//                   Product Brand
//                 </th>
//                 <th className="t_head" scope="col">
//                   Product Category
//                 </th>
//                 <th className="t_head" scope="col">
//                   30 Days Revenue
//                 </th>
//                 <th className="t_head" scope="col">
//                   30 Unit Sold
//                 </th>
//                 <th className="t_head" scope="col">
//                   Product Price
//                 </th>
//                 <th className="t_head" scope="col">
//                   Product Rating
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredProducts && filteredProducts.length > 0 ? (
//                 filteredProducts.map((product) => (
//                   <tr
//                     key={product.id}
//                     onClick={() =>
//                       handleProductClick(
//                         `https://www.amazon.com/dp/${product.attributes.parent_asin}`
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
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="9">Loading...</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//           {/* Pagination Controls */}
//           <div className="pagination-controls">
//             <button
//               className="btn btn-secondary"
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </button>
//             <span className="mx-2">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               className="btn btn-secondary"
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CombinedComponent;

// import React, { useState, useEffect } from "react";

// const CombinedComponent = () => {
//   // State management for Keyword Search (not used in the following code)
//   const [keywordResult, setKeywordResult] = useState(null);
//   const [keywordError, setKeywordError] = useState(null);
//   const [keywordLoading, setKeywordLoading] = useState(true);

//   // State management for Product List
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [productError, setProductError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

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
//           include_keywords: ["Watches"],
//           categories: [
//             "Appliances",
//             "Arts, Crafts & Sewing",
//             "Automotive",
//             "Baby",
//             "Beauty & Personal Care",
//             "Camera & Photo",
//             "Cell Phones & Accessories",
//             "Clothing, Shoes & Jewelry",
//             "Computers & Accessories",
//             "Electronics",
//             "Grocery & Gourmet Food",
//             "Health & Household",
//             "Home & Kitchen",
//             "Industrial & Scientific",
//             "Kitchen & Dining",
//             "Musical Instruments",
//             "Office Products",
//             "Patio, Lawn & Garden",
//             "Pet Supplies",
//             "Software",
//             "Sports & Outdoors",
//             "Tools & Home Improvement",
//             "Toys & Games",
//             "Video Games",
//           ],
//           exclude_unavailable_products: true,
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
//         `https://developer.junglescout.com/api/product_database_query?marketplace=us&page[size]=50&page[number]=${page}`,
//         requestOptions
//       );
//       const result = await response.json();
//       if (result.data) {
//         setProducts(result.data);
//         setFilteredProducts(result.data);
//         setTotalPages(Math.ceil(result.meta.total / 50));
//       } else {
//         setProducts([]);
//         setFilteredProducts([]);
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
//     if (searchQuery) {
//       const filtered = products.filter(
//         (product) =>
//           product.attributes.parent_asin
//             .toLowerCase()
//             .includes(searchQuery.toLowerCase()) ||
//           product.attributes.title
//             .toLowerCase()
//             .includes(searchQuery.toLowerCase())
//       );
//       setFilteredProducts(filtered);
//     } else {
//       setFilteredProducts(products);
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
//                 placeholder="Search by ASIN or Product Name"
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

//           <div className="desc">Learn about competitors</div>

//           <table className="table table-bordered mt-3">
//             <thead>
//               <tr>
//                 <th style={{ width: "310px" }} className="t_head" scope="col">
//                   Product Image
//                 </th>
//                 <th className="t_head" scope="col">
//                   Product Name
//                 </th>
//                 <th className="t_head" scope="col">
//                   Product Asin
//                 </th>
//                 <th className="t_head" scope="col">
//                   Product Brand
//                 </th>
//                 <th className="t_head" scope="col">
//                   Product Category
//                 </th>
//                 <th className="t_head" scope="col">
//                   30 Days Revenue
//                 </th>
//                 <th className="t_head" scope="col">
//                   30 Unit Sold
//                 </th>
//                 <th className="t_head" scope="col">
//                   Product Price
//                 </th>
//                 <th className="t_head" scope="col">
//                   Product Rating
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredProducts && filteredProducts.length > 0 ? (
//                 filteredProducts.map((product) => (
//                   <tr
//                     key={product.id}
//                     onClick={() =>
//                       handleProductClick(
//                         `https://www.amazon.com/dp/${product.attributes.parent_asin}`
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
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="9">No products found</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//           {/* Pagination Controls */}
//           <div className="pagination-controls">
//             <button
//               className="btn btn-secondary"
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </button>
//             <span className="mx-2">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               className="btn btn-secondary"
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CombinedComponent;

// Search list working code

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
//           include_keywords: ["Watches"],
//           categories: [
//             "Appliances",
//             "Arts, Crafts & Sewing",
//             "Automotive",
//             "Baby",
//             "Beauty & Personal Care",
//             "Camera & Photo",
//             "Cell Phones & Accessories",
//             "Clothing, Shoes & Jewelry",
//             "Computers & Accessories",
//             "Electronics",
//             "Grocery & Gourmet Food",
//             "Health & Household",
//             "Home & Kitchen",
//             "Industrial & Scientific",
//             "Kitchen & Dining",
//             "Musical Instruments",
//             "Office Products",
//             "Patio, Lawn & Garden",
//             "Pet Supplies",
//             "Software",
//             "Sports & Outdoors",
//             "Tools & Home Improvement",
//             "Toys & Games",
//             "Video Games",
//           ],
//           exclude_unavailable_products: true,
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
//         `https://developer.junglescout.com/api/product_database_query?marketplace=us&page[size]=100&page[number]=${page}`,
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
//             .includes(searchQuery.toLowerCase())
//       );
//       setFilteredProducts(filtered);
//       if (filtered.length === 0) {
//         setSearchMessage("ASIN code not correct");
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
//                 placeholder="Search by ASIN or Product Name"
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
//                         `https://www.amazon.com/dp/${product.attributes.parent_asin}`
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

//           {/* Pagination Controls */}
//           {hasSearched && filteredProducts.length > 0 && (
//             <div className="pagination-controls">
//               <button
//                 className="btn btn-secondary"
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//               >
//                 Previous
//               </button>
//               <span className="mx-2">
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 className="btn btn-secondary"
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CombinedComponent;

// last

import React, { useState, useEffect } from "react";

const CombinedComponent = () => {
  // State management for Product List
  const [products, setProducts] = useState([]);
  const [productError, setProductError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50; // Items per page

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
          include_keywords: ["Watches"],
          categories: [
            "Appliances",
            "Arts, Crafts & Sewing",
            "Automotive",
            "Baby",
            "Beauty & Personal Care",
            "Camera & Photo",
            "Cell Phones & Accessories",
            "Clothing, Shoes & Jewelry",
            "Computers & Accessories",
            "Electronics",
            "Grocery & Gourmet Food",
            "Health & Household",
            "Home & Kitchen",
            "Industrial & Scientific",
            "Kitchen & Dining",
            "Musical Instruments",
            "Office Products",
            "Patio, Lawn & Garden",
            "Pet Supplies",
            "Software",
            "Sports & Outdoors",
            "Tools & Home Improvement",
            "Toys & Games",
            "Video Games",
          ],
          exclude_unavailable_products: true,
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
        `https://developer.junglescout.com/api/product_database_query?marketplace=us&page[size]=${itemsPerPage}&page[number]=${page}`,
        requestOptions
      );
      const result = await response.json();
      if (result.data) {
        setProducts((prevProducts) => [...prevProducts, ...result.data]);
      } else {
        setProducts([]);
      }
    } catch (error) {
      setProductError(error);
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handleProductClick = (url) => {
    window.location.href = url;
  };

  const loadMoreProducts = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  if (productError) {
    return <div>Error: {productError.message}</div>;
  }

  console.log("products=====", products.length);

  return (
    <div className="container">
      {/* Product List */}
      <div className="row mt-3 justify-content-center mb-3">
        <div className="col-md-12 p-3">
          {products.length > 0 && (
            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th style={{ width: "310px" }} className="t_head" scope="col">
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
                    30 Unit Sold
                  </th>
                  <th className="t_head" scope="col">
                    Product Price
                  </th>
                  <th className="t_head" scope="col">
                    Product Rating
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    onClick={() =>
                      handleProductClick(
                        `https://www.amazon.com/dp/${product.attributes.parent_asin}`
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
                      {product.attributes.price}
                    </td>
                    <td style={{ color: "black", fontSize: "14px" }}>
                      {product.attributes.rating}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Load More Button */}
          <div className="load-more-controls">
            <button className="btn btn-primary" onClick={loadMoreProducts}>
              Load More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedComponent;
