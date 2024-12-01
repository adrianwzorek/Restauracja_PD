export type Dish = {
  id_dish: number;
  title: string;
  description: string;
  ingredients: string;
  image: string;
  cost: number;
  portion_weight: number;
  special: boolean;
  has_allergen: string[];
};

export type Drink = {
  id_drink: number;
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
