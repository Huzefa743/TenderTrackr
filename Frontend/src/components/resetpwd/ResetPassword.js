import React, { useState } from "react";
import { Formik } from "formik";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import * as API from "../../apiservice/Apiservice";
import Logo from "../../logos/Resetpwd.svg";
import { Breadcrumb } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import "./Resetpwd.css";

function ResetPassword() {
  const navigate = useNavigate();

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = (evt, key) => {
    setPasswordShown(passwordShown ? false : true);
  };

  const [newpasswordShown, setNewPasswordShown] = useState(false);
  const toggleNewPasswordVisiblity = (evt, key) => {
    setNewPasswordShown(newpasswordShown ? false : true);
  };

  const [confirmpasswordShown, setConfrmPasswordShown] = useState(false);
  const toggleConfirmPasswordVisiblity = (evt, key) => {
    setConfrmPasswordShown(confirmpasswordShown ? false : true);
  };

  return (
    <div>
      <Formik
        initialValues={{
          password: "",
          newpassword: "",
          confirmpassword: "",
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          API.ResetPassword(values.password, values.newpassword)
            .then((res) => {
              console.log(res.data);
              alert("Password Successfully Reset!");
              navigate("/home");
              setSubmitting(false);
              resetForm();
            })
            .catch((err) => {
              alert("Oops! Unable to reset password");
              setSubmitting(false);
            });
        }}

        validate={(values) => {
          let errors = {};

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

          if (!values.newpassword) {
            errors.newpassword = "Required *";
          } else if (values.newpassword.length < 6) {
            errors.newpassword = "Password must be 6 characters long *";
          } else if (values.newpassword.length > 50) {
            errors.newpassword =
              "Password must be less than 50 characters long *";
          } else if (!passwordRegex.test(values.newpassword)) {
            errors.newpassword =
              "Invalid password. Must contain one Number, Uppercase, Lowercase and Special character *";
          }

          if (!values.confirmpassword) {
            errors.confirmpassword = "Required *";
          } else if (values.confirmpassword.length < 6) {
            errors.confirmpassword = "Password must be 6 characters long *";
          } else if (values.password.length > 50) {
            errors.confirmpassword =
              "Password must be less than 50 characters long *";
          } else if (!passwordRegex.test(values.confirmpassword)) {
            errors.confirmpassword =
              "Invalid password. Must contain one Number, Uppercase, Lowercase and Special character *";
          } else if (values.confirmpassword && values.newpassword) {
            if (values.confirmpassword !== values.newpassword) {
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
          <div>
            <div>
              <img className="login-logo-image" src={Logo} alt="logo" />
            </div>
            <div className="reset-card">
              <div className="mt-3 text-primary fw-bold">
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <Link to="/home">Home</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>Reset Password</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div className="card-body">
                <h4 className="card-title mt-4">Reset your Password</h4>
                <form className="mt-4" onSubmit={handleSubmit}>
                  <div className="mb-2">
                    <div className="input-group col-md-12 mb-1">
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

                  <div className="mb-2">
                    <div className="input-group col-md-12 mb-1">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text icon-box"
                          id="basic-addon1"
                        >
                          <i className="bi bi-lock-fill"></i>
                        </span>
                      </div>
                      <input
                        type={newpasswordShown ? "text" : "password"}
                        name="newpassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="New Password"
                        value={values.newpassword}
                        className="form-control"
                      />
                      <span className="input-group-text eye-box">
                        {newpasswordShown ? (
                          <i
                            className="bi bi-eye-fill"
                            onClick={toggleNewPasswordVisiblity}
                          ></i>
                        ) : (
                          <i
                            className="bi bi-eye-slash-fill"
                            onClick={toggleNewPasswordVisiblity}
                          ></i>
                        )}
                      </span>
                    </div>
                    {errors.newpassword &&
                    touched.newpassword &&
                    errors.newpassword ? (
                      <Alert severity="warning" className="input-feedback">
                        {errors.newpassword &&
                          touched.newpassword &&
                          errors.newpassword}
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
                    {errors.confirmpassword &&
                    touched.confirmpassword &&
                    errors.confirmpassword ? (
                      <Alert severity="warning" className="input-feedback">
                        {errors.confirmpassword &&
                          touched.confirmpassword &&
                          errors.confirmpassword}
                      </Alert>
                    ) : (
                      ""
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary mt-1 col-md-12 mt-3"
                    disabled={isSubmitting}
                  >
                    Reset Password
                  </button>
                  <br />
                </form>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default ResetPassword;
