import React, { ChangeEvent, useEffect, useState, useMemo, useCallback } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import "./styles.scss";
import ValidationError from "./ValidationInput";
import useUserStore from "../../store/userStore";

interface Props {
  type: string;
  placeHolder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword: Boolean;
  handleClickShowPassword?: any;
  hiddenPassword?: Boolean;
  value: any;
}

const Input = ({
  type,
  placeHolder,
  onChange,
  isPassword,
  handleClickShowPassword,
  hiddenPassword,
  value,
}: Props) => {
  const [error, setError] = useState<string | null>(null);
  const setErrorInput = useUserStore((store) => store.setErorInput)

  useEffect(() => {
    setErrorInput(error)
  }, [error])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    // Validate input here
    switch (type) {
      case "email":
        setError(
          /^\S+@\S+\.\S+$/.test(e.target.value) ? null : "*Invalid email"
        );
        break;
      case "text":
        setError(
          e.target.value.length >= 6
            ? null
            : "*Username must be at least 6 characters"
        );
        break;
      case "password":
        setError(
          e.target.value.length >= 6 && /[A-Z]/.test(e.target.value)
            ? null
            : "*Password must be at least 6 characters and contain at least one uppercase character"
        );
        break;
      default:
        setError("Invalid input");
    }
  };
  const passwordInput = useMemo(() => {
    return (
      <>
        <div className="password-input">
          <input
            type={type}
            placeholder={placeHolder}
            onChange={handleChange}
          />
          <div className="visibility-icon">
            <IconButton onClick={handleClickShowPassword}>
              {hiddenPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </div>
          {error && <ValidationError message={error} />}
        </div>
      </>
    );
  }, [type, placeHolder, onChange, hiddenPassword, handleClickShowPassword]);

  return (
    <div>
      {!isPassword ? (
        <>
          <input
            type={type}
            placeholder={placeHolder}
            onChange={handleChange}
          />
          {error && <ValidationError message={error} />}
        </>
      ) : (
        passwordInput
      )}
    </div>
  );
};

export default Input;
