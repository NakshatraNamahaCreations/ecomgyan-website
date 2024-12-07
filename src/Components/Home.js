import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

function Home() {
  const [bannerdata, setbannerdata] = useState([]);

  useEffect(() => {
    getallbanner();
  });

  const getallbanner = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8082/api/youtube/getallvideo"
      );
      if (response.status === 200) {
        setbannerdata(response.data.data);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  console.log("bannerdata", bannerdata);
  return (
    <div className="">
      {/* <img
        src="./images/home.jpg"
        style={{ width: "100%", height: "350px" }}
        alt="loading..."
      /> */}
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          {bannerdata.map((item, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={item._id}
            >
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <img
                  // src={item.thumbnailImage}
                  src={`http://localhost:8082/documents/${item.thumbnailImage}`}
                  className="d-block w-100"
                  style={{ height: "500px", objectFit: "cover" }}
                  // alt={item.title}
                />
              </a>
              {/* <div className="carousel-caption d-none d-md-block">
                <h5>{item.title}</h5>
                <p>{item.description}</p>
              </div> */}
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="poppins-black mt-3 mb-3">Courses and Services</div>

            <div className="row mb-4">
              <div className="col-md-6">
                <div
                  className="d-flex"
                  style={{
                    backgroundColor: "#d8ebfc85",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  <div className="col-md-3">
                    <div
                      className="d-flex"
                      style={{ justifyContent: "center" }}
                    >
                      <img
                        src="./images/ecom-logo-up.png"
                        style={{
                          borderRadius: "5px",
                          width: "100px",
                          height: "100px",
                        }}
                        alt="loading..."
                      />
                    </div>
                  </div>

                  <div className="col-md-9">
                    <div className="poppins-regular px-3 pt-2">
                      Ecom Gyan Amazon FBA Mastery Course(HINDI) | Lifetime
                      Access + UNLIMITED 1 on 1 Mentorship
                    </div>

                    <div
                      className="d-flex px-3 mt-3"
                      style={{ justifyContent: "space-between" }}
                    >
                      <div className="d-flex" style={{ alignItems: "center" }}>
                        <div
                          className="poppins-regular"
                          style={{ fontWeight: "bold" }}
                        >
                          ₹ 16,997
                        </div>
                      </div>

                      <div
                        className="poppins-regular"
                        style={{
                          backgroundColor: "#F5BF61",
                          padding: "5px 20px",
                          borderRadius: "5px",
                        }}
                      >
                        Know more
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div
                  className="d-flex"
                  style={{
                    backgroundColor: "#d8ebfc85",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  <div className="col-md-3">
                    <div
                      className="d-flex"
                      style={{ justifyContent: "center" }}
                    >
                      <img
                        src="./images/ecom-logo-up.png"
                        style={{
                          borderRadius: "5px",
                          width: "100px",
                          height: "100px",
                        }}
                        alt="loading..."
                      />
                    </div>
                  </div>

                  <div className="col-md-9">
                    <div className="poppins-regular px-3 pt-2">
                      Ecom Gyan Done For You Services
                    </div>

                    <div
                      className="d-flex px-3 mt-3"
                      style={{ justifyContent: "space-between" }}
                    >
                      <div className="d-flex" style={{ alignItems: "center" }}>
                        <div
                          className="poppins-regular"
                          style={{ fontWeight: "bold" }}
                        >
                          ₹ 8,997
                        </div>
                      </div>

                      <div
                        className="poppins-regular"
                        style={{
                          backgroundColor: "#F5BF61",
                          padding: "5px 20px",
                          borderRadius: "5px",
                        }}
                      >
                        Know more
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
