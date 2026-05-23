const Blog = require("../models/Blog");

// CREATE BLOG
const createBlog = async (req, res) => {
  try {
    if (req.body.featured === true) {
      await Blog.updateMany({}, { featured: false });
    }

    const blog = await Blog.create({
      ...req.body,
      author: req.user.id,
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL BLOGS
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email");

    res.json(blogs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE BLOG
const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "name email",
    );
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE BLOG
const updateBlog = async (req, res) => {
  try {
    if (req.body.featured === true) {
      await Blog.updateMany({}, { featured: false });
    }

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    if (
      blog.author._id
        ? blog.author._id.toString() !== req.user.id
        : blog.author.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE BLOG
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "name email",
    );

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    if (
      blog.author._id
        ? blog.author._id.toString() !== req.user.id
        : blog.author.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
};
