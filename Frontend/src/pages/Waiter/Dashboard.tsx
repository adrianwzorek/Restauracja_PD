import React, { useEffect, useState } from "react";
import { Bill, BillDish, BillDrink, Waiter } from "../../types";
import { jwtDecode } from "jwt-decode";
import api from "../../api";
import WaiterTable from "../../components/WaiterTable";
import { redirect, useNavigate } from "react-router-dom";

export type Token = {
  exp: number;
  iat: number;
  jti: string;
  token_type: string;
  user_id: number;
};

const Dashboard = () => {
  const [user, setUser] = useState<Waiter>();
  const [bills, setBills] = useState<Bill[]>();
  const [billDish, setBillDish] = useState<BillDish[]>();
  const [billDrink, setBillDrink] = useState<BillDrink[]>();
  const navigator = useNavigate();
  const getUser = async () => {
    const token = localStorage.getItem("access");
    if (!token) return "";
    try {
      const data: Token = jwtDecode(token);
      await api
        .get(`api/order/`)
        .then((res) => {
          setUser(res.data.user);
          setBillDish(res.data.bill_dishes);
          setBillDrink(res.data.bill_drinks);
          setBills(res.data.bills);
          console.log("Success");
        })
        .catch((err) => {
          console.log("Error on fetching waiter " + err);
        });
    } catch (err) {
      console.log("Error with decoding " + err);
      throw err;
    }
  };

  console.log(user);

  const logout = async () => {
    await api
      .post(`logout/`)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log("something wrong with logout " + err);
        throw err;
      });
    localStorage.clear();
    navigator("/login/");
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container">
      <WaiterTable
        dish={billDish ?? []}
        drink={billDrink ?? []}
        table={user?.has_table ?? []}
        setDish={setBillDish}
        setDrink={setBillDrink}
      />
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default Dashboard;
