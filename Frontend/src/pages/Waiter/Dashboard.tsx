import React, { useEffect, useState } from "react";
import {
  Bill,
  BillDish,
  BillDrink,
  Dish,
  Drink,
  Guest,
  Waiter,
} from "../../types";
import { jwtDecode } from "jwt-decode";
import api from "../../api";
import Table from "../../components/WaiterTable";
import { useNavigate } from "react-router-dom";
import {
  getGuestDish,
  getGuestDrink,
  getGuests,
} from "../../components/GetData";

import "../../css/waiter.css";

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
  const [itemDishes, setItemDishes] = useState<Dish[]>();
  const [itemDrinks, setItemDrinks] = useState<Drink[]>();
  const [guest, setGuest] = useState<Guest[]>();
  const navigator = useNavigate();

  const getUser = async () => {
    const token = localStorage.getItem("access");
    if (!token) return;
    try {
      const data: Token = jwtDecode(token);
      const response = await api.get("api/order/");
      const { user, bill_dishes, bill_drinks, bills } = response.data;
      const listDishes = await getGuestDish(bill_dishes);
      const listDrinks = await getGuestDrink(bill_drinks);
      const date = new Date();
      const specificDate = new Date(
        `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
      );
      const filterBills = bills.filter((e: Bill) => e.date !== specificDate);
      const guestList = await getGuests(bills);
      setGuest(guestList);
      setUser(user);
      setBillDish(bill_dishes || []);
      setBillDrink(bill_drinks || []);
      setBills(filterBills || []);
      setItemDishes(listDishes);
      setItemDrinks(listDrinks);
      console.log("Success", {
        user,
        bill_dishes,
        bill_drinks,
        bills,
        itemDishes,
        itemDrinks,
        guestList,
      });
    } catch (err) {
      setWait(true);
      console.error("Error fetching waiter data:", err);
    }
  };
  const setReadyDish = async (item: BillDish) => {
    if (!item) return 0;
    try {
      await api.put(`app/bill_dish/${item.id_bill}/${item.id_dish}/`, {
        isReady: true,
      });
      const list = billDish.filter((e) => e.id !== item.id);
      setBillDish(list);
      return console.log("Done", item);
    } catch (err) {
      console.log("something is wrong in change ready" + err);
      throw err;
    }
  };
  const setReadyDrink = async (item: BillDrink) => {
    if (!item) return 0;
    try {
      await api.put(`app/bill_drink/${item.id_bill}/${item.id_drink}/`, {
        isReady: true,
      });
      const list = billDrink.filter((e) => e.id !== item.id);
      setBillDrink(list);
      return console.log("Done", item);
    } catch (err) {
      console.log("something is wrong in change ready" + err);
      throw err;
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

  const changeWait = async (item: Guest) => {
    try {
      await api.put(`app/guest/${item.id}/`, { ...item, wait: false });
      const list = guest?.filter((e) => e !== item);
      setGuest(list);
    } catch (err) {
      console.log("something wrong with set wait " + err);
      throw err;
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      {guest?.map((e) => {
        return e.wait ? (
          <div className="hel" key={e.id}>
            <p>🔴help🔴</p>
            <p>{e.table}</p>
            <button onClick={() => changeWait(e)}>Check</button>
          </div>
        ) : (
          ""
        );
      })}
      <Table
        table={user?.has_table ?? []}
        bills={bills}
        billDish={billDish}
        billDrink={billDrink}
        itemDishes={itemDishes ?? []}
        itemDrinks={itemDrinks ?? []}
        outDish={setReadyDish}
        outDrink={setReadyDrink}
      />
      <button onClick={logout}>Logout</button>
      {wait && <a href="http://127.0.0.1:8000/admin/">SuperUser</a>}
    </div>
  );
};

export default Dashboard;
