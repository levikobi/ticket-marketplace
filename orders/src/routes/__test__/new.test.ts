import request from "supertest";
import { app } from "../../app";

it("return an error if the ticket does not exists", async () => {
    const ticketId = global.generateId();
    await request(app)
        .post("/api/orders")
        .set("Cookie", global.register())
        .send({ ticketId })
        .expect(404);
});

it("return an error if the ticket is already reserved", async () => {});

it("reserves a ticket", async () => {});
