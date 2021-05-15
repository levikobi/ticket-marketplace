import express from "express";

const router = express.Router();

router.get("/api/user/login", (req, res) => {
    res.send("hey there");
});

export { router as loginRouter };
