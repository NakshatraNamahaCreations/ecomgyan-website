import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faImage,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

function Coursesdetails() {
  const location = useLocation();
  const { courseData } = location.state || {};
  const [getallmodule, setgetallmodule] = useState([]);
  const [allcontent, setallcontent] = useState([]);

  useEffect(() => {
    getallCoursesModule();
    getallcontent();
  }, []);

  const getallCoursesModule = async () => {
    try {
      const response = await axios.get(
        `https://api.proleverageadmin.in/api/coursemodule/getmodulesbycourseid/${courseData._id}`
      );
      if (response.status === 200) {
        setgetallmodule(response.data.data);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const getallcontent = async () => {
    try {
      const response = await axios.get(
        `https://api.proleverageadmin.in/api/mycourse/getcoursebyid/${courseData._id}`
      );
      if (response.status === 200) {
        setallcontent(response.data.data);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const ImportantResource =
    allcontent.externalContent?.filter(
      (item) => item.contentType === "Resource"
    ) || [];

  const importantRequirements =
    allcontent.externalContent?.filter(
      (item) => item.contentType === "Important Requirement"
    ) || [];

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-12">
          {/* Course Header */}
          <div className="card mb-4 shadow-sm">
            <img
              className="card-img-top"
              src={`https://api.proleverageadmin.in/course/${courseData.thumbnailImage}`}
              alt={courseData.courseName}
              style={{ height: "300px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h4 className="poppins-medium">{courseData.courseName}</h4>
              <div className="poppins-regular" style={{ color: "#ff7000" }}>
                About this Course
              </div>
              <div
                className="card-text poppins-regular"
                style={{ color: "grey" }}
              >
                {courseData.courseDescription}
              </div>
              <div
                className="d-flex poppins-regular  justify-content-between"
                style={{ color: "grey" }}
              >
                {courseData.durationType}
                {courseData.validity} {courseData.validityPeriod}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              {/* Important Requirements */}
              <div className="card mb-4 shadow-sm">
                <div className="card-header poppins-medium bg-primary text-white">
                  Important Requirements
                </div>
                <ul className="list-group list-group-flush">
                  {importantRequirements.map((item) => (
                    <li key={item._id} className="list-group-item">
                      <FontAwesomeIcon
                        icon={item.fileType === "pdf" ? faFilePdf : faImage}
                        className="mr-2"
                      />
                      <a
                        href={`https://api.proleverageadmin.in/resource/${item.documentOrImage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="poppins-regular text-decoration-none mx-2"
                        style={{ color: "black" }}
                      >
                        {item.originalName}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              {/* Resources */}
              <div className="card mb-4 shadow-sm">
                <div className="card-header poppins-medium bg-secondary text-white">
                  Resources
                </div>
                <ul className="list-group list-group-flush">
                  {ImportantResource.map((item) => (
                    <li key={item._id} className="list-group-item">
                      <FontAwesomeIcon
                        icon={item.fileType === "pdf" ? faFilePdf : faImage}
                        className="mr-2"
                      />
                      <a
                        href={`https://api.proleverageadmin.in/resource/${item.documentOrImage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="poppins-regular text-decoration-none mx-2"
                        style={{ color: "black" }}
                      >
                        {item.originalName}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              {/* Modules */}
              <div className="card mb-4 shadow-sm">
                <div className="card-header poppins-medium bg-info text-white">
                  Modules
                </div>
                <ul className="list-group list-group-flush">
                  {getallmodule.map((data) => (
                    <Link
                      to={`/content/${data._id}`}
                      key={data._id}
                      className="text-decoration-none"
                    >
                      <li className="poppins-regular list-group-item d-flex justify-content-between align-items-center">
                        {data.moduleTitle}
                        <FontAwesomeIcon icon={faArrowRight} />
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              {/* Pricing Details */}
              <div className="card mb-4 shadow-sm">
                <div className="poppins-medium card-header bg-success text-white">
                  Pricing Details
                </div>
                <div className="card-body d-flex justify-content-between">
                  <span className="poppins-regular">You Pay</span>
                  <span className="poppins-bold">₹{courseData.price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Coursesdetails;
