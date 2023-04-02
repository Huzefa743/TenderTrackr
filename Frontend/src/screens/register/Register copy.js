import React, { useState, useContext } from "react";
import { Formik } from "formik";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import "./Register.css";
import * as API from '../../apiservice/Apiservice';
import Alert from "@mui/material/Alert";
import { Authcontext, Successcontext, SuccessExistcontext } from "../context/Authcontext";
import RegisterLogo from '../../logos/Register.svg'

const Register = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  const [successmsgexist, setSuccessmsgExist] = useContext(SuccessExistcontext);
  const [successmsg, setSuccessmsg] = useContext(Successcontext);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = (evt, key) => {
    setPasswordShown(passwordShown ? false : true);
  };

  const [confirmpasswordShown, setConfrmPasswordShown] = useState(false);
  const toggleConfirmPasswordVisiblity = (evt, key) => {
    setConfrmPasswordShown(confirmpasswordShown ? false : true);
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmpassword: "",
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          API.registerUser(values.name, values.password, values.email)
            .then((res) => {
              if (res.status === 200) {
                console.log(res);
                setTimeout(() => {
                  console.log("Registering", values);
                  setSuccessmsgExist(true);
                  setSuccessmsg(res.data.message);
                  navigate("/login");
                  setTimeout(() => {
                    setSuccessmsgExist(false);
                  }, 5000);
                  setSubmitting(false);
                });
              }
              else {
                setAlert(true);
                setSubmitting(false);
                resetForm();
              }
            })
            .catch((err) => {
              console.log(err.response.data.message);
              // navigate("/errorpage");
            });
        }}
        validate={(values) => {
          let errors = {};

          const NameRegex = /^(?!\s)[a-zA-Z\s]+$/;
          if (!values.name) {
            errors.name = "Required *";
          }
          else if (!NameRegex.test(values.name)) {
            errors.name = "Name cannot have numbers or special characters*";
          }
          else if (values.name.length > 20) {
            errors.name = "Very long name *";
          }

          const EmailRegex = /^(.+)@thbs.com/;
          if (!values.email) {
            errors.email = "Required *";
          }
          else if (!EmailRegex.test(values.email)) {
            errors.email = "Not a valid THBS e-mail *";
          }
          else if (values.email.length < 10) {
            errors.email = "Min 10 characters required *";
          }
          else if (values.email.length > 40) {
            errors.email = "Min 40 characters required *";
          }

          const passwordRegex = /^(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})(?=(?:.*[0-9]){1})(?=.*[!@#$*]).*$/;
          if (!values.password) {
            errors.password = "Required *";
          } else if (values.password.length < 6) {
            errors.password = "Min 6 characters required *";
          }
          else if (values.password.length > 50) {
            errors.password = "Max 50 characters accepted *";
          }
          else if (!passwordRegex.test(values.password)) {
            errors.password = "Invalid password. Must contain one Number, Uppercase, Lowercase and Special character *";
          }

          if (!values.confirmpassword) {
            errors.confirmpassword = "Required *";
          } else if (values.confirmpassword.length < 6) {
            errors.confirmpassword = "Min 6 characters required *";
          }
          else if (values.password.length > 50) {
            errors.confirmpassword = "Max 50 characters accepted *";
          }
          else if (!passwordRegex.test(values.confirmpassword)) {
            errors.confirmpassword =
              "Invalid password. Must contain one Number, Uppercase, Lowercase and Special character *";
          } else if (values.confirmpassword && values.password) {
            if (values.confirmpassword !== values.password) {
              errors.confirmpassword = "Passwords do not match *";
            }
          }
          return errors;
        }}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="register-bgcolor">
            <div className="register-logo-image">
              <img className="card-img-top" src={RegisterLogo} alt="Card image cap" />
            </div>
            <div className="card register-card">
            {/* <div>
              <img src={''} alt="logo" />
            </div> */}
              <div className="card-body">
                <h3 className="card-title fw-bold">Mimicker Tool</h3>
                <h5 className="card-title mt-3">Register to continue</h5>
                {alert === true ? (
                  <Alert variant="filled" severity="error">Failed to register. Email already exists! Enter a new E-mail</Alert>
                ) : (
                  ""
                )}
                <form onSubmit={handleSubmit}>
                  <div className="mb-2">
                    <div className="input-group col-md-12 mb-1">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text icon-box"
                          id="basic-addon1"
                        >
                          <i className="bi bi-person-square"></i>
                        </span>
                      </div>
                      <input
                        type="name"
                        name="name"
                        autoComplete="off"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        placeholder="Full Name"
                        className="form-control"
                      />
                    </div>
                    {errors.name && touched.name && errors.name ? (
                      <Alert sx={{ height: '50%' }} severity="warning" className="input-feedback">
                        {errors.name && touched.name && errors.name}
                      </Alert>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="mb-2">
                    <div className="input-group col-md-12 mb-1">
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
                      />
                    </div>
                    {errors.email && touched.email && errors.email ? (
                      <Alert severity="warning" className="input-feedback">
                        {errors.email && touched.email && errors.email}
                      </Alert>
                    ) : (
                      ""
                    )}
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
                        type={confirmpasswordShown ? "text" : "password"}
                        name="confirmpassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Confirm Password"
                        value={values.confirmpassword}
                        className="form-control"
                        required
                      />
                      <span className="input-group-text eye-box">
                        {confirmpasswordShown ? (
                          <i
                            className="bi bi-eye-fill"
                            onClick={toggleConfirmPasswordVisiblity}
                          ></i>
                        ) : (
                          <i
                            className="bi bi-eye-slash-fill"
                            onClick={toggleConfirmPasswordVisiblity}
                          ></i>
                        )}
                      </span>
                    </div>
                    {errors.confirmpassword && touched.confirmpassword && errors.confirmpassword ? (
                      <Alert severity="warning" className="input-feedback">
                        {errors.confirmpassword && touched.confirmpassword && errors.confirmpassword}
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
                    Register
                  </button>
                  <br />
                  <Link to="/login">
                    <button
                      type="button"
                      className="btn btn-outline-primary my-3 col-md-12"
                    >
                      Already registered? Click to login
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

export default Register;
