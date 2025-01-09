import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { User } from "../types";
import "../css/form.css";
const Login = () => {
  const [data, setData] = useState<User>({ username: "", password: "" });
  const navigator = useNavigate();
  const getInputs = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) navigator("/dashboard");
  }, []);

  const handleLogin = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    await api
      .post(`token/`, { username: data.username, password: data.password })
      .then((res) => {
        const access = res.data.access;
        const refresh = res.data.refresh;
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        console.log("done");
        navigator("/dashboard/");
      })
      .catch((err) => {
        alert("wrong Data");
        console.log("Wrong login or password " + err);
        setData({ password: "", username: "" });
        throw err;
      });
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <h1>Logowanie</h1>
        <label htmlFor="username">
          <h2>Login</h2>
          <input
            type="text"
            name="username"
            id="username"
            value={data?.username}
            required
            onChange={(e) => getInputs(e)}
          />
        </label>
        <label htmlFor="password">
          <h2>Hasło</h2>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={data?.password}
            onChange={(e) => getInputs(e)}
          />
        </label>
        <div className="buttons-container">
          <button type="submit">Zaloguj</button>
        </div>
      </form>
    </>
  );
};

export default Login;
