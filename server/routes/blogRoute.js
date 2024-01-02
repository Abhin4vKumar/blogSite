const express = require("express");
const { getAllBlogs , getMyBlogs,newBlog , deleteBlog, updateBlog , getBlog , upVote , commentBlog , deleteComment} = require("../controllers/blogController");
const { isAuthenticatedUser} = require("../middleware/auth");

const router = express.Router();

router.route("/allblogs").get(getAllBlogs);
router.route("/myblogs").get(isAuthenticatedUser , getMyBlogs);
router.route("/blog/:id").get(getBlog);
router.route("/blog/up/:id").get(isAuthenticatedUser,upVote);
router.route("/blog/comment/:id").post(isAuthenticatedUser,commentBlog);
router.route("/blog/comment/del/:id/:cid").get(isAuthenticatedUser,deleteComment);
router.route("/blog/new").post(isAuthenticatedUser, newBlog);
router.route("/blog/delete/:id").get(isAuthenticatedUser, deleteBlog);
router.route("/blog/update/:id").post(isAuthenticatedUser, updateBlog);

module.exports = router