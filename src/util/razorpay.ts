import Razorpay = require("razorpay");
import { appConfig } from "../config/appConfig";
const logger = require("../util/logger");
const crypto = require("crypto");


export class RazorpayUtil {

    rzp = new Razorpay({
        key_id: appConfig.razorpay.keyId,
        key_secret: appConfig.razorpay.keySecret
    });

    createOrder(params: any) {
        return new Promise((resolve, reject) => {
            this.rzp.orders.create({
                amount: params.amount,
                currency: params.currency,
                receipt: params.receipt,
                payment_capture: params.payment_capture,
                notes: params.notes
            }).then((data) => {
                resolve(data);
            }).catch((error) => {
                logger.error(error);
                reject(error);
            });
        });
    }

    fetchOrders(orderId: string) {
        return new Promise((resolve, reject) => {
            this.rzp.orders.fetch(orderId).then((data) => {
                resolve(data);
            }).catch((error) => {
                logger.error(error);
                reject(error);
            });

        });
    }

    fetchAllOrders(params: any) {
        return new Promise((resolve, reject) => {
            this.rzp.orders.fetch.all({
                from: params.from,
                to: params.to,
                count: params.count,
                skip: params.skip,
                authorized: params.authorized,
                receipt: params.receipt

            }).then((data) => {
                resolve(data);
            }).catch((error) => {
                logger.error(error);
                reject(error);
            });

        });
    }

    validateWebhookSignature(body, signature) {

        /*
         * Verifies webhook signature
         *
         * @param {String} request body
         * @param {String} signature
         * @param {String} secret
         *
         * @return {Boolean}
         */

        const shasum = crypto.createHmac("sha256", appConfig.security.jwt.secretKey);
        shasum.update(JSON.stringify(body));
        const digest = shasum.digest("hex");

        return digest === signature;
    }

    fetchOrdersPayment(orderId: any) {
        return new Promise((resolve, reject) => {
            this.rzp.orders.fetchPayment(orderId).then((data) => {
                resolve(data);
            }).catch((error) => {
                logger.error(error);
                reject(error);
            });

        });
    }

    payment(params: any) {
        return new Promise((resolve, reject) => {
            this.rzp.payment.all({
                from: params.from,
                to: params.to,
                count: params.count,
                skip: params.skip
            }).then((data) => {
                resolve(data);

            }).catch((error) => {
                logger.error(error);
                reject(error);
            });

        });

    }

    paymentFetch(paymentId: string) {
        return new Promise((resolve, reject) => {
            this.rzp.payments.fetch(paymentId).then((data) => {
                resolve(data);

            }).catch((error) => {
                logger.error(error);
                reject(error);
            });

        });
    }

    paymentCapture(paymentId: string, amount: number, currency: string) {
        return new Promise((resolve, reject) => {
            this.rzp.payments.capture(paymentId, amount, currency).then((data) => {
                resolve(data);
            }).catch((error) => {
                logger.error(error);
                reject(error);
            });

        });

    }

    refund(data: any) {
        return new Promise((resolve, reject) => {
            this.rzp.payments.refund(data.payment_id, { amount: data.amount, notes: {} }).then((data) => {
                resolve(data);
            }).catch((error) => {
                logger.error(error);
                reject(error);
            });

        });
    }

    refundAll(paymentId: string) {
        return new Promise((resolve, reject) => {
            this.rzp.payments.refund.all({
                paymentId: "",
                from: 1298,
                to: 8794,
                count: 3,
                skip: 0
            }).then((data) => {
                resolve(data);
            }).catch((error) => {
                logger.error(error);
                reject(error);
            });

        });
    }

    fetchRefund(refundId: string, productId: string) {
        return new Promise((resolve, reject) => {
            this.rzp.payments.refund.all({
                productId: ""
            }).then((data) => {
                resolve(data);
            }).catch((error) => {
                logger.error(error);
                reject(error);
            });

        });
    }

    bankTransfer(paymentId: string) {
        return new Promise((resolve, reject) => {
            this.rzp.payments.bankTransfer(paymentId).then((data) => {
                resolve(data);
            }).catch((error) => {
                logger.error(error);
                reject(error);
            });

        });
    }

    // Fetch all transfers
    transfers(params: any) {
        return new Promise((resolve, reject) => {
            this.rzp.transfers.all({ paymentId: params.paymentId }).then((data) => {
                resolve(data);
            }).catch((error) => {
                logger.error(error);
                reject(error);
            });

        });
    }
    // Fetch transfer by ID
    fetchTransfer(transferId: string) {
        return new Promise((resolve, reject) => {
            this.rzp.transfers.fetch(transferId).then((data) => {
                resolve(data);
            }).catch((error) => {
                logger.error(error);
                reject(error);
            });

        });
    }
    // Edit transfer attributes
    editTransfer(transferId: string, params: any) {
        return new Promise((resolve, reject) => {
            this.rzp.transfers.edit(transferId, {
                on_hold: params.on_hold,
                on_hold_until: params.on_hold_until,
                notes: params.notes
            }).then((data) => {
                resolve(data);
            }).catch((error) => {
                logger.error(error);
                reject(error);
            });

        });
    }
    // Create a new direct transfer
    directTransfers(params: any) {
        return new Promise((resolve, reject) => {
            this.rzp.transfers.edit({ params }).then((data) => {
                resolve(data);
            }).catch((error) => {
                logger.error(error);
                reject(error);
            });

        });
    }
    // Create a transfer from a payment
    transferFromPayment(paymentId: string, params: any) {
        return new Promise((resolve, reject) => {
            this.rzp.payments.transfer(paymentId, params).then((data) => {
                resolve(data);
            }).catch((error) => {
                logger.error(error);
                reject(error);
            });

        });
    }

    // Reverse a transfer
    reverseTransfer(transferId: string, params: any) {
        return new Promise((resolve, reject) => {
            this.rzp.payments.transfers(transferId, {
                amount: params.amount,
                currency: params.currency,
                notes: params.notes
            }).then((data) => {
                resolve(data);
            }).catch((error) => {
                logger.error(error);
                reject(error);
            });

        });
    }


    webhoooks(body: string, signature: string, secret: string) {
        return new Promise((resolve, reject) => {
            Razorpay.validateWebhookSignature(body, signature, secret).then((data) => {
                resolve(data);
            }).catch((error) => {
                logger.error(error);
                reject(error);
            });

        });
    }
}
