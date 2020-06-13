import { OrderController } from "../controllers/order-controller";
import { ResponseInterceptor } from "../util/response-interceptor";
import { PaymentController } from "../controllers/payment-controller";
import { RefundController } from "../controllers/refund-controller";

export class RoutingComponents extends ResponseInterceptor {
    orderController: OrderController;
    paymentController: PaymentController;
    refundController: RefundController;

    constructor() {
        super();
        this.orderController = new OrderController();
        this.paymentController = new PaymentController();
        this.refundController = new RefundController();
    }

    // page not found.  
    pageNotFound(req, res, next) {
        this.sendErrorResponse(res, {message: "URL does not exist with given method"});
    }

    //create user order
    createOrder(req, res, next) {
        this.orderController.createOrder(req, res, next);
    }

    //get user order list
    getOrdersByUserId(req, res, next){
        this.orderController.getOrdersByUserId(req, res, next);
    }

    //get user order list by orderId
    getOrderByOrderID(req, res, next){
        this.orderController.getOrderByOrderID(req, res, next);
    }

    //create user payment
    capturePayment(req, res, next) {
        this.paymentController.capturePayment(req, res, next);
    }
    
    //get user payment list
    getPaymentList(req, res, next){
        this.paymentController.getPaymentList(req, res, next);
    }
    //get user payment list
    getPaymentsByUserId(req, res, next){
        this.paymentController.getPaymentsByUserId(req, res, next);
    }

    //get user payment list by orderId
    getPaymentByPaymentID(req, res, next){
        this.paymentController.getPaymentByPaymentID(req, res, next);
    }

    //create user payment
    createRefund(req, res, next) {
        this.refundController.createRefund(req, res, next);
    }
}