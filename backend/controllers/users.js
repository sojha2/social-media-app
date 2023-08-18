const userRouter = require("express").Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

userRouter.get("/", async (request, response, next) => {
  try {
    const users = await User.find({});
    response.json(users);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/", async (request, response, next) => {
  try {
    const { username, name, password } = request.body;

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;

    if (!password.match(passwordRegex)) {
      return response.status(400).json({
        error:
          "Password must contains at least 1 number, 1 letter, and be at least 8 characters long",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({ username, name, passwordHash });
    const savedUser = await newUser.save();

    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
