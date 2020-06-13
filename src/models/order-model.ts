const Sequelize = require("sequelize");
import { Model } from "./Model";


export class OrderModel extends Model {
  constructor() {
    super("razorpay_order", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: Sequelize.INTEGER,
      order_id: Sequelize.STRING,
      entity: Sequelize.STRING,
      amount: Sequelize.INTEGER,
      receipt: Sequelize.STRING,
      currency: Sequelize.STRING,
      status: Sequelize.STRING,
      createdAt: { type: Sequelize.DATE, field: "created_at", default: Sequelize.DATE},
      updatedAt: { type: Sequelize.DATE, field: "updated_at" ,default: Sequelize.DATE}
    },true);
  }

}
