import Layout from "../components/Layout/Layout";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
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
  const logoutHandler = () => {
    auth.signOut();
    toast.success("Successfully Logout");
    navigate("/");
  };

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
    setFormData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
  };
  return (
    <Layout>
      <div className="container w-50 d-flex justify-content-between">
        <h4>Profile Details</h4>
        <button className="btn btn-danger" onClick={logoutHandler}>
          Logout
        </button>
      </div>
      <div className="card container mt-4" style={{ width: "18rem" }}>
        <div className="card-header">
          <div className="d-flex justify-content-between">
            <p>User Personal Details</p>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                changeDetails && onSubmit();
                setChangeDetails((prevState) => !prevState);
              }}>
              {changeDetails ? <AiFillCheckCircle color="green" /> : <FaEdit />}
            </span>
          </div>
        </div>
        <div className="card-body">
          <form>
            <div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={onChange}
                  disabled={!changeDetails}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={onChange}
                  disabled={!changeDetails}
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* ==================================== */}
      {/* <section className="login-block">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <form className="md-float-material form-material">
                <div className="auth-box card">
                  <div className="card-block">
                    <div className="row mb-5">
                      <div className="col-md-12">
                        <h3 className="text-center heading">Profile</h3>
                      </div>
                    </div>
                    <div className="form-group form-primary">
                      <input
                        type="text"
                        className="form-control"
                        defaultValue
                        placeholder="Your Name"
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
                        // onChange={onChange}
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <input
                          type="submit"
                          className="btn w-100 btn-primary btn-md btn-block waves-effect text-center m-b-20"
                          name="submit"
                          defaultValue="Signup Now"
                        />
                      </div>
                    </div>
                   
    
                   
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section> */}
    </Layout>
  );
}
