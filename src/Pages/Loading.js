import React from "react";
import Shimmer from "../Components/Shimmer";
import { Row, Col } from "react-bootstrap";

const Loading = () => {
  return (
    <div>
      <div>
        <Row className="m-5">
          <Col lg={3} md={6} className="mt-4">
            <Shimmer />
          </Col>
          <Col lg={3} md={6} className="mt-4">
            <Shimmer />
          </Col>
          <Col lg={3} md={6} className="mt-4">
            <Shimmer />
          </Col>
          <Col lg={3} md={6} className="mt-4">
            <Shimmer />
          </Col>
          <Col lg={3} md={6} className="mt-4">
            <Shimmer />
          </Col>
          <Col lg={3} md={6} className="mt-4">
            <Shimmer />
          </Col>
          <Col lg={3} md={6} className="mt-4">
            <Shimmer />
          </Col>
          <Col lg={3} md={6} className="mt-4">
            <Shimmer />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Loading;
