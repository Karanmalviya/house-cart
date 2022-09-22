import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { db } from "../firebase.config";

export default function Listing() {
  return <Layout>Listing</Layout>;
}
