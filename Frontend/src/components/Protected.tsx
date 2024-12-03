import React, { useEffect, useState } from "react";
import { Children } from "../types";

const Protected: React.FC<Children> = ({ children }) => {
  const [data, SetData] = useState("");
  useEffect(() => {
    if (!localStorage.getItem("Guest")) SetData("jest");
  });
  return data !== "" ? children : <h1>Not found</h1>;
};

export default Protected;
