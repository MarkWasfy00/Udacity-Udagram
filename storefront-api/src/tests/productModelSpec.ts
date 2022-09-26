import Product from "../models/productModel";
import { ProductModel } from "../models/types/ProductModel";

const productModel = new Product();
const dummyProductModelData: ProductModel = {
  id: 0,
  name: "Iphone 11",
  price: 99.88,
};

describe("Testing product model database", () => {
  it("Test create product", async () => {
    const create = await productModel.create(dummyProductModelData);
    if ("data" in create) {
      const { id, name } = create.data as ProductModel;
      dummyProductModelData.id = id;
      expect(dummyProductModelData.name).toEqual(name);
    }
    expect(create.status).toBe(200);
  });

  it("Test get all products", async () => {
    const index = await productModel.index();
    if ("data" in index) {
      expect((index.data as ProductModel[]).length).toBeGreaterThanOrEqual(1);
    }
    expect(index.status).toBe(200);
  });

  it("Test show sepcific product", async () => {
    const show = await productModel.show(dummyProductModelData.id as number);
    if ("data" in show) {
      const { name } = show.data as ProductModel;
      expect(dummyProductModelData.name).toEqual(name);
    }
    expect(show.status).toBe(200);
  });

  it("Test update product", async () => {
    const update = await productModel.update(dummyProductModelData.id as number, {
      name: "Iphone 14",
      price: 999.99,
    });
    if ("data" in update) {
      const { name } = update.data as ProductModel;
      expect("Iphone 14").toEqual(name);
    }
    expect(update.status).toBe(200);
  });

  it("Test delete product", async () => {
    const destroy = await productModel.destroy(dummyProductModelData.id as number);
    if ("data" in destroy) {
      const { name } = destroy.data as ProductModel;
      expect("Iphone 14").toEqual(name);
    }
    expect(destroy.status).toBe(200);
  });
});
