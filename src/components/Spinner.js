import React from "react";
import ReactLoading from "react-loading";
import "../index.css";
import "../styles/Spinner.css";
export default function Spinner() {
  return (
    <div className="spinner">
      <ReactLoading type="bubbles" color="#1f5156" height={100} width={100} />
    </div>
  );
}
