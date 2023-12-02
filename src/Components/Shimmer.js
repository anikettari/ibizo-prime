import React from "react";
import { Card } from "react-bootstrap";
import "./shimmer.css";

const Shimmer = () => {
  return (
    <Card className="shimmer-card">
      <div className="shimmer-image"></div>
      <Card.Body>
        <div className="shimmer-title"></div>
        <div className="shimmer-description"></div>
      </Card.Body>
    </Card>
  );
};

export default Shimmer;
