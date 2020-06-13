const Sequelize = require("sequelize");
import { Model } from "./Model";


export class RefundModel extends Model {
    constructor() {
        super("refund", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            refund_id: Sequelize.STRING,
            payment_id: Sequelize.STRING,
            entity: Sequelize.STRING,
            amount: Sequelize.INTEGER,
            receipt: Sequelize.STRING,
            currency: Sequelize.STRING,
            status: Sequelize.STRING,
            notes: Sequelize.JSON,
            acquirer_data: Sequelize.JSON,
            speed_processed: Sequelize.STRING,
            speed_requested: Sequelize.STRING,
            createdAt: { type: Sequelize.DATE, field: "created_at", default: Sequelize.DATE },
            updatedAt: { type: Sequelize.DATE, field: "updated_at", default: Sequelize.DATE }
        }, true);
    }

}
