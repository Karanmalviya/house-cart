import React from "react";
import Box from "../assets/empty-box.gif";
import "../../src/index.css";

export default function EmptyBox() {
  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="empty-box">
        <img
          src={Box}
          alt="No items are available"
          className="emtpy-box-logo"
        />
        <h2 className="empty-box-text">No items are available</h2>
      </div>
    </div>
  );
}
