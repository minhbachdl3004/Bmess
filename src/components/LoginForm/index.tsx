import React, { useState, ChangeEvent, FormEvent } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import Input from "../Input";

const LoginForm = () => {
  const [username, setUsername] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [hiddenPassword, setHiddenPassword] = useState<Boolean>(false);
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password"
  );

  const handleClickShowPassword = () => {
    setHiddenPassword(!hiddenPassword);
    setPasswordType(hiddenPassword ? "password" : "text");
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser = {
      username: username,
      password: password,
    };
  };

  return (
    <div className="login__form">
      <h1 className="title">Sign in</h1>
      <form onSubmit={handleLogin}>
        <div className="login__form-username">
          <label>Username</label>
          <Input
            type="text"
            placeHolder="Enter your username"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            isPassword={false}
          />
        </div>
        <div className="login__form-password">
          <label>Password</label>
          <div className="password-input">
            <Input
              type={passwordType}
              placeHolder="Enter your Password"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              isPassword={true}
              handleClickShowPassword={handleClickShowPassword}
              hiddenPassword={hiddenPassword}
            />
          </div>
        </div>
        <button className="btn-login">Login</button>
      </form>
      <span className="notice-link">
        Don't have an Account?{" "}
        <span style={{ fontWeight: "bold" }}>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={"/register"}
          >
            Register
          </Link>
        </span>
      </span>
    </div>
  );
};

export default LoginForm;
