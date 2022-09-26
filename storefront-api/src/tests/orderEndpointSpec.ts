import supertest from "supertest";
import { app } from "../index";

const request = supertest(app);
let token: string | null = null;
const order = {
  id: 0,
  user_id: 0,
  is_complete: false,
};
const product = {
  id: 0,
  name: "battery",
  price: 99.99,
  quantity: 4,
};

describe("Testing order routes endpoints", () => {
  beforeAll(async () => {
    await request
      .post("/api/auth/register")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({ email: "testOrder@jasmin.com", firstname: "Jasmin", lastname: "test", password: "jasmine123" });
    const res = await request
      .post("/api/auth/login")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({ email: "testOrder@jasmin.com", password: "jasmine123" });
    token = `${res.body.userToken}`;
    order.user_id = res.body.user.data.id;
    const sendProduct = await request
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(product);
    product.id = sendProduct.body.data.id;
  });

  it("Test create order route  with auth", async () => {
    const res = await request
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(order);
    expect(res.body.data.user_id).toEqual(order.user_id);
    order.id = res.body.data.id;
  });

  it("Test all orders route with auth", async () => {
    await request.get("/api/orders").set("Authorization", `Bearer ${token}`).expect(200);
  });

  it("Test get specific order  with auth", async () => {
    await request.get(`/api/orders/${order.id}`).set("Authorization", `Bearer ${token}`).expect(200);
  });

  it("Test update order route with auth", async () => {
    await request
      .put(`/api/orders/${order.id}`)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({ id: order.id, user_id: order.user_id, is_complete: true })
      .expect(200);
  });

  it("Test add product to the order route with auth", async () => {
    await request
      .post(`/api/orders/${order.id}/products`)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({ productId: product.id, quantity: product.quantity })
      .expect(200);
  });

  it("Test view order details route with auth", async () => {
    await request
      .get(`/api/orders/${order.id}/products`)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);
  });

  it("Test delete order route with auth", async () => {
    await request.delete(`/api/orders/${order.id}`).set("Authorization", `Bearer ${token}`).expect(200);
  });
});
