import React, { useState, useEffect } from "react";
import Videoplayer from "../Components/Videoplayer";
import { Row, Col } from "react-bootstrap";
import NavigationBar from "../Components/NavigationBar";
import VideoFilterTab from "../Components/VideoFilterTab";
import Loading from "./Loading";
import { buildYoutubeApiUrl } from "../Utils/Utils";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const Home = () => {
  const [videoData, setVideoData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [order, setorder] = useState("rating");
  const CategoryId = cookies.get("CategoryId");

  const fetchData = async () => {
    setLoader(true);
    const apiUrl = buildYoutubeApiUrl(searchQuery, CategoryId, order);
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setVideoData(data?.items);
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [order]);

  return (
    <div>
      <NavigationBar />
      <VideoFilterTab
        setorder={setorder}
        setSearchQuery={setSearchQuery}
        fetchData={fetchData}
      />
      {loader ? (
        <Loading />
      ) : (
        <Row className="m-5">
          {videoData &&
            videoData.map((item) => (
              <Col key={item.id.videoId} lg={3} md={6} className="mt-3">
                <Videoplayer
                  videoId={item.id.videoId}
                  title={item?.snippet?.title}
                  channelName={item?.snippet?.channelTitle}
                />
              </Col>
            ))}
        </Row>
      )}
    </div>
  );
};

export default Home;
