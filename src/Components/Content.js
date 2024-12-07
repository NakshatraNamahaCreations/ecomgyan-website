import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Content() {
  const { id } = useParams();
  const [alldocumentmodule, setalldocumentmodule] = useState([]);
  const [allvideomodule, setallvideomodule] = useState([]);
  const [allimagesmodule, setallimagesmodule] = useState([]);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);

  const user = localStorage.getItem("user");
  console.log("user", user);

  useEffect(() => {
    getallDocumentModule();
    getallVideoModule();
    getallImageModule();
  }, []);

  const getallDocumentModule = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/document-module/getdocumentbymoduleid/${id}`
      );
      if (response.status === 200) {
        setalldocumentmodule(response.data?.data);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const getallVideoModule = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/video-module/getvideobymoduleid/${id}`
      );
      if (response.status === 200) {
        setallvideomodule(response.data?.data);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const getallImageModule = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/image-module/getimagebymoduleid/${id}`
      );
      if (response.status === 200) {
        setallimagesmodule(response.data?.data);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const handleVideoClick = (index) => {
    setSelectedVideoIndex(index);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="mt-3 mb-3">
          {selectedVideoIndex !== null && (
            <div className="row">
              <div className="col-md-12">
                <div className="mt-3 mb-3">
                  {console.log(
                    "Selected Video:",
                    allvideomodule[selectedVideoIndex]
                  )}
                  <video
                    width="100%"
                    height="400"
                    src={allvideomodule[selectedVideoIndex]?.videoLink}
                    title="Selected Video"
                    autoPlay
                    muted
                    loop
                    // controls
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          )}
          <p className="mt-2">
            Welcome To Amazon FBA Mentorship Program (KEY POINTERS)
          </p>
        </div>
      </div>

      <div className="row mb-3">
        {alldocumentmodule.map((data, index) => (
          <div className="col-md-6" key={index}>
            <div className="row border p-2" style={{ marginRight: "5px" }}>
              <div className="col-md-2">{/* Document SVG */}</div>
              <div
                className="col-md-8"
                style={{ fontSize: "14px", alignItems: "center" }}
              >
                <div className="pb-1">{data.moduleName}</div>
                <a
                  href={`http://localhost:8082/document-module/${data.document}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.document}
                </a>
              </div>
              <div
                className="col-md-2 d-flex justify-content-end"
                style={{ fontSize: "14px", alignItems: "center" }}
              >
                <i
                  className="fa-solid fa-lock"
                  style={{ color: "grey", fontSize: "14px" }}
                ></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row mb-3">
        {allvideomodule.map((video, index) => (
          <div className="col-md-6" key={index}>
            <div
              className="row border p-2 mb-3"
              onClick={() => handleVideoClick(index)}
              style={{ cursor: "pointer", marginRight: "5px" }}
            >
              <div className="col-md-2">
                <video
                  width="80px"
                  height="60px"
                  src={video.videoLink}
                  title={video.name}
                  autoPlay
                  muted
                  loop
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div
                className="col-md-8"
                style={{ fontSize: "14px", alignItems: "center" }}
              >
                <div className="pb-1">{video.moduleName}</div>
                <div className="">{video.name}</div>
              </div>
              <div
                className="col-md-2 d-flex justify-content-end"
                style={{ fontSize: "14px", alignItems: "center" }}
              >
                <i
                  className="fa-solid fa-lock"
                  style={{ color: "grey", fontSize: "14px" }}
                ></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row mb-3">
        {allimagesmodule.map((data, index) => (
          <div className="col-md-6" key={index}>
            <div className="row border p-2" style={{ marginRight: "5px" }}>
              <div className="col-md-2">
                <img
                  src={`http://localhost:8082/image/${data.image}`}
                  alt="loading..."
                  width="80"
                  height="60"
                />
              </div>
              <div
                className="col-md-8"
                style={{ fontSize: "14px", alignItems: "center" }}
              >
                <div className="pb-1">{data.moduleName}</div>
                <div className="">{data.name}</div>
              </div>
              <div
                className="col-md-2 d-flex justify-content-end"
                style={{ fontSize: "14px", alignItems: "center" }}
              >
                <i
                  className="fa-solid fa-lock"
                  style={{ color: "grey", fontSize: "14px" }}
                ></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;
