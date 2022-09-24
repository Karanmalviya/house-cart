import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

export default function OAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const onGoolgleAuthHandler = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("Problem With Google Auth ");
    }
  };
  const onFaceBookAuthAuthHandler = async () => {
    try {
      const auth = getAuth();
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("Problem With Google Auth ");
    }
  };
  return (
    <div className="d-flex justify-content-center ">
      <div className="btn-content">
        <div className="btn-google" onClick={onGoolgleAuthHandler}>
          <a className="btn btn-block text-uppercase btn-outline" href="#">
            <img
              src="https://cdn-icons-png.flaticon.com/128/2504/2504739.png"
              className="g-image"
            />{" "}
            {/* Sign {location.pathname === "/signup" ? "Up" : "In"} Using Google */}
          </a>
        </div>
      </div>
      <div className="btn-content">
        <div className="btn-google " onClick={onFaceBookAuthAuthHandler}>
          <a className="btn btn-block btn-outline" href="#">
            <img
              src="https://cdn-icons-png.flaticon.com/128/174/174848.png"
              className="fb-image"
            />{" "}
            {/* Sign {location.pathname === "/signup" ? "Up" : "In"} Using Facebook */}
          </a>
        </div>
      </div>
    </div>
  );
}
