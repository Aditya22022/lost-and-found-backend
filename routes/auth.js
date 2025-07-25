const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Import JWT for creating secure tokens
const pool = require("../db"); // Import database connection
//signup rpute for the Lost & Found application
// This route handles user registration by checking if the user already exists, hashing the password, and inserting the new user into the database.
const router = express.Router();

// Signup route: POST /api/auth/signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body; // Destructure the request body to get name, email, and password

  try {
    // 1. Check if user already exists
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });// If user exists, return an error
    }

    // 2. Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insert user into the 'users' table
    await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login route: POST /api/auth/login
// This route handles user authentication by checking email/password and returning a JWT token
router.post("/login", async (req, res) => {
  const { email, password } = req.body; // Get email and password from request body

  try {
    // 1. Check if user exists in database
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    
    // If no user found with this email, return error
    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 2. Get the user data from the first (and only) row
    const userData = user.rows[0];

    // 3. Compare the provided password with the hashed password in database
    // bcrypt.compare() returns true if passwords match, false otherwise
    const isPasswordValid = await bcrypt.compare(password, userData.password);
    
    // If password doesn't match, return error
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 4. Create a JWT token for the authenticated user
    // JWT token contains user information and is signed with a secret key
    // This token will be used to identify the user in future requests
    const token = jwt.sign(
      { 
        userId: userData.id, 
        email: userData.email,
        name: userData.name 
      },
      process.env.JWT_SECRET, // Use secret from environment variable
      { expiresIn: "24h" } // Token expires in 24 hours
    );

    // 5. Send success response with token and user info
    res.json({
      message: "Login successful",
      token: token, // This token should be stored in frontend (localStorage/cookies)
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ================= JWT Authentication Middleware =================
// This middleware checks if the request has a valid JWT token
// Use this to protect routes that require the user to be logged in

/**
 * Middleware to authenticate JWT token
 * Usage: Add as the first argument to any route you want to protect
 * Example: router.post('/protected', authenticateToken, (req, res) => {...})
 */
function authenticateToken(req, res, next) {
  // Get the token from the Authorization header (format: 'Bearer <token>')
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // If no token is provided, deny access
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // If token is invalid or expired
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
    // Attach user info from token to request object
    req.user = user;
    next(); // Continue to the protected route
  });
}

// Export the middleware so it can be used in other files
module.exports = router;
module.exports.authenticateToken = authenticateToken;
