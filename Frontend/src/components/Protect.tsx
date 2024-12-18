import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Children = {
  children: React.ReactNode;
};

const Protect: React.FC<Children> = ({ children }) => {
  const navigator = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) navigator("/login");
  }, []);
  return <div>{children}</div>;
};

export default Protect;
