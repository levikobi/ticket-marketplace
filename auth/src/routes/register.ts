import express from "express";

const router = express.Router();

router.post("/api/user/register", (req, res) => {
    res.send("hey there");
});

export { router as registerRouter };
