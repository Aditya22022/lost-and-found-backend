const express = require("express");
const pool = require("../db"); // Import database connection
const { authenticateToken } = require("./auth"); // Import JWT middleware

const router = express.Router();

// =====================
// GET /api/items
// Public route: Anyone can view all items (no authentication required)
// Optional query parameter: ?status=lost or ?status=found
// =====================
router.get("/", async (req, res) => {
  try {
    const { status } = req.query; // Get status from query parameters (e.g., ?status=lost)
    
    // ...inside your GET /api/items route...
let query = `
SELECT items.*, users.name as owner_name, users.email as owner_email
FROM items
LEFT JOIN users ON items.user_id = users.id
`;
// ...rest of the code remains the same...
    let queryParams = [];

    // If status is provided, filter by status
    if (status) {
      query += ` WHERE items.status = $1`; // adds the dynamic status to the query
      queryParams.push(status); // holds value of status for $1
    }

    query += ` ORDER BY items.created_at DESC`; // Show newest items first

    /*  example flow  : SELECT items.*, users.name as owner_name
FROM items
LEFT JOIN users ON items.user_id = users.id
WHERE items.status = 'lost'
ORDER BY items.created_at DESC*/


    const result = await pool.query(query, queryParams);
    
    res.json({
      message: "Items retrieved successfully",
      items: result.rows,
      count: result.rows.length
    });
  } catch (err) {
    console.error("Error fetching items:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// =====================
// POST /api/items
// Protected route: Only logged-in users can add items
// =====================
router.post("/", authenticateToken, async (req, res) => {
  // Get item details from request body
  const { title, description, location, status } = req.body;
  // Get user ID from the JWT token (set by authenticateToken middleware)
  const userId = req.user.userId;

  try {
    // Insert the new item into the database
    const result = await pool.query(
      `INSERT INTO items (title, description, location, status, user_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, description, location, status || 'lost', userId]
    );

    // Respond with the newly created item
    res.status(201).json({
      message: "Item posted successfully",
      item: result.rows[0]
    });
  } catch (err) {
    console.error("Error posting item:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});
// =====================
// DELETE /api/items/:id
// Protected route: Only the author can delete their own item
// =====================
router.delete("/:id", authenticateToken, async (req, res) => {
  const itemId = req.params.id;
  const userId = req.user.userId; // From JWT

  try {
    // Check if the item exists and belongs to the user
    const result = await pool.query(
      "SELECT * FROM items WHERE id = $1 AND user_id = $2",
      [itemId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(403).json({ message: "You can only delete your own items." });
    }

    // Delete the item
    await pool.query("DELETE FROM items WHERE id = $1", [itemId]);
    res.json({ message: "Item deleted successfully." });
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router; 