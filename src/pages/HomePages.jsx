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
                src="https://media.istockphoto.com/photos/large-house-with-steep-roof-and-side-entry-three-car-garage-picture-id1272163106?b=1&k=20&m=1272163106&s=170667a&w=0&h=pTjbBRKTcnhs-oIGpuSB4TyAE5768gp0BefDXxyUNTU="
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
