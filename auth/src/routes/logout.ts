import express from "express";

const router = express.Router();

router.post("/api/user/logout", (req, res) => {
    res.send("hey there");
});

export { router as logoutRouter };
