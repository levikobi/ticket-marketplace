import express from "express";

const router = express.Router();

router.get("/api/user/current-user", (req, res) => {
    res.send("hey there");
});

export { router as currentUserRouter };
