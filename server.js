const express = require("express");
const cors = require("cors");
const app = express();
const { authenticateToken } = require('./routes/auth');
// Middleware to handle JSON and CORS
app.use(cors());// allows frontend applications to access the server from different origins
app.use(express.json());// converts incoming Json requests to JavaScript objects which can be understood by the server

// Connect auth routes
const authRoutes = require("./routes/auth");//"Give me all the routes defined in auth.js so I can use them here
app.use("/api/auth", authRoutes);// Mount the auth routes at /api/auth means that any request to /api/auth will be handled by the authRoutes

// Connect item routes (protected routes for lost/found items)
const itemRoutes = require("./routes/items");
app.use("/api/items", itemRoutes);
// Simple test route
app.get("/", (req, res) => {
  res.send("Lost & Found API is running");
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
