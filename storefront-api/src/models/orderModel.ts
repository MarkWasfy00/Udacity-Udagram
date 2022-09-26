import { db } from "../database/database";
import { errorHandler, successWithData } from "../functions/responseHandler";

import { FullMessage, ReturnMessage } from "../functions/types/ResponseHandler";
import { OrderModel } from "./types/OrderModel";

class Order {
  async index(): Promise<FullMessage | ReturnMessage> {
    try {
      const connection = await db.connect();
      const query = "SELECT * FROM orders ORDER BY id";
      const response = await connection.query(query);
      connection.release();
      return successWithData("Fetched all orders", response.rows);
    } catch (err) {
      return errorHandler((err as Error).message);
    }
  }

  async show(id: number): Promise<FullMessage | ReturnMessage> {
    try {
      const connection = await db.connect();
      const query = "SELECT * FROM orders WHERE id=$1";
      const response = await connection.query(query, [id]);
      connection.release();
      if (response.rowCount) {
        return successWithData("Order fetched", response.rows[0]);
      } else {
        return errorHandler("Order not found");
      }
    } catch (err) {
      return errorHandler((err as Error).message);
    }
  }

  async create(id: number, status: boolean): Promise<FullMessage | ReturnMessage> {
    try {
      const connection = await db.connect();
      const query = "INSERT INTO orders (user_id, is_complete) VALUES ($1, $2) RETURNING *";
      const response = await connection.query(query, [id, status]);
      connection.release();
      return successWithData("Order created", response.rows[0]);
    } catch (err) {
      return errorHandler((err as Error).message);
    }
  }

  async update(id: number, order: OrderModel): Promise<FullMessage | ReturnMessage> {
    try {
      const connection = await db.connect();
      const query = "UPDATE orders SET user_id=$1, is_complete=$2 WHERE id=$3 RETURNING *";
      const response = await connection.query(query, [order.user_id, order.is_complete, id]);
      connection.release();
      if (response.rowCount) {
        return successWithData("Order updated", response.rows[0]);
      } else {
        return errorHandler("Order not found");
      }
    } catch (err) {
      return errorHandler((err as Error).message);
    }
  }

  async destroy(id: number): Promise<FullMessage | ReturnMessage> {
    try {
      const connection = await db.connect();
      const query = "DELETE FROM orders WHERE id=$1 RETURNING id";
      const response = await connection.query(query, [id]);
      connection.release();
      if (response.rowCount) {
        return successWithData("Order deleted", response.rows[0]);
      } else {
        return errorHandler("Order not found");
      }
    } catch (err) {
      return errorHandler((err as Error).message);
    }
  }

  async addProduct(orderId: number, productId: number, quantity: number): Promise<FullMessage | ReturnMessage> {
    try {
      const connection = await db.connect();
      const query = "SELECT * FROM orders WHERE id=$1";
      const response = await connection.query(query, [orderId]);
      if (response.rowCount) {
        const addProductToOrder = await connection.query(
          "INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
          [orderId, productId, quantity]
        );
        connection.release();
        return successWithData("Product added", addProductToOrder.rows[0]);
      } else {
        connection.release();
        return errorHandler("Order not found");
      }
    } catch (err) {
      return errorHandler((err as Error).message);
    }
  }

  async orderDetails(orderId: number): Promise<FullMessage | ReturnMessage> {
    try {
      const connection = await db.connect();
      const query = "SELECT * FROM orders WHERE id=$1";
      const response = await connection.query(query, [orderId]);
      if (response.rowCount) {
        const productsInOrder = await connection.query(
          `SELECT p.product_id, p.quantity, products.name, products.price FROM orders o 
        JOIN order_products p ON o.id = $1 AND p.order_id = $1 JOIN products ON products.id = p.product_id`,
          [orderId]
        );
        connection.release();
        return successWithData(`Order ${orderId} contains`, productsInOrder.rows);
      } else {
        connection.release();
        return errorHandler("Order not found");
      }
    } catch (err) {
      return errorHandler((err as Error).message);
    }
  }
}

export default Order;
