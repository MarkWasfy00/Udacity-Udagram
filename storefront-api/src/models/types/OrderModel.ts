export type OrderModel = {
  id?: number;
  user_id: number;
  is_complete: boolean;
};

export type OrderProductModel = {
  order_id: number;
  product_id: number;
  quantity: number;
};
