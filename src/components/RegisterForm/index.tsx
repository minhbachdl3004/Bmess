import axios from "axios";
import React, {
  useState,
  useRef,
  ChangeEvent,
  useMemo,
  useCallback,
} from "react";
import { Link } from "react-router-dom";
import Input from "../common/Input";
import "./styles.scss";
import MySnackbar from "../common/SnackBar";
import useUserStore from "../../store/userStore";
import { NightsStay } from "@material-ui/icons";
import ValidationError from "../common/ValidationInput";

const RegisterForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  const [hiddenPassword, setHiddenPassword] = useState<Boolean>(false);
  const [hiddenConfirmPassword, setHiddenConfirmPassword] =
    useState<Boolean>(false);
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password"
  );
  const [confirmPasswordType, setConfirmPasswordType] = useState<
    "text" | "password"
  >("password");

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const errorInput = useUserStore((store) => store.errorInput);

  const handleClickShowPassword = useCallback(() => {
    setHiddenPassword(!hiddenPassword);
    setPasswordType(hiddenPassword ? "password" : "text");
  }, [hiddenPassword]);

  const handleClickShowConfirmPassword = useCallback(() => {
    setHiddenConfirmPassword(!hiddenConfirmPassword);
    setConfirmPasswordType(hiddenConfirmPassword ? "password" : "text");
  }, [hiddenConfirmPassword]);

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

  const handleRegister = async (e: any) => {
    e.preventDefault();

    const newUser = {
      username: username,
      password: password,
    };

    if (errorInput === "") {
      try {
        const userRegister = await axios.post(
          "http://localhost:3000/api/auth/register",
          newUser
        );
        console.log(userRegister);
        setMessage("Register account successful!");
        setStatus("success");
      } catch (error: any) {
        console.log(error);
        setMessage("Register account failed!");
        setStatus("error");
      }
    } else {
      setMessage("Input is not valid");
      setStatus("error");
    }
    formRef.current?.reset();
  };
  return (
    <div className="register__form">
      <h1 style={{ color: "#17d177", fontSize: 30 }} className="title">
        BMess
      </h1>
      <form ref={formRef} onSubmit={handleRegister}>
        <div className="register__form-username">
          <Input
            type="text"
            placeHolder="Username*"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            isPassword={false}
            value={username}
            name="username"
          />
        </div>
        <div className="register__form-password">
          <Input
            type={passwordType}
            placeHolder="Password*"
            isPassword={true}
            handleClickShowPassword={handleClickShowPassword}
            hiddenPassword={hiddenPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            value={password}
            name="password"
          />
        </div>
        <div className="register__form-password">
          <Input
            type={confirmPasswordType}
            placeHolder="Confirm Password*"
            isPassword={true}
            handleClickShowPassword={handleClickShowConfirmPassword}
            hiddenPassword={hiddenConfirmPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
            value={confirmPassword}
            name="confirmPassword"
          />
          {confirmPassword && (password !== confirmPassword ? (
            <ValidationError message="Password don't match" />
          ) : null)}
        </div>
        <button
          onClick={() => handleShowSnackbar(message)}
          className="btn-register"
        >
          Register
        </button>
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

export default RegisterForm;