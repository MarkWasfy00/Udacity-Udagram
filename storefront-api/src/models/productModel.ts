import { db } from "../database/database";
import { errorHandler, successWithData } from "../functions/responseHandler";

import { FullMessage, ReturnMessage } from "../functions/types/ResponseHandler";
import { ProductModel } from "./types/ProductModel";

class Product {
  async index(): Promise<FullMessage | ReturnMessage> {
    try {
      const connection = await db.connect();
      const query = "SELECT * FROM products";
      const response = await connection.query(query);
      connection.release();
      return successWithData("Fetched all products", response.rows);
    } catch (err) {
      return errorHandler((err as Error).message);
    }
  }

  async create(product: ProductModel): Promise<FullMessage | ReturnMessage> {
    try {
      const connection = await db.connect();
      const query = "INSERT INTO products (name, price) VALUES($1, $2) RETURNING id, name, price";
      const response = await connection.query(query, [product.name, product.price]);
      connection.release();
      return successWithData("Product added", response.rows[0]);
    } catch (err) {
      return errorHandler((err as Error).message);
    }
  }

  async show(id: number): Promise<FullMessage | ReturnMessage> {
    try {
      const connection = await db.connect();
      const query = "SELECT * FROM products WHERE id=($1)";
      const response = await connection.query(query, [id]);
      connection.release();
      if (response.rowCount) {
        return successWithData("Product Fetched", response.rows[0]);
      } else {
        return errorHandler("Product not found");
      }
    } catch (err) {
      return errorHandler((err as Error).message);
    }
  }

  async update(id: number, product: ProductModel): Promise<FullMessage | ReturnMessage> {
    try {
      const connection = await db.connect();
      const data = [product.name, product.price, id];
      const query = "UPDATE products SET name=($1), price=($2) WHERE products.id =$3 RETURNING *";
      const response = await connection.query(query, data);
      connection.release();
      if (response.rowCount) {
        return successWithData("Product updated", response.rows[0]);
      } else {
        return errorHandler("Product not found");
      }
    } catch (err) {
      return errorHandler((err as Error).message);
    }
  }

  async destroy(id: number): Promise<FullMessage | ReturnMessage> {
    try {
      const connection = await db.connect();
      const query = "DELETE FROM products WHERE id=$1 RETURNING *";
      const response = await connection.query(query, [id]);
      connection.release();
      if (response.rowCount) {
        return successWithData("Product deleted", response.rows[0]);
      } else {
        return errorHandler("Product not found");
      }
    } catch (err) {
      return errorHandler((err as Error).message);
    }
  }
}

export default Product;
