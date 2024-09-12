import React from "react";

function Blogs() {
  return (
    <div className="row">
      <div className="row justify-content-center g-color">
        <div className="col-md-10">
          <div
            className=""
            style={{ color: "black", fontSize: "16px", marginTop: "35px" }}
          >
            Home > All Blog
          </div>
          <div
            style={{
              color: "black",
              fontSize: "25px",
              fontWeight: "bold",
              marginTop: "15px",
            }}
          >
            All Blogs
          </div>
          <div className="mt-2" style={{ color: "black" }}>
            Blog that help beginner designers become true unicorns.
          </div>
        </div>
      </div>
      <div
        className="row justify-content-center"
        style={{ marginTop: "-245px" }}
      >
        <div className="col-md-10">
          <div className="mt-5 pt-4 pb-5">
            <img
              src="./images/blog_home.webp"
              alt="loading..."
              style={{
                width: "100%",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
              className="blog-zoom"
            />
            <div
              className="blog_row shadow-sm "
              style={{
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
            >
              <div className="blog-heading">
                How to Analyze Your Best Pages for SEO Performance
              </div>
              <div className="blog_desc">
                It is a long established fact that a reader.
              </div>
              <div
                className="mt-3"
                style={{
                  textAlign: "left",
                  fontSize: "16px",
                  fontWeight: 700,
                }}
              >
                Learn More
                <span>
                  <i
                    class="fa-solid fa-arrow-right"
                    style={{
                      color: "black",
                      fontSize: "14px",
                      marginLeft: "10px",
                    }}
                  ></i>
                </span>
              </div>
            </div>
          </div>

          <div className="mb-3 m-auto row  box_shadow">
            <div className="col-md-4" style={{ display: "contents" }}>
              <img
                src="./images/blog1.webp"
                className=" blog_img"
                alt="loading..."
              />
            </div>
            <div className="col-md-8" style={{ marginTop: "45px" }}>
              <div className="blog-heading">
                Difficult Things About Education.
              </div>

              <div className="pt-2">
                Read Article
                <span>
                  <i
                    class="fa-solid fa-arrow-right"
                    style={{
                      color: "black",
                      fontSize: "14px",
                      marginLeft: "10px",
                    }}
                  ></i>
                </span>
              </div>
            </div>
          </div>

          <div className="mb-3 m-auto mt-5 row  box_shadow">
            <div className="col-md-4" style={{ display: "contents" }}>
              <img
                src="./images/blog2.webp"
                className=" blog_img"
                alt="loading..."
              />
            </div>
            <div className="col-md-8" style={{ marginTop: "45px" }}>
              <div className="blog-heading">
                Difficult Things About Education.
              </div>

              <div className="pt-2">
                Read Article
                <span>
                  <i
                    class="fa-solid fa-arrow-right"
                    style={{
                      color: "black",
                      fontSize: "14px",
                      marginLeft: "10px",
                    }}
                  ></i>
                </span>
              </div>
            </div>
          </div>

          <div className="mb-3 m-auto mt-5 row  box_shadow">
            <div className="col-md-4" style={{ display: "contents" }}>
              <img
                src="./images/blog3.webp"
                className=" blog_img"
                alt="loading..."
              />
            </div>
            <div className="col-md-8" style={{ marginTop: "45px" }}>
              <div className="blog-heading">
                Difficult Things About Education.
              </div>

              <div className="pt-2">
                Read Article
                <span>
                  <i
                    class="fa-solid fa-arrow-right"
                    style={{
                      color: "black",
                      fontSize: "14px",
                      marginLeft: "10px",
                    }}
                  ></i>
                </span>
              </div>
            </div>
          </div>

          <div className="mb-3 m-auto mt-5 row  box_shadow">
            <div className="col-md-4" style={{ display: "contents" }}>
              <img
                src="./images/blog5.webp"
                className=" blog_img"
                alt="loading..."
              />
            </div>
            <div className="col-md-8" style={{ marginTop: "45px" }}>
              <div className="blog-heading">
                Difficult Things About Education.
              </div>

              <div className="pt-2">
                Read Article
                <span>
                  <i
                    class="fa-solid fa-arrow-right"
                    style={{
                      color: "black",
                      fontSize: "14px",
                      marginLeft: "10px",
                    }}
                  ></i>
                </span>
              </div>
            </div>
          </div>

          <div className="mb-5 m-auto  mt-5 row  box_shadow">
            <div className="col-md-4" style={{ display: "contents" }}>
              <img
                src="./images/blog6.webp"
                className=" blog_img"
                alt="loading..."
              />
            </div>
            <div className="col-md-8" style={{ marginTop: "45px" }}>
              <div className="blog-heading">
                Difficult Things About Education.
              </div>

              <div className="pt-2">
                Read Article
                <span>
                  <i
                    class="fa-solid fa-arrow-right"
                    style={{
                      color: "black",
                      fontSize: "14px",
                      marginLeft: "10px",
                    }}
                  ></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
