import React from "react";
import ReactLoading from "react-loading";
import "../index.css";
import "../styles/Spinner.css"
export default function Spinner() {
  return (
    <div className="loader">
      {/* <ReactLoading type="bubbles" color="#ff3c27" height={150} width={150} /> */}

      {/* <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div> */}
    </div>
  );
}
