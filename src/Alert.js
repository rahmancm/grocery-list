import React, { useEffect } from "react";

const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      removeAlert();
      return clearTimeout(timeOut);
    }, 2000);
  }, [list, removeAlert]);
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
