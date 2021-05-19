import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { loginRouter } from "./routes/login";
import { logoutRouter } from "./routes/logout";
import { registerRouter } from "./routes/register";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.set("trust proxy", true); // In order to trust Ingress-Nginx
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== "test",
    })
);

app.use(currentUserRouter);
app.use(loginRouter);
app.use(logoutRouter);
app.use(registerRouter);

app.all("*", async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
