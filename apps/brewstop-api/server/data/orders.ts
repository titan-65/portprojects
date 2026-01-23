export type OrderStatus = "pending" | "preparing" | "ready" | "completed";

export interface OrderItem {
  id: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}
