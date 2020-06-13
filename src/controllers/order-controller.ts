import { ResponseInterceptor } from "../util/response-interceptor";
import { OrderModel } from "../models/order-model";
import { variableConfig } from "../config/variableConfig";
import { RazorpayUtil } from "../util/razorpay";
const logger = require("../util/logger");
const shortid = require("shortid");


export class OrderController extends ResponseInterceptor {
    orderModel: OrderModel;
    razorpayUtil: RazorpayUtil;
    constructor() {
        super();
        this.orderModel = new OrderModel();
        this.razorpayUtil = new RazorpayUtil();
    }

    async createOrder(req, res, next) {
        try {
            const options = {
                amount: req.body.amount,
                currency: req.body.currency || "INR",
                receipt: shortid.generate(),
                payment_capture: 1
            };
            const razorpayResponse: any = await this.razorpayUtil.createOrder(options);
            logger.info(`Response from razorpay API ${razorpayResponse}`);
            //create data for database
            const data = {
                user_id: req.params.userId,
                order_id: razorpayResponse.id,
                entity: razorpayResponse.entity,
                amount: razorpayResponse.amount,
                currency: razorpayResponse.currency,
                receipt: razorpayResponse.receipt,
                status: razorpayResponse.status,
                updateAt: razorpayResponse.created_at,
                createdAt: razorpayResponse.created_at,
            };
            this.orderModel.insert(data).then((result) => {
                const response = {
                    order_id: razorpayResponse.id,
                    amount: razorpayResponse.amount,
                    currency: razorpayResponse.currency
                };
                return this.sendSuccess(res, "Successfully order created", response);
            }).catch((err) => {
                logger.error(`Unable to insert order data in database ${err}`);
                return this.sendErrorResponse(res, variableConfig.internalError);
            });
        }
        catch (error) {
            logger.error(`error during insert order: ${error}`);
            return this.sendErrorResponse(res, variableConfig.internalError);
        }
    }

    async getOrdersByUserId(req, res, next) {
        try {
            let page = (req.query.page - 1) || 0
            let pageSize = req.query.pageSize || 10
            //fetching data from db
            const userOrderdata = await this.orderModel.findAll({ where: { user_id: req.params.userId }, offset: page * pageSize, limit: pageSize, order:[ [ "createdAt", "DESC" ]] });
            logger.info("All data fetched successfully");
            const message = userOrderdata ? "Data found" : "No data found";
            //sending response to client
            return this.sendSuccess(res, message, userOrderdata);
        }
        catch (error) {
            logger.error(`error during get user trade list: ${error}`);
            return this.sendErrorResponse(res, variableConfig.internalError);
        }
    }

    async getOrderByOrderID(req, res, next) {
        try {
            //fetching data from db
            const userOrderdata = await this.orderModel.findOne({ where: { "user_id": req.params.userId, "order_id": req.params.orderId } });
            if (!userOrderdata) {
                return this.sendErrorResponse(res, { http_code: this.RECORD_NOT_FOUND, message: "No data found" });
            }
            logger.info("data fetched successfully");
            //sending response to client
            return this.sendSuccess(res, "Data found", userOrderdata);
        }
        catch (error) {
            logger.error(`error during get user trade list: ${error}`);
            return this.sendErrorResponse(res, variableConfig.internalError);
        }
    }
}