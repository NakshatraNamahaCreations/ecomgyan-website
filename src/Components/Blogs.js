import React from "react";

function Blogs() {
  return (
    <div className="container">
      <div className="row col-md-12 p-3">
        <div className="col-md-6 p-3">
          <h1 className="blog_h">
            Unique blog <span style={{ color: "#FE4A23" }}>styles.</span>
          </h1>
        </div>
        <div className="col-md-6 p-3">
          <div className="blog_desc1 pt-4">
            When you’re building a business around your niche (as an author,
            speaker, coach, consultant, freelancer, etc.), the concept of
            building a personal branding probably comes naturally to you. When
            you’re the face of your business, building your personal brand makes
            perfect sense.
          </div>
        </div>
      </div>
      <div className="row  pt-4">
        <div className="col-md-6 pb-5">
          <div className="row">
            <div className="col-md-6">
              <img
                src="./images/b.webp"
                alt="loading...."
                className="blog_img"
              />
            </div>
            <div className="col-md-6">
              <div className="b_desc pt-3">
                Tips for creating accessible online courses for all learners
              </div>
              <p className="b_p">
                You need an irresistible offer that helps your audience solve a
                specific problem.
              </p>
              <div className="read_more">Read More </div>
            </div>
          </div>
        </div>

        {/* col-2 */}
        <div className="col-md-6 pb-5">
          <div className="row">
            <div className="col-md-6">
              <img
                src="./images/b1.webp"
                alt="loading...."
                className="blog_img"
              />
            </div>
            <div className="col-md-6">
              <div className="b_desc pt-3">
                Tips for creating accessible online courses for all learners
              </div>
              <p className="b_p">
                You need an irresistible offer that helps your audience solve a
                specific problem.
              </p>
              <div className="read_more">Read More</div>
            </div>
          </div>
        </div>

        <div className="col-md-6 pb-5">
          <div className="row">
            <div className="col-md-6">
              <img
                src="./images/b2.webp"
                alt="loading...."
                className="blog_img"
              />
            </div>
            <div className="col-md-6">
              <div className="b_desc pt-3">
                Tips for creating accessible online courses for all learners
              </div>
              <p className="b_p">
                You need an irresistible offer that helps your audience solve a
                specific problem.
              </p>
              <div className="read_more">Read More</div>
            </div>
          </div>
        </div>

        <div className="col-md-6 pb-5">
          <div className="row">
            <div className="col-md-6">
              <img
                src="./images/b3.webp"
                alt="loading...."
                className="blog_img"
              />
            </div>
            <div className="col-md-6">
              <div className="b_desc pt-3">
                Tips for creating accessible online courses for all learners
              </div>
              <p className="b_p">
                You need an irresistible offer that helps your audience solve a
                specific problem.
              </p>
              <div className="read_more">Read More</div>
            </div>
          </div>
        </div>

        <div className="col-md-6 pb-5">
          <div className="row">
            <div className="col-md-6">
              <img
                src="./images/b4.webp"
                alt="loading...."
                className="blog_img"
              />
            </div>
            <div className="col-md-6">
              <div className="b_desc pt-3">
                Tips for creating accessible online courses for all learners
              </div>
              <p className="b_p">
                You need an irresistible offer that helps your audience solve a
                specific problem.
              </p>
              <div className="read_more">Read More </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 pb-5">
          <div className="row">
            <div className="col-md-6">
              <img
                src="./images/b5.webp"
                alt="loading...."
                className="blog_img"
              />
            </div>
            <div className="col-md-6 pb-5">
              <div className="b_desc pt-3">
                Tips for creating accessible online courses for all learners
              </div>
              <p className="b_p">
                You need an irresistible offer that helps your audience solve a
                specific problem.
              </p>
              <div className="read_more">Read More</div>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="b_button">Load More</div>
      </div>

      <div
        className="row mb-5 mt-4"
        style={{
          backgroundColor: "#010A44",
          padding: "30px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontSize: "28px",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Start achieving more today.
        </div>
        <div
          style={{
            color: "#CACACA",
            fontSize: "15px",
            textAlign: "center",
            marginTop: "15px",
          }}
        >
          Unlock new opportunities and achieve more with flexible, in-demand
          courses.Achieve your goals faster with courses designed for real-world
          success.
        </div>
        <div
          style={{
            color: "#CACACA",
            fontSize: "15px",
            textAlign: "center",
          }}
        >
          feugiat sed aliquam tellus aliquet risus tortor tellus.
        </div>
        <div className="row justify-content-center pt-5">
          <div className="edication">Schedule Education</div>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
