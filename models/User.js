const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: Boolean
},
{
  timestamps: true
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin
    },
    process.env.EXPRESS_APP_JWT_PRIVATE_KEY
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateCreateUser(user) {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(user, schema);
}

function validateEditUser(user) {
  const schema = {
    _id: Joi.string(),
    name: Joi.string()
      .min(2)
      .max(50)
      .required()
      .label("Name"),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email()
      .label("Email")
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validateCreate = validateCreateUser;
exports.validateEdit = validateEditUser;
