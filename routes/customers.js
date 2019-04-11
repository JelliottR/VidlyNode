const { User, validateEdit } = require("../models/user");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");
const express = require("express");

const router = express.Router();

router.get("/", auth, isAdmin, async (req, res) => {
  const customers = await User.find()
    .select("-__v -password")
    .sort("name");
  res.send(customers);
});

router.get("/:id", auth, isAdmin, async (req, res) => {
  const customer = await User.findById(req.params.id);

  if (!customer) return res.status(404).send("A customer with that ID could not found.");

  res.send(customer);
  }
);

router.put("/:id", auth, isAdmin, async (req, res) => {
  const { error } = validateEdit(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    { new: true }
  );

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

router.delete("/:id", auth, isAdmin, async (req, res) => {
  const customer = await User.findByIdAndRemove(req.params.id);

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

router.get("/:id", auth, isAdmin, async (req, res) => {
  const customer = await User.findById(req.params.id).select("-__v");

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

module.exports = router;
