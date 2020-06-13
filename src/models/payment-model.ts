const Sequelize = require("sequelize");
import { Model } from "./Model";


export class PaymentModel extends Model {
  constructor() {
    super("payment", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: Sequelize.INTEGER,
      order_id: Sequelize.STRING,
      payment_id: Sequelize.STRING,
      entity: Sequelize.STRING,
      amount: Sequelize.INTEGER,
      currency: Sequelize.STRING,
      status: Sequelize.STRING,
      method: Sequelize.STRING,
      amount_refunded: Sequelize.STRING,
      refund_status: Sequelize.STRING,
      captured: Sequelize.STRING,
      description: Sequelize.STRING,
      card_id: Sequelize.STRING,
      bank: Sequelize.STRING,
      wallet: Sequelize.STRING,
      vpa: Sequelize.STRING,
      email: Sequelize.STRING,
      contact: Sequelize.STRING,
      notes: Sequelize.JSON,
      fee: Sequelize.INTEGER,
      tax: Sequelize.INTEGER,
      error_code: Sequelize.STRING,
      error_description: Sequelize.STRING,
      error_source: Sequelize.STRING,
      error_step: Sequelize.STRING,
      error_reason: Sequelize.STRING,
      createdAt: { type: Sequelize.DATE, field: "created_at", default: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE, field: "updated_at", default: Sequelize.DATE }
    }, true);
  }

}
