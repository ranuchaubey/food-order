const User = require("../models/user");
const express = require("express");
const router = express.Router();
const Order = require("../models/order");

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    const saveduser = await user.save();
    res.status(200).json(saveduser);
  } catch (error) {
    if (error.code === 11000)
      return res.status(400).send("Email already exists");
    res.status(400).send(error.message);
  }
});

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// get users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false }).populate("orders");
    res.status(200).json(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// get user orders
router.get("/:id/orders", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate("orders");
    res.json( user.orders );
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// update user notifications
router.post("/:id/updateNotifications", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    user.notifications.forEach((notif) => {
      notif.status = "read";
    });
    user.markModified("notifications");
    await user.save();
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e.message);
  }
});
module.exports = router;
