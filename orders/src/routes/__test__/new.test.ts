import request from "supertest";
import { app } from "../../app";
import { Order, OrderStatus } from "../../models/order";
import { Ticket } from "../../models/ticket";

it("return an error if the ticket does not exists", async () => {
    const ticketId = global.generateId();
    await request(app)
        .post("/api/orders")
        .set("Cookie", global.register())
        .send({ ticketId })
        .expect(404);
});

it("return an error if the ticket is already reserved", async () => {
    const ticket = Ticket.build({
        title: "concert",
        price: 20,
    });
    await ticket.save();

    const order = Order.build({
        ticket,
        userId: global.generateId(),
        status: OrderStatus.Created,
        expiresAt: new Date(),
    });
    await order.save();

    await request(app)
        .post("/api/orders")
        .set("Cookie", global.register())
        .send({ ticketId: ticket.id })
        .expect(400);
});

it("reserves a ticket", async () => {
    const ticket = Ticket.build({
        title: "concert",
        price: 20,
    });
    await ticket.save();

    await request(app)
        .post("/api/orders")
        .set("Cookie", global.register())
        .send({ ticketId: ticket.id })
        .expect(201);
});
