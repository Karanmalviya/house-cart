import { useState } from "react";
import Layout from "../components/Layout/Layout";
import Slider from "../components/Slider";
import "../index.css";
import "../styles/HomePage.css";

export default function HomePages() {
  const [home, setHome] = useState(true);
  return (
    <Layout home={home}>
      <Slider />
    </Layout>
  );
}
