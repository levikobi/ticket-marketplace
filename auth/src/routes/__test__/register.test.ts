import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful registration", async () => {
    return request(app)
        .post("/api/users/register")
        .send({ email: "test@test.com", password: "password" })
        .expect(201);
});
