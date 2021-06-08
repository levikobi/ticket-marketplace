import request from "supertest";
import { app } from "../../app";
import { Order, OrderStatus } from "../../models/order";
import { stripe } from "../../stripe";

jest.mock("../../stripe");

it("returns a 404 when purchasing an order that does not exists", async () => {
    await request(app)
        .post("/api/payments")
        .set("Cookie", global.register())
        .send({
            token: "stripe_token",
            orderId: global.generateId(),
        })
        .expect(404);
});

it("returns a 401 when purchasing an order that does not belong to the user", async () => {
    const order = Order.build({
        id: global.generateId(),
        userId: global.generateId(),
        version: 0,
        price: 20,
        status: OrderStatus.Created,
    });
    await order.save();

    await request(app)
        .post("/api/payments")
        .set("Cookie", global.register())
        .send({
            token: "stripe_token",
            orderId: order.id,
        })
        .expect(401);
});

it("returns a 400 when purchasing a cancelled order", async () => {
    const userId = global.generateId();
    const order = Order.build({
        id: global.generateId(),
        userId: userId,
        version: 0,
        price: 20,
        status: OrderStatus.Cancelled,
    });
    await order.save();

    await request(app)
        .post("/api/payments")
        .set("Cookie", global.register(userId))
        .send({
            orderId: order.id,
            token: "stripe_token",
        })
        .expect(400);
});

it("returns a 201 with valid inputs", async () => {
    const userId = global.generateId();
    const order = Order.build({
        id: global.generateId(),
        userId: userId,
        version: 0,
        price: 20,
        status: OrderStatus.Created,
    });
    await order.save();

    await request(app)
        .post("/api/payments")
        .set("Cookie", global.register(userId))
        .send({
            token: "tok_visa",
            orderId: order.id,
        })
        .expect(201);

    const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0];

    expect(chargeOptions.source).toEqual("tok_visa");
    expect(chargeOptions.amount).toEqual(20 * 100);
    expect(chargeOptions.currency).toEqual("usd");
});
