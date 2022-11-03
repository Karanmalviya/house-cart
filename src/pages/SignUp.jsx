import { useState } from "react";
import Layout from "./../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import "../index.css";
import OAuth from "../components/OAuth";
export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { name, email, password } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // SignUp Authentication
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, { displayName: name });
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("SignUp Success");
      navigate("/");
      // alert("Signup Sucess");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <section className="login-block content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <form
                className="md-float-material form-material"
                onSubmit={onSubmitHandler}>
                <div className="auth-box card">
                  <div className="card-block">
                    <div className="row mb-5">
                      <div className="col-md-12">
                        <h3 className="text-center heading">Sign Up</h3>
                      </div>
                    </div>
                    <div className="form-group form-primary">
                      <input
                        type="text"
                        className="form-control"
                        defaultValue
                        placeholder="Full Name"
                        onChange={onChange}
                        id="name"
                        value={name}
                      />
                    </div>
                    <div className="form-group form-primary">
                      <input
                        type="email"
                        className="form-control"
                        defaultValue
                        placeholder="Email"
                        id="email"
                        value={email}
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-group form-primary">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Password"
                        defaultValue
                        id="password"
                        value={password}
                        onChange={onChange}
                      />
                    </div>
                    {/* <div className="form-group form-primary">
                      <input
                        type="password"
                        className="form-control"
                        // name="password_confirm"
                        placeholder="Repeat password"
                        defaultValue
                        id="password_confirm"
                      />
                    </div> */}
                    <span>
                      <p
                        className="SP_content"
                        style={{ cursor: "pointer", color: "#545454" }}
                        onClick={() => {
                          setShowPassword((prevState) => !prevState);
                        }}>
                        Show Password{" "}
                        {showPassword ? (
                          <BsFillEyeFill />
                        ) : (
                          <BsFillEyeSlashFill />
                        )}
                      </p>
                    </span>
                    <div className="row">
                      <div className="col-md-12">
                        <input
                          type="submit"
                          className="btn w-100 btn-primary btn-md btn-block waves-effect text-center m-b-20"
                          name="submit"
                          defaultValue="Signup Now"
                          value="Sign Up"
                        />
                      </div>
                    </div>
                    <div className="or-container">
                      <div className="line-separator" />{" "}
                      <div className="or-label">or</div>
                      <div className="line-separator" />
                    </div>

                    <div className="row">
                      <OAuth />
                    </div>
                    <br />
                    <p className="text-inverse text-center">
                      Already have an account? <Link to="/signin">Login</Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
