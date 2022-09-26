import supertest from "supertest";
import { app } from "../index";

const request = supertest(app);

describe("Testing register/login endpoints", () => {
  it("Test register", async () => {
    await request
      .post("/api/auth/register")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({ email: "testAuth@jasmin.com", firstname: "Jasmin", lastname: "test", password: "jasmine123" })
      .expect(200);
  });

  it("Test login", async () => {
    await request
      .post("/api/auth/login")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({ email: "testAuth@jasmin.com", password: "jasmine123" })
      .expect(200);
  });
});
