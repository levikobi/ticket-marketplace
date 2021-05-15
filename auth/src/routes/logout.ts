import express from "express";

const router = express.Router();

router.post("/api/users/logout", (req, res) => {
    res.send("hey there");
});

export { router as logoutRouter };
