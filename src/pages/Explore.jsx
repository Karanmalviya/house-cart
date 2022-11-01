import React from 'react'
import Layout from "../components/Layout/Layout";
import "../index.css";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";
import "../styles/Explore.css";

export default function Explore() {
     const navigate = useNavigate();
  return (
    <Layout>
      <div className="container mt-25 ">
        {/* <h1 className="d-flex justify-content-center">Category</h1> */}
        <div className="row d-flex justify-content-between">
          <div className="col-md-5">
            <div className="Imagecontainer">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt="rent"
                style={{ width: "40rem", height: "100%" }}
              />
              <button
                className="btn"
                onClick={() => navigate("/category/rent")}>
                To RENT
              </button>
            </div>
          </div>
          <div className="col-md-5">
            <div className="Imagecontainer">
              <img
                src="https://media.istockphoto.com/photos/large-house-with-steep-roof-and-side-entry-three-car-garage-picture-id1272163106?b=1&k=20&m=1272163106&s=170667a&w=0&h=pTjbBRKTcnhs-oIGpuSB4TyAE5768gp0BefDXxyUNTU="
                alt="rent"
                style={{ width: "40rem", height: "100%" }}
              />
              <button
                className="btn"
                onClick={() => navigate("/category/sale")}>
                To SALE
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
