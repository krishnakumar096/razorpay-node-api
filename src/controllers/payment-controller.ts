import { ResponseInterceptor } from "../util/response-interceptor";
import { PaymentModel } from "../models/payment-model";
import { OrderModel } from "../models/order-model";
import { RefundModel } from "../models/refund-model";
import { variableConfig } from "../config/variableConfig";
import { RazorpayUtil } from "../util/razorpay";
const logger = require("../util/logger");


export class PaymentController extends ResponseInterceptor {
    paymentModel: PaymentModel;
    orderModel: OrderModel;
    refundModel: RefundModel;
    razorpayUtil: RazorpayUtil;
    constructor() {
        super();
        this.paymentModel = new PaymentModel();
        this.orderModel = new OrderModel();
        this.refundModel = new RefundModel();
        this.razorpayUtil = new RazorpayUtil();
        this.paymentModel.connection.belongsTo(this.refundModel.connection, { targetKey: "payment_id", foreignKey: "payment_id" });
    }

    async capturePayment(req, res, next) {
        try {
            //verify the signature
            const razorpayResponse: any = await this.razorpayUtil.validateWebhookSignature(req.body, req.headers["x-razorpay-signature"]);

            if (!razorpayResponse) {
                logger.error("Invalid razorpay signature");
                return this.sendErrorResponse(res, { message: "Invalid razorpay signature" });
            }
            logger.info("Razorpay signature verified successfully");

            //fetch the user id from order id
            const paymentResponse = req.body.payload.payment.entity;

            const userOrderdata = await this.orderModel.findOne({ where: { "order_id": paymentResponse.order_id } }).catch((err) => {
                logger.error(`Unable to get payment data from database ${err}`);
                return this.sendErrorResponse(res, variableConfig.internalError);
            });

            //create data for database
            const paymentData = {
                user_id: userOrderdata.user_id,
                order_id: paymentResponse.order_id,
                payment_id: paymentResponse.id,
                entity: paymentResponse.entity,
                amount: paymentResponse.amount,
                currency: paymentResponse.currency,
                receipt: paymentResponse.receipt,
                status: paymentResponse.status,
                method: paymentResponse.method,
                amount_refunded: paymentResponse.amount_refunded,
                refund_status: paymentResponse.refund_status,
                captured: paymentResponse.captured,
                description: paymentResponse.description,
                card_id: paymentResponse.card_id,
                bank: paymentResponse.bank,
                wallet: paymentResponse.wallet,
                vpa: paymentResponse.vpa,
                email: paymentResponse.email,
                contact: paymentResponse.contact,
                notes: paymentResponse.notes,
                fee: paymentResponse.fee,
                tax: paymentResponse.tax,
                error_code: paymentResponse.error_code,
                error_description: paymentResponse.error_description,
                error_source: paymentResponse.error_source,
                error_step: paymentResponse.error_step,
                error_reason: paymentResponse.error_reason,
                updatedAt: paymentResponse.created_at,
                createdAt: paymentResponse.created_at
            };
            await this.paymentModel.insert(paymentData).then((result) => {
                logger.info("successfully payment detail stored");
                return res.status(200).send({ status: "ok" });
            }).catch((err) => {
                logger.error(`Unable to insert payment data in database ${err}`);
                return this.sendErrorResponse(res, variableConfig.internalError);
            });
        }
        catch (error) {
            logger.error(`error during insert payment: ${error}`);
            return this.sendErrorResponse(res, variableConfig.internalError);
        }
    }

    async getPaymentList(req, res, next) {
        try {
            let page = (req.query.page - 1) || 0
            let pageSize = req.query.pageSize || 10
            //fetching data from db
            const userOrderdata = await this.paymentModel.findAll({ attributes: ["order_id", "payment_id", "amount", "status", "method", "fee", "tax", "createdAt"], offset: page * pageSize, limit: pageSize, order: [["createdAt", "DESC"]] });
            logger.info("All data fetched successfully");
            const message = userOrderdata ? "Data found" : "No data found";
            //sending response to client
            return this.sendSuccess(res, message, userOrderdata);
        }
        catch (error) {
            logger.error(`error during get payment list: ${error}`);
            return this.sendErrorResponse(res, variableConfig.internalError);
        }
    }

    async getPaymentsByUserId(req, res, next) {
        try {
            let page = (req.query.page - 1) || 0
            let pageSize = req.query.pageSize || 10
            //fetching data from db
            const userOrderdata = await this.paymentModel.findAll({ where: { user_id: req.params.userId }, attributes: ["order_id", "payment_id", "amount", "status", "method", "fee", "tax", "createdAt"], offset: page * pageSize, limit: pageSize, order: [["createdAt", "DESC"]] });
            logger.info("All data fetched successfully");
            const message = userOrderdata ? "Data found" : "No data found";
            //sending response to client
            return this.sendSuccess(res, message, userOrderdata);
        }
        catch (error) {
            logger.error(`error during get payment list: ${error}`);
            return this.sendErrorResponse(res, variableConfig.internalError);
        }
    }

    async getPaymentByPaymentID(req, res, next) {
        try {
            //fetching payment data from db with refund detail if exist
            const paymentData = await this.paymentModel.findOne({ where: { "payment_id": req.params.paymentId }, include: [{ model: this.refundModel.connection }], raw: false });
            if (!paymentData) {
                return this.sendErrorResponse(res, { http_code: this.RECORD_NOT_FOUND, message: "No data found" });
            }
            logger.info("payment detail data fetched successfully");
            //sending response to client
            return this.sendSuccess(res, "Data found", paymentData);
        }
        catch (error) {
            logger.error(`error during get payment detail: ${error}`);
            return this.sendErrorResponse(res, variableConfig.internalError);
        }
    }
}