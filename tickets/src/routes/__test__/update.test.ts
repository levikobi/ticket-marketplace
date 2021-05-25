import request from "supertest";
import { app } from "../../app";

it("returns a 404 if the provided id does not exist", async () => {
    const id = global.generateId();
    await request(app)
        .put(`/api/tickets/${id}`)
        .set("Cookie", global.register())
        .send({ title: "some title", price: 49 })
        .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
    const id = global.generateId();
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({ title: "some title", price: 49 })
        .expect(401);
});

it("returns a 401 if the user does not own the ticket", async () => {});
it("returns a 400 if the user provides an invalid title or price", async () => {});
it("updates the ticket provided valid input", async () => {});
