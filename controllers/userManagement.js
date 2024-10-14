const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
// const authMiddleware = require('../middleware/authMiddleware');

// Register Route
const RegisterUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    } else {
      user = new User({ username, email, password });

      // Hash the password before saving the user
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save the new user to the database
      await user.save();

      // Create a payload for JWT
      const payload = { userId: user.id };

      // Generate a JWT token
      const token = await jwt.sign(payload, "Naveen", {
        expiresIn: "1h",
      });

      // Send the response with the token and success message
      return res.status(201).json({
        msg: "User registered successfully",
        token,
      });
    }
  } catch (err) {
    // Handle server errors and send a 500 response
    console.error("Error during registration:", err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};

const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const payload = { userId: user.id };
    const token = jwt.sign(payload, "Naveen", {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

module.exports = { RegisterUser ,LoginUser};
