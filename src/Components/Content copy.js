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

  const getYouTubeID = (youtubeLink) => {
    console.log("YouTube Link:", youtubeLink); // Log the link to debug
    if (!youtubeLink) return "";

    const idRegex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
    const match = youtubeLink.match(idRegex);

    if (match && match[1]) {
      console.log("YouTube ID:", match[1]); // Log the ID to debug
      return match[1];
    } else {
      console.warn("Invalid YouTube URL or couldn't extract ID");
      return "";
    }
  };

  // Debug the extracted video ID
  console.log(
    "YouTube Video ID:",
    getYouTubeID(allvideomodule[selectedVideoIndex]?.youtubeLink)
  );

  useEffect(() => {
    getallDocumentModule();
  }, []);

  const getallDocumentModule = async () => {
    try {
      const response = await axios.get(
        `https://api.proleverageadmin.in/api/document-module/getdocumentbymoduleid/${id}`
      );
      if (response.status === 200) {
        setalldocumentmodule(response.data?.data);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getallVideoModule();
  }, []);

  const getallVideoModule = async () => {
    try {
      const response = await axios.get(
        `https://api.proleverageadmin.in/api/video-module/getvideobymoduleid/${id}`
      );
      if (response.status === 200) {
        setallvideomodule(response.data?.data);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getallImageModule();
  }, []);

  const getallImageModule = async () => {
    try {
      const response = await axios.get(
        `https://api.proleverageadmin.in/api/image-module/getimagebymoduleid/${id}`
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

  console.log("allvideomodule", allvideomodule);

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
                  <iframe
                    width="100%"
                    height="400"
                    src={`https://www.youtube.com/embed/${getYouTubeID(
                      allvideomodule[selectedVideoIndex]?.videoLink
                    )}`}
                    title="Selected YouTube Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  ></iframe>
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
                  href={`https://api.proleverageadmin.in/document-module/${data.document}`}
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
                <iframe
                  width="80px"
                  height="60px"
                  src={`https://www.youtube.com/embed/${getYouTubeID(
                    video.videoLink
                  )}`}
                  title={video.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
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
                  src={`https://api.proleverageadmin.in/image/${data.image}`}
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
