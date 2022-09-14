import Layout from "../components/Layout/Layout";
import { getAuth, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaArrowCircleRight, FaEdit } from "react-icons/fa";
import { db } from "../firebase.config";
import { AiFillCheckCircle } from "react-icons/ai";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

export default function Profile() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  //logout handler
  // const logoutHandler = () => {
  //   auth.signOut();
  //   toast.success("Successfully Logout");
  //   navigate("/");
  // };

  //Submit Handler
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, { displayName: name });

        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, { name });
        toast.success("user updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Onchange Handler
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  //showButton
  return (
    <Layout>
      <div className="container w-50 d-flex justify-content-between">
        <h4>Profile Details</h4>
        {/* <button className="btn btn-danger" onClick={logoutHandler}>
          Logout
        </button> */}
      </div>

      {/* ==================================== */}
      <section className="login-block">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <form className="md-float-material form-material">
                <div className="auth-box card">
                  <div className="card-block">
                    <div className="row mb-5">
                      <div className="col-md-12 d-flex justify-content-between">
                        <h3 className="text-center heading">
                          User Personal Details
                        </h3>
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            changeDetails && onSubmit();
                            setChangeDetails((prevState) => !prevState);
                          }}>
                          {changeDetails ? (
                            <AiFillCheckCircle color="green" />
                          ) : (
                            <FaEdit />
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="form-group form-primary">
                      <input
                        type="text"
                        className="form-control"
                        defaultValue
                        placeholder="Your Name"
                        id="name"
                        value={name}
                        onChange={onChange}
                        disabled={!changeDetails}
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
                        disabled={!changeDetails}
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <input
                          type="submit"
                          className="btn w-100 btn-primary btn-md btn-block waves-effect text-center m-b-20"
                          name="submit"
                          defaultValue="Signup Now"
                          hidden={changeDetails ? false : true}
                          onClick={onSubmit}
                        />
                      </div>
                    </div>
                    {/* <div className="row">
                      <div className="col-md-12">
                        <input
                          type="button"
                          className="btn w-100 btn-danger btn-md btn-block waves-effect text-center m-b-20"
                          name="submit"
                          defaultValue="Signup Now"
                          onClick={logoutHandler}
                          value="LogOut"
                        />
                      </div>
                    </div> */}
                  </div>
                </div>
              </form>
              <Link to="/create-listing">
                <FaArrowCircleRight color="primary"/>
                Sell or Rent Your Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
