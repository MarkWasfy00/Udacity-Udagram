import { UserModel } from "../../models/types/UserModel";
import { ProductModel } from "../../models/types/ProductModel";
import { OrderModel, OrderProductModel } from "../../models/types/OrderModel";

export type ReturnMessage = {
  // can be success message or error message
  msg: string;
  status: number;
};

export type DataMessage = {
  // success message with data
  data: UserModel | UserModel[] | ProductModel | ProductModel[] | OrderModel | OrderModel[] | OrderProductModel;
};

export type FullMessage = ReturnMessage & DataMessage;
