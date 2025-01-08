export type Dish = {
  id: number;
  title: string;
  description: string;
  ingredients: string;
  image: string;
  cost: number;
  portion_weight: number;
  special: boolean;
  has_allergen: number[];
};

export type Drink = {
  id: number;
  name: string;
  type: number;
  description: string;
  cost: number;
  image: string;
  weight: number;
  special: boolean;
};

export const ALCOHOL = (num: number) => {
  switch (num) {
    case 0:
      return "No Alcohol";
    case 1:
      return "Alcohol";
    default:
      return "Unknown";
  }
};

export type Guest = {
  id: number;
  table: number;
  bill: number;
  date_came: Date;
  wait: boolean;
};

export type DataDrink = {
  data: Drink[];
  movement: {
    prev: string;
    next: string;
  };
};

export type DataDish = {
  data: Dish[];
  movement: {
    prev: string;
    next: string;
  };
};

export type Children = {
  children: React.ReactNode;
};

export type Bill = {
  date: Date;
  dishes: number[];
  drinks: number[];
  full_cost: number;
  id: number;
  table: number;
  done: boolean;
  abandoned: boolean;
};

export type Allergen = {
  id: number;
  name: string;
};

export type BillDish = {
  id?: number;
  id_dish?: number;
  id_bill: number;
  number: number;
  isReady: Boolean;
};

export type BillDrink = {
  id?: number;
  id_drink?: number;
  id_bill: number;
  number: number;
  isReady: Boolean;
};

export type User = {
  username: string;
  password: string;
};

export type Waiter = {
  id: number;
  user: User;
  name: string;
  surname: string;
  phone_num: number;
  work_start: string;
  has_table: number[];
};

export type Token = {
  exp: number;
  iat: number;
  jti: string;
  token_type: string;
  user_id: number;
};
