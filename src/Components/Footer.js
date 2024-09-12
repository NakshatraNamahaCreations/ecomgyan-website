import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="row footer">
      {/* <div className="">
        <i
          className="fa-brands fa-rocketchat"
          style={{
            backgroundColor: "blue",
            fontSize: "28px",
            padding: "15px",
            borderRadius: "50px",
            color: "white",
            position: "absolute",
            right: "50px",
            marginTop: "-120px",
          }}
        ></i>
      </div> */}
      <div className="col-md-3">
        <img
          src="./images/pro.png"
          style={{
            height: "60px",
          }}
          alt="loading..."
        />
        <div
          className="poppins-regular mt-3"
          style={{ color: "#b6aeae", fontSize: "13px" }}
        >
          (Formerly known as Ecom Gyan)
        </div>
        <div
          className="poppins-regular"
          style={{ color: "#b6aeae", fontSize: "13px" }}
        >
          Great lesson ideas and lesson plans for ESL teachers! Educators can
          customize lesson plans to best.
        </div>
      </div>
      <div className="col-md-3 text-center mt-3">
        <div className=" f-heading poppins-semibold">Company</div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="f-desc mt-3 poppins-regular">Home</div>
        </Link>
        <Link to="/about" style={{ textDecoration: "none" }}>
          <div className="f-desc poppins-regular">About Us</div>
        </Link>
        <Link to="/asin-code" style={{ textDecoration: "none" }}>
          <div className="f-desc poppins-regular">Tools</div>
        </Link>
        <Link to="/courses" style={{ textDecoration: "none" }}>
          <div className="f-desc poppins-regular">Courses</div>
        </Link>
        <Link to="/blogs" style={{ textDecoration: "none" }}>
          <div className="f-desc poppins-regular">Blog</div>
        </Link>
      </div>

      <div className="col-md-3 text-center mt-3">
        <div className=" f-heading poppins-semibold">Platform</div>
        <Link to="/privacy-policy" style={{ textDecoration: "none" }}>
          <div className="f-desc mt-3 poppins-regular">Privacy policy</div>
        </Link>
        <Link to="/termsofuse" style={{ textDecoration: "none" }}>
          <div className="f-desc poppins-regular">Terms of use</div>
        </Link>
        <Link to="/refund-policy" style={{ textDecoration: "none" }}>
          <div className="f-desc poppins-regular">Refund policy</div>
        </Link>

        {/* <div className="f-desc poppins-regular">News & Blogs</div>
        <div className="f-desc poppins-regular">FAQs</div> */}
      </div>

      <div className="col-md-3  mt-3">
        <div className="f-heading poppins-semibold">Subscribe</div>
        <input
          type="text"
          className="f-input poppins-regular"
          placeholder="Your Email Address"
        />
        <div className="f-desc1 poppins-regular">
          Get the latest news and updates right at your inbox.
        </div>
      </div>

      <div
        className="poppins-semibold text-center mt-3"
        style={{ color: "#b6aeae", fontSize: "18px" }}
      >
        © All Rights Reserved to Ecom Gyan.
      </div>
    </div>
  );
}

export default Footer;
