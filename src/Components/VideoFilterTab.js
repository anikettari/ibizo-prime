import React, { useState, useEffect } from "react";
import { Button, Col, Row, Form, FormControl } from "react-bootstrap";
import filter from "../Assets/filter.png";

const VideoFilterTab = ({ setorder, setSearchQuery, fetchData }) => {
  const handleDateChange = () => {
    setorder("date");
  };
  const handleRatingChange = () => {
    setorder("rating");
  };
  const [marginLeft, setMarginLeft] = useState("3rem");
  useEffect(() => {
    const handleResize = () => {
      const newMarginLeft = window.innerWidth <= 780 ? "1rem" : "3rem";
      setMarginLeft(newMarginLeft);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Row className="mt-4" style={{ marginLeft }}>
      {marginLeft === "3rem" ? (
        <img
          src={filter}
          alt="filter-img"
          style={{ height: "40px", width: "50px", objectFit: "contain" }}
          className="mt-3"
        />
      ) : (
        <></>
      )}
      <Col lg={3}>
        <Form className="d-flex mt-3">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="outline-dark" size="sm" onClick={fetchData}>
            Search
          </Button>
        </Form>
      </Col>
      <Col lg={4}>
        <Button
          variant="primary "
          onClick={handleDateChange}
          style={{ marginRight: "1rem" }}
          className="mt-3"
        >
          Date
        </Button>
        <Button
          variant="primary "
          onClick={handleRatingChange}
          className="mt-3"
        >
          Rating
        </Button>
      </Col>
      <Col lg={1}></Col>
    </Row>
  );
};

export default VideoFilterTab;
