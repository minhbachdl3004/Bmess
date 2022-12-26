import React from "react";

interface Props {
    message: string;
}

const ValidationError = ({ message } : Props) => (
  <div style={{ color: "red", fontSize: "12px", margin: "15px 15px 0px 15px", textAlign: "left" }}>{message}</div>
);

export default ValidationError