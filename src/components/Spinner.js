import React from 'react'
import ReactLoading from "react-loading";
export default function Spinner() {
  return (
    <div className="d-flex justify-content-center align-middle mt-25">
      <ReactLoading type="bubbles" color="#ff3c27" height={150} width={150} />

      {/* <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div> */}
    </div>
  );
}
