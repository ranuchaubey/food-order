const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const User = require("../models/user");

// get products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json(error.message);
  }
});
// create product
router.post("/", async (req, res) => {
  const { name, description, price, category, images: pictures } = req.body;
  try {
    const product = await Product.create({
      name,
      description,
      price,
      category,
      pictures,
    });
    const savedProduct = await product.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(404).json(error.message);
  }
});
// update product
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { name, description, price, category, images: pictures } = req.body;
    const product = await Product.findByIdAndUpdate(id, {
      name,
      description,
      price,
      category,
      pictures,
    });
    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(404).json(error.message);
  }
});
// delete product
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const { user_id } = req.body;
  try {
    const user = await User.findById(user_id);
    if (!user.isAdmin)
      return res.status(401).json({ message: "You don't have permission " });
    await Product.findByIdAndDelete(id);
    const products = await Product.find()
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json(error.message);
  }
});
// get one product
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    const similar = await Product.find({ category: product.category }).limit(5);
    res.status(200).json({ product, similar });
  } catch (error) {
    res.status(404).json(error.messsage);
  }
});
router.get("/category/:category", async (req, res) => {
  const { category } = req.params;
  try {
    let products;
    const sort = { _id: -1 };
    if (category == "all") {
      products = await Product.find().sort(sort);
    } else {
      products = await Product.find({ category }).sort(sort);
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// cart routes
// add to cart
router.post("/add-to-cart", async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    if (user.cart[productId]) {
      userCart[productId] += 1;
    } else {
      userCart[productId] = 1;
    }
    userCart.count += 1;
    userCart.total = Number(userCart.total) + Number(price);
    user.cart = userCart;
    user.markModified ("cart");
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error.message);
  }
});

// increase cart product
router.post("/increase-cart", async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total += Number(price);
    userCart.count += 1;
    userCart[productId] += 1;
    user.cart = userCart;
    user.markModified ("cart");
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error.message);
  }
});
// decrease cart
router.post("/decrease-cart", async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total -= Number(price);
    userCart.count -= 1;
    userCart[productId] -= 1;
    user.cart = userCart;
    user.markModified ("cart");
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error.message);
  }
});
// remove from cart
router.post("/remove-from-cart", async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total -= Number(userCart[productId]) * Number(price);
    userCart.count -= userCart[productId];
    delete userCart[productId];
    user.cart = userCart;
    user.markModified ("cart");
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error.message);
  }
});
module.exports = router;
