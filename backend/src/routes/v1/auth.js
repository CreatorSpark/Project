const express = require("express");
const router = express.Router();
const {
    loginController,
    registerController,
} = require("../../controllers/auth");
const { aiController } = require("../../../script/reccomendation.js");
const { booking } = require("../../controllers/booking.js");

router.get("/login", (req, res) => {
    console.log(".login");
    res.status(200).json({ message: "Login route" });
});

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/travel", aiController);
router.post("/book", booking)

module.exports = router;
