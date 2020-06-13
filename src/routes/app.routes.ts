import { RoutingComponents } from "./routing-components";
import { orderSchema } from "../payload-schema/order-schema";
import { refundSchema } from "../payload-schema/refund-schema";
import { SchemaValidator } from "../util/schema-validator";
import { AuthValidator } from "../util/auth-validator";


export class AppRoutes {
  AppGetRoutes: any[];
  AppPostRoutes: any[];
  AppUpdateRoutes: any[];
  AppDeleteRoutes: any[];

  constructor() {
    const routingComponents: RoutingComponents = new RoutingComponents();
    const schemaValidator: SchemaValidator = new SchemaValidator();
    const authValidator: AuthValidator = new AuthValidator();

    /**
    * GET Data APIs list
    */
    this.AppGetRoutes = [
      {
        path: "/user/:userId/orders",
        component: [
          authValidator.authenticationCheck.bind(routingComponents),
          routingComponents.getOrdersByUserId.bind(routingComponents)
        ]
      },
      {
        path: "/user/:userId/orders/:orderId",
        component: [
          authValidator.authenticationCheck.bind(routingComponents),
          routingComponents.getOrderByOrderID.bind(routingComponents)
        ]
      },
      //get payment list for admin
      {
        path: "/payments",
        component: [
          authValidator.authenticationCheck.bind(routingComponents),
          routingComponents.getPaymentList.bind(routingComponents)
        ]
      },
      //get payment list for user
      {
        path: "/user/:userId/payments",
        component: [
          authValidator.authenticationCheck.bind(routingComponents),
          routingComponents.getPaymentsByUserId.bind(routingComponents)
        ]
      },
      {
        path: "/user/:userId/payments/:paymentId",
        component: [
          authValidator.authenticationCheck.bind(routingComponents),
          routingComponents.getPaymentByPaymentID.bind(routingComponents)
        ]
      },
      // If url doesnot exist
      {
        path: "*",
        component: [
          routingComponents.pageNotFound.bind(routingComponents)
        ]
      }
    ];

    /**
    * POST APIs list
    */
    this.AppPostRoutes = [
      {
        path: "/user/:userId/auth/token",
        component: [
          authValidator.authenticationCreate.bind(routingComponents),
        ]
      },
      {
        path: "/user/:userId/orders",
        component: [
          authValidator.authenticationCheck.bind(routingComponents),
          schemaValidator.validateBodyPayload.bind(schemaValidator, orderSchema),
          routingComponents.createOrder.bind(routingComponents)
        ]
      },
      {
        path: "/payments",
        component: [
          routingComponents.capturePayment.bind(routingComponents)
        ]
      },
      {
        path: "/user/:userId/payments/:paymentId/refund",
        component: [
          authValidator.authenticationCheck.bind(routingComponents),
          schemaValidator.validateBodyPayload.bind(schemaValidator, refundSchema),
          routingComponents.createRefund.bind(routingComponents)
        ]
      },
      // If url doesnot exist
      {
        path: "*",
        component: [
          routingComponents.pageNotFound.bind(routingComponents)
        ]
      }
    ];

    /**
     * Update APIs list
     */
    this.AppUpdateRoutes = [
      // If url doesnot exist
      {
        path: "*",
        component: [
          routingComponents.pageNotFound.bind(routingComponents)
        ]
      }
    ];

    /**
     * Deleting APIs list
     */
    this.AppDeleteRoutes = [
      // If url doesnot exist
      {
        path: "*",
        component: [
          routingComponents.pageNotFound.bind(routingComponents)
        ]
      }
    ];
  }

}