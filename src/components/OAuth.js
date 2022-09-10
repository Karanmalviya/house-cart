import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
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

  return (
    <div className="col-md-12 " onClick={onGoolgleAuthHandler}>
      <a
        className="btn w-100 btn-lg btn-google btn-block text-uppercase btn-outline"
        href="#">
        <img src="https://img.icons8.com/color/16/000000/google-logo.png" />{" "}
        Sign {location.pathname === "/signup" ? "Up" : "In"} Using Google
      </a>
    </div>
  );
}
