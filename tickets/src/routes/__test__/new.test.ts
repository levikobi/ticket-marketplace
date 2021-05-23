import request from "supertest";
import { app } from "../../app";

it("has a route handler listening to /api/tickets for post requests", async () => {
    const response = await request(app).post("/api/tickets").send({});

    expect(response.status).not.toEqual(404);
});

it("can be accessed if the user is signed in", async () => {
    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", global.register())
        .send({});

    expect(response.status).not.toEqual(401);
});

it("can not be accessed if the user is signed out", async () => {
    await request(app).post("/api/tickets").send({}).expect(401);
});

it("returns an error if an invalid title is provided", async () => {
    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.register())
        .send({ title: "", price: 10 })
        .expect(400);

    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.register())
        .send({ price: 10 })
        .expect(400);
});

it("returns an error if an invalid price is provided", async () => {
    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.register())
        .send({ title: "some title", price: -1 })
        .expect(400);

    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.register())
        .send({ title: "some title" })
        .expect(400);
});

it("create a ticket with valid inputs", async () => {
    // add in a check to make sure a ticket was saved

    await request(app).post("/api/tickets").send({ title: "some title", price: 20 }).expect(201);
});
