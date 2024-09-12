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
  const [showImportantRequirements, setShowImportantRequirements] =
    useState(false);
  const [showResources, setShowResources] = useState(false);
  const [showModule, setShowModule] = useState(false);

  const toggleImportantRequirements = () => {
    setShowImportantRequirements(!showImportantRequirements);
  };
  const toggleResources = () => {
    setShowResources(!showResources);
  };
  const toggleModulue = () => {
    setShowModule(!showModule);
  };

  useEffect(() => {
    getallCoursesModule();
    getallcontent();
  }, []);

  const getallCoursesModule = async () => {
    try {
      const response = await axios.get(
        `https://api.proleverage.io/api/coursemodule/getmodulesbycourseid/${courseData._id}`
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
        `https://api.proleverage.io/api/mycourse/getcoursebyid/${courseData._id}`
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

  console.log("ImportantResource", ImportantResource);

  const importantRequirements =
    allcontent.externalContent?.filter(
      (item) => item.contentType === "Important Requirement"
    ) || [];

  console.log("courseData", courseData);
  console.log("getallmodule", getallmodule);

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-12">
          {/* Course Header */}
          <div className="row">
            <div className="col-md-8">
              <img
                className="card-img-top"
                src={`https://api.proleverage.io/course/${courseData.thumbnailImage}`}
                alt={courseData.courseName}
                style={{ height: "320px", objectFit: "cover" }}
              />
            </div>
            <div
              className="col-md-4 p-3 shadow"
              style={{ borderRadius: "10px" }}
            >
              <div className="poppins-medium text-center">Course Features</div>
              <div className="d-flex pt-1 mt-3">
                <div className="col-md-8 d-flex">
                  {/* <i
                    className="fa-regular fa-clock"
                    style={{ color: "blue", marginTop: "2px" }}
                  ></i> */}
                  <div className="poppins-regular mx-2">Discount</div>
                </div>
                <div className="col-md-4 text-end poppins-regular">
                  {courseData.discount}
                </div>
              </div>
              <div className="d-flex pt-1 mt-3">
                <div className="col-md-8 d-flex">
                  {/* <i
                    className="fa-regular fa-clock"
                    style={{ color: "blue", marginTop: "2px" }}
                  ></i> */}
                  <div className="poppins-regular mx-2">Duration Type</div>
                </div>
                <div className="col-md-4 text-end poppins-regular">
                  {courseData.durationType}
                </div>
              </div>
              <div className="d-flex pt-1 mt-3">
                <div className="col-md-8 d-flex">
                  {/* <i
                    className="fa-regular fa-clock"
                    style={{ color: "blue", marginTop: "2px" }}
                  ></i> */}
                  <div className="poppins-regular mx-2">Validity</div>
                </div>
                <div className="col-md-4 text-end poppins-regular">
                  {courseData.validity}{" "}
                  <span className="poppins-regular">
                    {courseData.validityPeriod}
                  </span>
                </div>
              </div>

              <div className="d-flex pt-1 mt-3">
                <div className="col-md-8 d-flex">
                  {/* <i
                    className="fa-regular fa-clock"
                    style={{ color: "blue", marginTop: "2px" }}
                  ></i> */}
                  <div className="poppins-regular mx-2">Effective Price</div>
                </div>
                <div className="col-md-4 text-end poppins-regular">
                  {courseData.effectivePrice}{" "}
                </div>
              </div>

              <div
                className="poppins-black text-center mt-3"
                style={{ color: "blue" }}
              >
                Rs.{courseData.price}
              </div>

              <div className="d-flex mt-3" style={{ justifyContent: "center" }}>
                <div className="poppins-regular b-button">Buy Course</div>
              </div>
            </div>
          </div>
          <h4 className="poppins-medium mt-2 pt-2">{courseData.courseName}</h4>

          <div className="poppins-medium mt-2" style={{ color: "blue" }}>
            Course Description
          </div>
          <div className="poppins-regular mt-1">
            {/* {courseData.courseDescription} */}
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum.
          </div>

          <div className="row mt-3">
            <div className="border p-3" style={{ borderRadius: "5px" }}>
              <div className="poppins-medium ">Important Requirements</div>
              <div className="">
                {importantRequirements.map((item) => (
                  <div key={item._id} className="d-flex list-group-item pt-4">
                    <div className="col-md-11">
                      <FontAwesomeIcon
                        icon={item.fileType === "pdf" ? faFilePdf : faImage}
                        className="mr-2"
                        style={{ color: "blue" }}
                      />
                      <a
                        href={`https://api.proleverage.io/resource/${item.documentOrImage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="poppins-regular text-decoration-none mx-2"
                        style={{ color: "black" }}
                      >
                        {item.originalName}
                      </a>
                    </div>
                    <div className="col-md-1">
                      <div
                        className="poppins-regular text-center"
                        style={{
                          backgroundColor: "lightgrey",
                          padding: "5px",
                          borderRadius: "5px",
                        }}
                      >
                        <a
                          href={`https://api.proleverage.io/resource/${item.documentOrImage}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "black", textDecoration: "none" }}
                        >
                          {" "}
                          Preview
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="border p-3" style={{ borderRadius: "5px" }}>
              <div className="poppins-medium ">Resource</div>

              <div className="">
                {ImportantResource.map((item) => (
                  <div key={item._id} className="d-flex list-group-item pt-4">
                    <div className="col-md-11">
                      <FontAwesomeIcon
                        icon={item.fileType === "pdf" ? faFilePdf : faImage}
                        className="mr-2"
                        style={{ color: "blue" }}
                      />
                      <a
                        href={`https://api.proleverage.io/resource/${item.documentOrImage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="poppins-regular text-decoration-none mx-2"
                        style={{ color: "black" }}
                      >
                        {item.originalName}
                      </a>
                    </div>
                    <div className="col-md-1">
                      <div
                        className="poppins-regular text-center"
                        style={{
                          backgroundColor: "lightgrey",
                          padding: "5px",
                          borderRadius: "5px",
                        }}
                      >
                        <a
                          href={`https://api.proleverage.io/resource/${item.documentOrImage}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "black", textDecoration: "none" }}
                        >
                          Preview
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="row mt-3 mb-4">
            <div className="border p-3" style={{ borderRadius: "5px" }}>
              <div className="poppins-medium ">Modules</div>

              <div className="">
                {getallmodule.map((data) => (
                  <div key={data._id} className="d-flex list-group-item pt-4">
                    <div className="col-md-11">
                      <Link
                        to={`/content/${data._id}`}
                        key={data._id}
                        className="text-decoration-none"
                      >
                        <div
                          className="poppins-regular"
                          style={{ color: "black" }}
                        >
                          {data.moduleTitle}
                        </div>
                      </Link>
                    </div>
                    <div
                      className="col-md-1 d-flex"
                      style={{ justifyContent: "end" }}
                    >
                      <Link
                        to={`/content/${data._id}`}
                        key={data._id}
                        className="text-decoration-none"
                      >
                        <FontAwesomeIcon
                          style={{ color: "black" }}
                          icon={faArrowRight}
                        />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Coursesdetails;
