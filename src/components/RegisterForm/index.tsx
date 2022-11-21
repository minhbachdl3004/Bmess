import React, { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import Input from "../Input";
import "./styles.scss";

const RegisterForm = () => {
  const [hiddenPassword, setHiddenPassword] = useState<Boolean>(false);
  const [hiddenConfirmPassword, setHiddenConfirmPassword] = useState<Boolean>(false);
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password"
  );
  const [confirmPasswordType, setConfirmPasswordType] = useState<"text" | "password">(
    "password"
  );

  const handleClickShowPassword = () => {
    setHiddenPassword(!hiddenPassword);
    setPasswordType(hiddenPassword ? "password" : "text");
  };
  const handleClickShowConfirmPassword = () => {
    setHiddenConfirmPassword(!hiddenConfirmPassword);
    setConfirmPasswordType(hiddenConfirmPassword ? "password" : "text");
  };
  const handleSubmit = () => {};
  return (
    <div className="register__form">
      <h1 className="title">Sign up</h1>
      <form onSubmit={handleSubmit}>
        <div className="register__form-email">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
        </div>
        <div className="register__form-username">
          <label>Username</label>
          <input type="text" placeholder="Enter your username" />
        </div>
        <div className="register__form-password">
          <label>Password</label>
          <Input
            type={passwordType}
            placeHolder="Enter your Password"
            isPassword={true}
            handleClickShowPassword={handleClickShowPassword}
            hiddenPassword={hiddenPassword}
          />
        </div>
        <div className="register__form-password">
          <label>Confirm Password</label>
          <Input
            type={confirmPasswordType}
            placeHolder="Confirm your Password"
            isPassword={true}
            handleClickShowPassword={handleClickShowConfirmPassword}
            hiddenPassword={hiddenConfirmPassword}
          />
        </div>
        <button className="btn-register">Register</button>
      </form>
      <span className="notice-link">
        Already have an Account?{" "}
        <span style={{ fontWeight: "bold" }}>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={"/login"}
          >
            Login
          </Link>
        </span>
      </span>
    </div>
  );
};

export default RegisterForm;
