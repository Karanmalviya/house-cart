import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Layout from "./../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  //loginHandler
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        toast.success("Login Success");
        navigate("/");
      }
    } catch (error) {
      toast.error("Invalid Email Or Password");
    }
  };
  return (
    <Layout>
      {/* <div className="d-flex align-item-center justify-content-center w-100 mt-5">
        <form className="w-25" onSubmit={loginHandler}>
          <h4 className=" p-2 mt-2 text-center mb-4 ">Sign In</h4>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              value={password}
              onChange={onChange}
            />
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                setShowPassword((prevState) => !prevState);
              }}>
              Show Password{" "}
              {showPassword ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
            </span>
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <div className="mt-2">
            <span>New User </span>
            <Link to="/signup">Create Account</Link>
          </div> */}

      <section className="login-block">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <form
                className="md-float-material form-material"
                onSubmit={loginHandler}>
                <div className="auth-box card">
                  <div className="card-block">
                    <div className="row mb-5">
                      <div className="col-md-12">
                        <h3 className="text-center heading">Sign In</h3>
                      </div>
                    </div>

                    <div className="form-group form-primary">
                      <input
                        type="email"
                        className="form-control"
                        
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
                      
                        id="password"
                        value={password}
                        onChange={onChange}
                      />
                    </div>
                    <div className="d-flex className SP_content justify-content-between">
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

                      <div>
                        <Link to="/forgetpassword">Forget Password</Link>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <input
                          type="submit"
                          className="btn w-100 btn-primary btn-md btn-block waves-effect text-center m-b-20"
                          name="submit"
                          
                          value="Sign In"
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
                      Create a new account <Link to="/signup">SignIn</Link>
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
