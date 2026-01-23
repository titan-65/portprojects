export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: "coffee" | "tea" | "food";
}

export const menu: MenuItem[] = [
  { id: "latte", name: "Latte", price: 4.5, category: "coffee" },
  { id: "espresso", name: "Espresso", price: 3, category: "coffee" },
  { id: "chai", name: "Chai Tea", price: 4, category: "tea" },
  { id: "croissant", name: "Croissant", price: 3.5, category: "food" },
];
