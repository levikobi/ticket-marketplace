import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful registration", async () => {
    return request(app)
        .post("/api/users/register")
        .send({ email: "test@test.com", password: "password" })
        .expect(201);
});

it("returns a 400 with an invalid email", async () => {
    return request(app)
        .post("/api/users/register")
        .send({ email: "test.com", password: "password" })
        .expect(400);
});

it("returns a 400 with an invalid password", async () => {
    return request(app)
        .post("/api/users/register")
        .send({ email: "test@test.com", password: "p" })
        .expect(400);
});

it("returns a 400 with missing email or password", async () => {
    await request(app).post("/api/users/register").send({ email: "test@test.com" }).expect(400);
    await request(app).post("/api/users/register").send({ password: "password" }).expect(400);
});
