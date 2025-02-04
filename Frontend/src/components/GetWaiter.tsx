import React from "react";
import api from "../api";

const GetWaiter = () => {
  const getWaiter = async () => {
    const guest = localStorage.getItem("guest");
    if (!guest) return console.log("no such guest");
    try {
      await api.put(`app/guest/${guest}/`, { wait: true });
      alert("Kelner przyjdzie za moment");
    } catch (err) {
      console.log("error with change wait in guest " + err);
      throw err;
    }
  };
  return (
    <button onClick={() => getWaiter()} className="help">
      Pomoc
    </button>
  );
};

export default GetWaiter;
