import React, {
  ChangeEvent,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import "./styles.scss";
import ValidationError from "./ValidationInput";
import useUserStore from "../../store/userStore";

interface Rule {
  pattern?: RegExp;
  message: string;
  min?: number;
}

export const usernameFormRules: Rule[] = [
  {
    pattern: /^\D.*$/,
    message: "Username cannot start with a number",
  },
  {
    pattern: /^[A-Za-z0-9]+$/,
    message: "Username can only contain letters and numbers",
  },
  {
    min: 5,
    message: "Username must be at least 5 characters long",
  },
];

export const passwordFormRules = [
  {
    pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)+$/,
    message:
      "The password must have at least one letter, one number, and no special characters.",
  },
  { min: 6, message: "Password must be at least 6 characters long" },
];

interface Props {
  type: string;
  placeHolder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword: Boolean;
  handleClickShowPassword?: any;
  hiddenPassword?: Boolean;
  value: any;
  name?: string;
}

const Input = ({
  type,
  placeHolder,
  onChange,
  isPassword,
  handleClickShowPassword,
  hiddenPassword,
  value,
  name,
}: Props) => {
  const [error, setError] = useState<string | null>(null);
  const setErrorInput = useUserStore((store) => store.setErorInput);

  useEffect(() => {
    setErrorInput(error);
  }, [error]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event)
    const value = event.target.value
    
    
    if (name === "username") {
      for (const rule of usernameFormRules) {
        if (rule.pattern && !rule.pattern.test(value)) {
          setError(rule.message);
          return;
        }
        if (rule.min && value.length < rule.min) {
          setError(rule.message);
          return;
        }
      }
    } else if (name === "password") {
      for (const rule of passwordFormRules) {
        if (rule.pattern && !rule.pattern.test(value)) {
          setError(rule.message);
          return;
        }
        if (rule.min && value.length < rule.min) {
          setError(rule.message);
          return;
        }
      }
    }
    setError("");
  };

  
  const passwordInput = useMemo(() => {
    return (
      <>
        <div className="password-input">
          <input
            type={type}
            name={name}
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
            name={name}
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
