import request from "supertest";
import { app } from "../../app";

it("responds with details about the current user", async () => {
    const registerResponse = await request(app)
        .post("/api/users/register")
        .send({ email: "test@test.com", password: "password" })
        .expect(201);
    const cookie = registerResponse.get("Set-Cookie");

    const response = await request(app)
        .get("/api/users/current-user")
        .set("Cookie", cookie)
        .send()
        .expect(200);

    expect(response.body.currentUser.email).toEqual("test@test.com");
});
