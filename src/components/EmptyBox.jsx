import React from "react";
import Box from "../assets/empty-box.gif";
import "../../src/index.css";

export default function EmptyBox() {
  return (
    <div className="d-flex justify-content-center">
    <div className="empty-box">
      <img src={Box} className="emtpy-box-logo" />
      <h2 className="empty-box-text">no offers are available</h2>
    </div>
    </div>
  );
}
