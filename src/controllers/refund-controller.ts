import { ResponseInterceptor } from "../util/response-interceptor";
import { RefundModel } from "../models/refund-model";
import { PaymentModel } from "../models/payment-model";
import { variableConfig } from "../config/variableConfig";
import { RazorpayUtil } from "../util/razorpay";
const logger = require("../util/logger");


export class RefundController extends ResponseInterceptor {
    refundModel: RefundModel;
    paymentModel: PaymentModel;
    razorpayUtil: RazorpayUtil;
    constructor() {
        super();
        this.refundModel = new RefundModel();
        this.paymentModel = new PaymentModel();
        this.razorpayUtil = new RazorpayUtil();
    }

    async createRefund(req, res, next) {
        try {
            //fetching data from db
            const paymentdata = await this.paymentModel.findOne({ where: { "payment_id": req.params.paymentId, "status": "captured" } });
            if (!paymentdata) {
                return this.sendErrorResponse(res, { message: "Invalid payment id" });
            }
            //call razorpay API
            const options = {
                payment_id: req.params.paymentId,
                amount: req.body.amount,
            };
            const razorpayResponse: any = await this.razorpayUtil.refund(options);

            //create data for database
            const data = {
                refund_id: razorpayResponse.id,
                entity: razorpayResponse.entity,
                amount: razorpayResponse.amount,
                currency: razorpayResponse.currency,
                status: razorpayResponse.status,
                payment_id: razorpayResponse.payment_id,
                notes: razorpayResponse.notes,
                receipt: razorpayResponse.receipt,
                acquirer_data: razorpayResponse.acquirer_data,
                speed_processed: razorpayResponse.speed_processed,
                speed_requested: razorpayResponse.speed_requested,
                updateAt: razorpayResponse.created_at,
                createdAt: razorpayResponse.created_at,
            };
            this.refundModel.insert(data).then((result) => {
                const response = {
                    refund_id: razorpayResponse.id,
                    amount: razorpayResponse.amount,
                    currency: razorpayResponse.currency,
                };
                return this.sendSuccess(res, "Successfully refunded", response);
            }).catch((err) => {
                logger.error(`Unable to insert refund data in database ${err}`);
                return this.sendErrorResponse(res, variableConfig.internalError);
            });
        }
        catch (error) {
            logger.error(`error during refund: ${error}`);
            return this.sendErrorResponse(res, variableConfig.internalError);
        }
    }
}
