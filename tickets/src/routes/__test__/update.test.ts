import request from "supertest";
import { app } from "../../app";
import { natsWrapper } from "../../nats-wrapper";

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

it("returns a 401 if the user does not own the ticket", async () => {
    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", global.register())
        .send({ title: "some title", price: 40 });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set("Cookie", global.register())
        .send({ title: "new title", price: 20 })
        .expect(401);
});

it("returns a 400 if the user provides an invalid title or price", async () => {
    const cookie = global.register();
    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", cookie)
        .send({ title: "some title", price: 40 });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set("Cookie", cookie)
        .send({ title: "", price: 20 })
        .expect(400);

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set("Cookie", cookie)
        .send({ title: "new valid title", price: -3 })
        .expect(400);
});

it("updates the ticket provided valid input", async () => {
    const cookie = global.register();
    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", cookie)
        .send({ title: "some title", price: 40 });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set("Cookie", cookie)
        .send({ title: "new title", price: 3 })
        .expect(200);

    const ticketResponse = await request(app).get(`/api/tickets/${response.body.id}`).send();

    expect(ticketResponse.body.title).toEqual("new title");
    expect(ticketResponse.body.price).toEqual(3);
});

it("publishes an event", async () => {
    const cookie = global.register();
    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", cookie)
        .send({ title: "some title", price: 40 });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set("Cookie", cookie)
        .send({ title: "", price: 20 })
        .expect(400);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});
