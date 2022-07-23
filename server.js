const express = require("express");
const path = require('path')
const mongoose = require("mongoose");
require("dotenv").config();
require("./connection.js");
const cors = require("cors");
const http = require("http");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: "http://localhost:3000",
  methods: ["GET", "POST", "PATCH", "DELETE"],
});

const userRoutes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const imageRoutes = require("./routes/imageRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/images", imageRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,"frontend","build","index.html"))
  })
} else {
  app.get("/", (req, res) => {
    res.send("<h2>Hello node server</h2>")
  })
}

app.post("/create-payment", async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      payment_method_types: ["card"],
    });
    res.status(200).json(paymentIntent);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
});
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
app.set("socketio", io);
