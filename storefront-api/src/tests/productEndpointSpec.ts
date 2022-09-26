import supertest from "supertest";
import { app } from "../index";

const request = supertest(app);
const product = {
  id: 0,
  name: "mobile",
  price: 22.99,
};

describe("Testing product routes endpoints", () => {
  it("Test create product route", async () => {
    const res = await request.post("/api/products").send(product);
    expect(res.body.data.name).toEqual(product.name);
    product.id = res.body.data.id;
  });

  it("Test all products route", async () => {
    await request.get("/api/products").expect(200);
  });

  it("Test get specific product", async () => {
    await request.get(`/api/products/${product.id}`).expect(200);
  });

  it("Test update product route", async () => {
    await request
      .put(`/api/products/${product.id}`)
      .send({ id: product.id, name: "iphone 11", price: 999.99 })
      .expect(200);
  });

  it("Test delete product route", async () => {
    await request.delete(`/api/products/${product.id}`).expect(200);
  });
});
