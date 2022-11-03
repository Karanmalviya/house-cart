import Layout from "./../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const forgetPasswordHandler = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
      navigate("/signin");
    } catch (error) {
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
                onSubmit={forgetPasswordHandler}>
                <div className="auth-box card">
                  <div className="card-block">
                    <div className="row mb-5">
                      <div className="col-md-12">
                        <h3 className="text-center heading">
                          Reset Your Password
                        </h3>
                      </div>
                    </div>

                    <div className="form-group form-primary">
                      <input
                        type="email"
                        className="form-control"
                        defaultValue
                        placeholder="Email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-12 mt-3">
                        <input
                          type="submit"
                          className="btn w-100 btn-primary btn-md btn-block waves-effect text-center m-b-20"
                          name="submit"
                          placeholder="Reset"
                          defaultValue="Signup Now"
                          value="Reset"
                        />
                      </div>
                    </div>
                    <div className="d-flex className SP_content justify-content-between">
                      <div>
                        <Link to="/signin">Remeber Your Password?</Link>
                      </div>
                    </div>
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
