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
    case 1:
      return "Alcohol";
    case 2:
      return "No Alcohol";
    default:
      return "Unknown";
  }
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
};

export type BillDrink = {
  id?: number;
  id_drink?: number;
  id_bill: number;
  number: number;
};
