import React from "react";

function About() {
  return (
    <div className="container">
      <div className="row col-md-12 pt-5">
        <img src="./images/a3.webp" alt="loading...." className="mb-5" />
        <div className="col-md-6">
          <div className="about-heading poppins-medium">
            Decor The Dreams with Wood Beauty
          </div>
          <p className="poppins-regular">
            At Proleverage, we believe that education is the key to unlocking
            your full potential. That's why we offer a wide range of courses
            across various industries and subject areas. Our instructors are
            experts in their fields and bring real-world experience to the
            classroom
          </p>

          <div className="about-heading poppins-medium">Our mission</div>
          <p className="poppins-regular">
            We work directly with our manufacturers to produce unique, durable
            pieces using high-quality materials.
          </p>

          <div className="about-heading poppins-medium">
            Empowering Lifelong Learning Top-Quality Courses
          </div>
          <p className="poppins-regular">
            Whether you're looking to advance your career, learn a new skill, or
            simply satisfy your curiosity, Proleverage has something for you.
            Our user-friendly platform makes it easy to find.
          </p>
        </div>
        <div className="col-md-6">
          <img
            src="./images/a.webp"
            alt="loading...."
            className="about_image"
          />
          <img
            src="./images/a1.webp"
            alt="loading...."
            className="about_image1"
          />
        </div>

        <div className="row mt-5 mb-5">
          <div
            className="col-md-6"
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <img
              src="./images/a2.webp"
              alt="loading...."
              style={{ width: "100%", borderRadius: "5px", height: "200px" }}
            />
          </div>
          <div className="col-md-6 ">
            <div className="about-heading poppins-medium">
              Master New Skills with Our Curated Courses
            </div>
            <div className="poppins-regular">
              We offer a wide range of carefully curated courses designed to
              help you gain valuable skills in today's fast-evolving world.
              Whether you're looking to advance your career, explore new
              passions, or simply expand your knowledge, our expert courses
              cover everything from technology and business to create personal
              development.
            </div>
            <div className="a-button poppins-regular mt-3">Discover Now</div>
          </div>
        </div>
      </div>
      <div className="row mt-4 mb-5">
        <div className="about-heading poppins-medium">More to discover</div>
        <div className="col-md-4">
          <img
            src="./images/a3.webp"
            alt="loading...."
            style={{ width: "100%" }}
          />
          <div
            className="about-heading poppins-medium"
            style={{ marginTop: "10px" }}
          >
            What we do
          </div>
          <p className="poppins-regular">
            Our mission is to empower individuals by providing high-quality,
            curated courses that enable them to learn, grow, and achieve their
            personal and professional goals.
          </p>
          <div
            className="read_more poppins-regular"
            style={{
              marginTop: "-5px",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            View More
          </div>
        </div>
        <div className="col-md-4">
          <img
            src="./images/a4.webp"
            alt="loading...."
            style={{ width: "100%" }}
          />
          <div
            className="about-heading poppins-medium"
            style={{ marginTop: "10px" }}
          >
            What we do
          </div>
          <p className="poppins-regular">
            We offer a diverse range of courses that are meticulously designed
            and taught by industry experts, ensuring you gain the most relevant
            and up-to-date skills.
          </p>
          <div
            className="read_more poppins-regular"
            style={{
              marginTop: "-5px",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            View More
          </div>
        </div>

        <div className="col-md-4">
          <img
            src="./images/a5.webp"
            alt="loading...."
            style={{ width: "100%" }}
          />
          <div
            className="about-heading poppins-medium"
            style={{ marginTop: "10px" }}
          >
            What we do
          </div>
          <p className="poppins-regular">
            We are always striving to improve our courses and the learning
            experience we provide. we ensure that the content stays fresh,
            relevant, and aligned with your learning needs.
          </p>
          <div
            className="read_more poppins-regular"
            style={{
              marginTop: "-5px",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            View More
          </div>
        </div>
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
          className="poppins-medium"
          style={{
            textAlign: "center",
            color: "white",
          }}
        >
          Start achieving more today.
        </div>
        <div
          className="poppins-regular pt-2"
          style={{
            color: "#CACACA",
            textAlign: "center",
          }}
        >
          Unlock new opportunities and achieve more with flexible, in-demand
          courses.Achieve your goals faster with courses designed for real-world
          success.
        </div>
        {/* <div
          className="poppins-regular"
          style={{
            color: "#CACACA",

            textAlign: "center",
          }}
        >
          feugiat sed aliquam tellus aliquet risus tortor tellus.
        </div> */}
        <div className="row justify-content-center pt-3">
          <div className="edication poppins-regular">Schedule Education</div>
        </div>
      </div>
    </div>
  );
}

export default About;
