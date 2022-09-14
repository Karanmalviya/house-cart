import Layout from "../components/Layout/Layout";
import "../index.css";
import { useNavigate } from "react-router-dom";
export default function HomePages() {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="container mt-3">
        <div className="row">
          <h1>Category</h1>
          <div className="col-md-5">
            <div className="Imagecontainer">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt="rent"
                style={{ width: "100%" }}
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
                src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt="rent"
                style={{ width: "100%" }}
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
