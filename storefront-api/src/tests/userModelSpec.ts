import { UserModel } from "../models/types/UserModel";
import User from "../models/userModel";

const userModel = new User();
const dummyUserModelData = {
  id: 0,
  email: "db@test.com",
  firstname: "db",
  lastname: "test",
  password: "dbtest123",
};

describe("Testing user model database", () => {
  it("Test create user", async () => {
    const create = await userModel.create(dummyUserModelData);
    if ("data" in create) {
      const { id, firstname } = create.data as UserModel;
      dummyUserModelData.id = id as number;
      expect(dummyUserModelData.firstname).toEqual(firstname);
    }
    expect(create.status).toBe(200);
  });

  it("Test auth user", async () => {
    const auth = await userModel.auth(dummyUserModelData.email, dummyUserModelData.password);
    if ("data" in auth) {
      const { id } = auth.data as UserModel;
      expect(dummyUserModelData.id).toEqual(id as number);
    }
    expect(auth.status).toBe(200);
  });

  it("Test get all user", async () => {
    const index = await userModel.index();
    if ("data" in index) {
      expect((index.data as UserModel[]).length).toBeGreaterThanOrEqual(1);
    }
    expect(index.status).toBe(200);
  });

  it("Test show sepcific user", async () => {
    const show = await userModel.show(dummyUserModelData.id);
    if ("data" in show) {
      const { firstname } = show.data as UserModel;
      expect(dummyUserModelData.firstname).toEqual(firstname);
    }
    expect(show.status).toBe(200);
  });

  it("Test update user", async () => {
    const update = await userModel.update(dummyUserModelData.id, {
      id: dummyUserModelData.id,
      email: "db@test2.com",
      firstname: "dbtest2",
      lastname: "test",
      password: "dbtest456",
    });
    if ("data" in update) {
      const { firstname } = update.data as UserModel;
      expect("dbtest2").toEqual(firstname);
    }
    expect(update.status).toBe(200);
  });

  it("Test delete user", async () => {
    const destroy = await userModel.destroy(dummyUserModelData.id);
    if ("data" in destroy) {
      const { firstname } = destroy.data as UserModel;
      expect("dbtest2").toEqual(firstname);
    }
    expect(destroy.status).toBe(200);
  });
});
