import express from "express";
import { json } from "body-parser";

import { currentUserRouter } from "./routes/current-user";
import { loginRouter } from "./routes/login";
import { logoutRouter } from "./routes/logout";
import { registerRouter } from "./routes/register";
import { errorHandler } from "./middlewares/error-handler";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(loginRouter);
app.use(logoutRouter);
app.use(registerRouter);

app.use(errorHandler);

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
