import supertest from "supertest";
import { app } from "../index";

const request = supertest(app);
let token: string | null = null;
let currentId: number | null = null;

describe("Testing user routes endpoints", () => {
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
    currentId = res.body.user.data.id;
  });

  it("Test all users route with auth", async () => {
    await request.get("/api/users").set("Authorization", `Bearer ${token}`).expect(200);
  });

  it("Test get specific user route with auth", async () => {
    await request.get(`/api/users/${currentId}`).set("Authorization", `Bearer ${token}`).expect(200);
  });

  it("Test update user route with auth", async () => {
    await request
      .put(`/api/users/${currentId}`)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({ id: 1, email: "test123@jasmin.com", firstname: "jest", lastname: "test2", password: "jasmine324" })
      .expect(200);
  });

  it("Test delete user route with auth", async () => {
    await request.delete(`/api/users/${currentId}`).set("Authorization", `Bearer ${token}`).expect(200);
  });
});
