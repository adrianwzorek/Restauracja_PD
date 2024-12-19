import React, { useEffect, useState } from "react";
import { Bill, BillDish, BillDrink, Waiter } from "../../types";
import { jwtDecode } from "jwt-decode";
import api from "../../api";
import Table from "../../components/WaiterTable";
import { useNavigate } from "react-router-dom";

export type Token = {
  exp: number;
  iat: number;
  jti: string;
  token_type: string;
  user_id: number;
};

const Dashboard = () => {
  const [user, setUser] = useState<Waiter | null>(null);
  const [bills, setBills] = useState<Bill[]>([]);
  const [billDish, setBillDish] = useState<BillDish[]>([]);
  const [billDrink, setBillDrink] = useState<BillDrink[]>([]);
  const [wait, setWait] = useState(false);

  const navigator = useNavigate();

  const getUser = async () => {
    const token = localStorage.getItem("access");
    if (!token) return;
    try {
      const data: Token = jwtDecode(token);
      const response = await api.get("api/order/");
      const { user, bill_dishes, bill_drinks, bills } = response.data;
      setUser(user);
      setBillDish(bill_dishes || []);
      setBillDrink(bill_drinks || []);
      setBills(bills || []);
      console.log("Success", { user, bill_dishes, bill_drinks, bills });
    } catch (err) {
      setWait(true);
      console.error("Error fetching waiter data:", err);
    }
  };

  const logout = async () => {
    try {
      await api.post("logout/");
      console.log("Logged out successfully.");
    } catch (err) {
      console.error("Error during logout:", err);
    } finally {
      localStorage.clear();
      navigator("/login/");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Table
        table={user?.has_table || []}
        bills={bills}
        billDish={billDish}
        billDrink={billDrink}
      />
      <button onClick={logout}>Logout</button>
      {wait && <a href="http://127.0.0.1:8000/admin/">SuperUser</a>}
    </div>
  );
};

export default Dashboard;
