import Layout from "../components/Layout/Layout";
import "../index.css";
import { useNavigate } from "react-router-dom";
import Slider from "../components/Slider2";
import "../styles/HomePage.css";

export default function HomePages() {
  const navigate = useNavigate();
  return (
    <Layout>
      <Slider />
    </Layout>
  );
}
