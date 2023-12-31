const express = require("express");
const { getAllBlogs , getMyBlogs,newBlog , deleteBlog, updateBlog , getBlog , upVote , commentBlog} = require("../controllers/blogController");
const { isAuthenticatedUser} = require("../middleware/auth");

const router = express.Router();

router.route("/allblogs").get(getAllBlogs);
router.route("/myblogs").get(isAuthenticatedUser , getMyBlogs);
router.route("/blog/:id").post(getBlog);
router.route("/blog/up/:id").post(upVote);
router.route("/blog/comment/:id").post(commentBlog);
router.route("/blog/new").post(isAuthenticatedUser, newBlog);
router.route("/blog/delete").delete(isAuthenticatedUser, deleteBlog);
router.route("/blog/update").put(isAuthenticatedUser, updateBlog);

module.exports = router