import React, { ChangeEvent, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";

interface Props {
  type: string;
  placeHolder: string;
  onChange?: (e: any) => void;
  isPassword: Boolean;
  handleClickShowPassword?: any;
  hiddenPassword? : Boolean;
}

const Input = ({
  type,
  placeHolder,
  onChange,
  isPassword,
  handleClickShowPassword,
  hiddenPassword
}: Props) => {

  return (
    <div>
      {!isPassword ? (
        <input type={type} placeholder={placeHolder} onChange={onChange} />
      ) : (
        <div className="password-input">
          <input type={type} placeholder={placeHolder} onChange={onChange} />
          <div className="visibility-icon">
            <IconButton onClick={handleClickShowPassword}>
              {hiddenPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default Input;
