import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import Input from "../common/Input";
import axios from "axios";
import useUserStore from "../../store/userStore";
import MySnackbar from "../common/SnackBar";
import { Modal } from "@mui/material";

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hiddenPassword, setHiddenPassword] = useState<Boolean>(false);
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password"
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const setToken = useUserStore((store) => store.setToken);

  const handleClickShowPassword = useCallback(() => {
    setHiddenPassword(!hiddenPassword);
    setPasswordType(hiddenPassword ? "password" : "text");
  }, [hiddenPassword]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleShowSnackbar = useMemo(
    () => (msg: string) => {
      setMessage(msg);
      setOpen(true);
    },
    []
  );

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const newUser = {
      username: username,
      password: password,
    };

    try {
      const token = await axios.post(
        "http://localhost:3000/api/auth/login",
        newUser
      );
      setToken(token.data?.accessToken);
      console.log(token.data?.accessToken);
      setMessage("Login successful!");
      setStatus("success");
    } catch (error: any) {
      console.log(error);
      setMessage(error.response.data);
      setStatus("error");
    }

    formRef.current?.reset(); // Clear the form fields
  };

  return (
    <div className="login__form">
      <h1 style={{ color: "#17d177" }} className="title">
        BMess
      </h1>
      <form ref={formRef} onSubmit={handleLogin}>
        <div className="login__form-username">
          <Input
            type="text"
            placeHolder="Username*"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            isPassword={false}
            value={username}
          />
        </div>
        <div className="login__form-password">
          <div className="password-input">
            <Input
              type={passwordType}
              placeHolder="Password*"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              isPassword={true}
              handleClickShowPassword={handleClickShowPassword}
              hiddenPassword={hiddenPassword}
              value={password}
            />
          </div>
        </div>
        <button
          onClick={() => handleShowSnackbar(message)}
          className="btn-login"
        >
          Login
        </button>
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
      <MySnackbar
        open={open}
        message={message}
        onClose={handleClose}
        className={message}
        status={status}
      />
    </div>
  );
};

export default LoginForm;
