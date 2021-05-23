import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import jwt from "jsonwebtoken";

declare global {
    namespace NodeJS {
        interface Global {
            register(): string[];
        }
    }
}

let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = "JWT_KEY";

    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.register = () => {
    const payload = {
        id: "on3jk42bo0423n",
        email: "test@test.com",
    };
    const token = jwt.sign(payload, process.env.JWT_KEY!);
    const session = { jwt: token };
    const sessionJSON = JSON.stringify(session);
    const base64 = Buffer.from(sessionJSON).toString("base64");
    return [`express:sess=${base64}`];
};
