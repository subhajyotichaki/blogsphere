const authMiddleware = require("../middleware/authMiddleware");

const express = require("express");

const router = express.Router();

const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

// CREATE + GET ALL
router.route("/").post(authMiddleware, createBlog).get(getBlogs);

// GET SINGLE + UPDATE + DELETE
router
  .route("/:id")
  .get(getBlog)
  .put(authMiddleware, updateBlog)
  .delete(authMiddleware, deleteBlog);
module.exports = router;
