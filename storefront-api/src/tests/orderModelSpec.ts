import Order from "../models/orderModel";
import Product from "../models/productModel";
import { OrderModel, OrderProductModel } from "../models/types/OrderModel";
import { ProductModel } from "../models/types/ProductModel";
import { UserModel } from "../models/types/UserModel";
import User from "../models/userModel";

const orderModel = new Order();
const productModel = new Product();
const userModel = new User();

const dummyOrderModelData = {
  id: 0,
  quantity: 5,
};
const dummyProductModelData: ProductModel = {
  id: 0,
  name: "Iphone 11",
  price: 99.88,
};
const dummyUserModelData: UserModel = {
  id: 0,
  email: "db@order.com",
  firstname: "db",
  lastname: "test",
  password: "dbtest123",
};

describe("Testing order model database", () => {
  beforeAll(async () => {
    const createUser = await userModel.create(dummyUserModelData);
    if ("data" in createUser) {
      const { id } = createUser.data as UserModel;
      dummyUserModelData.id = id;
    }
    const createProduct = await productModel.create(dummyProductModelData);
    if ("data" in createProduct) {
      const { id } = createProduct.data as ProductModel;
      dummyProductModelData.id = id;
    }
  });
  it("Test create order", async () => {
    const create = await orderModel.create(dummyUserModelData.id as number, false);
    if ("data" in create) {
      const { id } = create.data as OrderModel;
      dummyOrderModelData.id = id as number;
    }
    expect(create.status).toBe(200);
  });

  it("Test get all orders", async () => {
    const index = await orderModel.index();
    if ("data" in index) {
      expect((index.data as OrderModel[]).length).toBeGreaterThanOrEqual(1);
    }
    expect(index.status).toBe(200);
  });

  it("Test show sepcific order", async () => {
    const show = await orderModel.show(dummyOrderModelData.id as number);
    if ("data" in show) {
      const { id } = show.data as OrderModel;
      expect(dummyOrderModelData.id).toEqual(id as number);
    }
    expect(show.status).toBe(200);
  });

  it("Test add product to order", async () => {
    const add = await orderModel.addProduct(
      dummyOrderModelData.id,
      dummyProductModelData.id as number,
      dummyOrderModelData.quantity
    );
    if ("data" in add) {
      const { quantity } = add.data as OrderProductModel;
      expect(dummyOrderModelData.quantity).toEqual(quantity);
    }
    expect(add.status).toBe(200);
  });

  it("Test show order details", async () => {
    const details = await orderModel.orderDetails(dummyOrderModelData.id);
    if ("data" in details) {
      expect((details.data as OrderModel[]).length).toBeGreaterThanOrEqual(1);
    }
    expect(details.status).toBe(200);
  });

  it("Test update order", async () => {
    const update = await orderModel.update(dummyOrderModelData.id, {
      user_id: dummyUserModelData.id as number,
      is_complete: true,
    });
    if ("data" in update) {
      const { is_complete } = update.data as OrderModel;
      expect(is_complete).toBeTruthy();
    }
    expect(update.status).toBe(200);
  });

  it("Test delete order", async () => {
    const destroy = await orderModel.destroy(dummyOrderModelData.id as number);
    if ("data" in destroy) {
      const { id } = destroy.data as OrderModel;
      expect(dummyOrderModelData.id).toEqual(id as number);
    }
    expect(destroy.status).toBe(200);
  });
});
