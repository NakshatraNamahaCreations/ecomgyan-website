import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Courses() {
  const [allcourse, getAllcourse] = useState([]);
  const styles = {
    Asset05: {
      height: "240px",
    },
    bgImg: {
      height: "240px",
      position: "absolute",
      right: "16px",
      bottom: "242px",
    },
    courseCardTag: {
      color: "rgb(255, 255, 255)",
      background: "rgb(253, 179, 6)",
      display: "flex",
      alignItems: "center",
      gap: "4px",
    },
  };

  console.log("allcourse=====", allcourse);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const response = await axios.get(
        "https://api.proleverageadmin.in/api/mycourse/getallcourses"
      );
      if (response.status === 200) {
        getAllcourse(response.data.data);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className="container">
      <div className="row  mt-3">
        <div
          className="poppins-medium"
          style={{
            color: "black",
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          We found{" "}
          <span style={{ color: "rgb(253, 179, 6)" }}>{allcourse.length}</span>{" "}
          courses available for you
        </div>

        {allcourse.map((data, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <Link
              to="/coursesdetail"
              state={{ courseData: data }}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className="courseCard-0-1-330">
                <div
                  className="courseCardTag-0-1-331 poppins-regular"
                  style={styles.courseCardTag}
                >
                  <i className="fa-solid fa-star"></i> Featured Course
                </div>
                <div className="courseCardImage-0-1-334">
                  <img
                    className="courseCardImage-0-1-334"
                    src={`https://api.proleverageadmin.in/course/${data.thumbnailImage}`}
                    alt=""
                  />
                </div>
                <div className="courseCardContent-0-1-335">
                  <div className="courseCardTitle-0-1-336 poppins-semibold">
                    {data.courseName}
                  </div>
                  <div className="courseCreatedBy-0-1-338 poppins-regular">
                    Created by: You(Owner)
                  </div>
                  <div className="courseCardTags-0-1-333 poppins-regular">
                    {data.durationType}
                  </div>
                  <br />
                  <div className="courseCardPriceSection-0-1-337">
                    <div
                      className="poppins-semibold"
                      style={{ color: "rgb(10, 22, 41)", fontWeight: "700" }}
                    >
                      ₹{data.price}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
