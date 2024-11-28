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
  type: string;
  description: string;
  cost: number;
  image: string;
  weight: number;
  special: boolean;
};
