import React, { useContext, useState, useEffect } from "react";
import "./Login.css";
import { Formik } from "formik";
import { Spinner } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import * as API from "../../apiservice/Apiservice";
import Alert from "@mui/material/Alert";
import {
  Authcontext,
  Successcontext,
  SuccessExistcontext,
  UserIdContext,
} from "../../components/context/Authcontext";
import Loginlogo from "../../logos/Login.svg";

const Login = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);

  const [successmsg, setSuccessmsg] = useContext(Successcontext);
  const [successmsgexist, setSuccessmsgExist] = useContext(SuccessExistcontext);
  const [userid, setUserId] = useContext(UserIdContext);

  const [validated, setValidated] = useState(false);

  // Spinner
  const [spinner, setSpinner] = useState(true);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          API.loginUser(values.email, values.password)
            .then((res) => {
              window.localStorage.clear();
              console.log(res);
              localStorage.setItem("accesstoken", res.data.token);
              localStorage.setItem("username", res.data.userName);
              localStorage.setItem("auth", true);
              setSpinner(false);
              setUserId(res.data.userId);
              console.log("Logging in", values);
              navigate("/home");
              setSubmitting(false);
            })
            .catch((err) => {
              setAlert(true);
              setSubmitting(false);
              setTimeout(() => {
                setAlert(false);
              }, 4000);
              resetForm();
              console.log(err.response.data.message);
              // navigate("/errorpage");
            });
        }}
        validate={(values) => {
          let errors = {};
          const EmailRegex = /^(.+)@thbs.com/;
          if (!values.email) {
            errors.email = "Required *";
          } else if (!EmailRegex.test(values.email)) {
            errors.email = "Not a valid THBS e-mail *";
          } else if (values.email.length < 10) {
            errors.email = "Min 10 characters required *";
          } else if (values.email.length > 40) {
            errors.email = "Min 40 characters required *";
          }

          const passwordRegex =
            /^(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})(?=(?:.*[0-9]){1})(?=.*[!@#$*]).*$/;
          if (!values.password) {
            errors.password = "Required *";
          } else if (values.password.length < 6) {
            errors.password = "Password must be 6 characters long *";
          } else if (values.password.length > 50) {
            errors.password = "Password must be less than 50 characters long *";
          } else if (!passwordRegex.test(values.password)) {
            errors.password =
              "Invalid password. Must contain one Number, Uppercase, Lowercase and Special character *";
          }
          return errors;
        }}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          isInvalid,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div>
            <div>
              <img className="login-logo-image" src={Loginlogo} alt="logo" />
            </div>
            <div className="login-card">
              {/* <div>
              <img src={Loginlogo} alt="logo" />
            </div> */}
              <div className="card-body">
                <h3 className="card-title fw-bold">Mimicker</h3>
                <h5 className="card-title mt-4">Login to continue</h5>
                {alert === true ? (
                  <Alert variant="filled" severity="error">
                    Invalid Credentials
                  </Alert>
                ) : null}
                {successmsgexist === true ? (
                  <Alert variant="filled" severity="success">
                    {successmsg}
                  </Alert>
                ) : null}
                <form className="mt-4" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <div className="input-group col-md-12 mb-1 has-validation">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text icon-box"
                          id="basic-addon1"
                        >
                          <i className="bi bi-envelope-open-fill"></i>
                        </span>
                      </div>
                      <input
                        type="email"
                        name="email"
                        autoComplete="off"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        placeholder="E-mail"
                        className="form-control"
                        required
                      />
                    </div>
                    {errors.email && touched.email && errors.email ? (
                      <Alert severity="warning" className="input-feedback">
                        {errors.email && touched.email && errors.email}
                      </Alert>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <div className="input-group col-md-12 mb-1 has-validation">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text icon-box"
                          id="basic-addon1"
                        >
                          <i className="bi bi-lock-fill"></i>
                        </span>
                      </div>
                      <input
                        type={passwordShown ? "text" : "password"}
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Password"
                        value={values.password}
                        className="form-control"
                        required
                      />
                      <span className="input-group-text eye-box">
                        {passwordShown ? (
                          <i
                            className="bi bi-eye-fill"
                            onClick={togglePasswordVisiblity}
                          ></i>
                        ) : (
                          <i
                            className="bi bi-eye-slash-fill"
                            onClick={togglePasswordVisiblity}
                          ></i>
                        )}
                      </span>
                    </div>
                    {errors.password && touched.password && errors.password ? (
                      <Alert severity="warning" className="input-feedback">
                        {errors.password && touched.password && errors.password}
                      </Alert>
                    ) : (
                      ""
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary my-3 col-md-12"
                    disabled={isSubmitting}
                  >
                    Login
                  </button>
                  <br />
                  {/* <div className="unable">
                    <Link to="#">
                      <strong>Unable to login?</strong>
                    </Link>
                  </div> */}
                  <Link to="/register">
                    <button
                      type="button"
                      className="btn btn-outline-primary my-3 col-md-12"
                    >
                      Register for Mimicker
                    </button>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Login;
