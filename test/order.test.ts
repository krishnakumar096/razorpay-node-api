import { agent as request } from "supertest";
import { expect } from "chai";
const app = require("../src/app");
import { appConfig } from "../src/config/appConfig";
const baseurl = `http://localhost:${appConfig.server.port}`;
let access_token = "";


describe("POST /trades", () => {
    //call token api using secret key
    before(async function () {
        console.log("=====================================");
        
        const res = await request(baseurl).post("user/1/auth/token").send({
                accessKey: appConfig.security.jwt.secretKey
            });
            console.log("==============", res);

            expect(res.status).to.equal(200);
            
            access_token = res.body.access_token;
    });

    // // unit testing for post
    // it("should always pass", async function () {
    //     const res = await request(baseurl)
    //     .post("user/1/orders")
    //     .set({ "Authorization": `Bearer ${access_token}` })
    //     .send({
    //         "amount": 280,
    //         "currency": 'INR',
    //     });
    //     expect(res.status).to.equal(200);
    //     expect(res.body).to.be.an("object");
    // });
});

// describe("GET /users/{userID}/orders", () => {
//     it("should always pass", async function () {
//         //test the this api with given user trade data
//         const res = await request(baseurl).get(`/user/1/orders`).set({ "Authorization": `Bearer ${access_token}` });
//         expect(res.status).to.equal(200);
//         expect(res.body).to.be.an("object");
//         expect(res.body.data).to.be.an("object");
//     });
// });

// describe("GET /users/{userID}/orders", () => {
//     it("should always pass", async function () {
//         // fetch trade data from db
//         const response = await request(baseurl).get("/user/1/orders").set({ "Authorization": `Bearer ${access_token}` });

//         //test the this api with given user trade data
//         const res = await request(baseurl).get(`/user/1/orders/${response.body.data[0]["order_id"]}`).set({ "Authorization": `Bearer ${access_token}` });
//         expect(res.status).to.equal(200);
//         expect(res.body).to.be.an("object");
//         expect(res.body.data).to.be.an("object");
//     });
// });