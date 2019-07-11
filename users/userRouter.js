const express = require("express");
const cors = require("cors");
const router = express.Router();
const {
  validateUserId,
  validateUser,
  validatePost
} = require("../middleware/validators.js");

const Users = require("../users/userDb.js");
const Posts = require("../posts/postDb.js");

router.use(express.json());
router.use(cors());

router.use("/:id", validateUserId);

router.post("/", validateUser, async (req, res) => {
  const { name } = req.body;
  try {
    const user = await Users.insert({ name });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "The user could not be added." });
  }
});

router.post("/:id/posts", validatePost, async (req, res) => {
  const user_id = req.user.id;
  try {
    const post = await Posts.insert({ ...req.body, user_id });
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: "The user with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  }
});

router.get("/:id/posts", async (req, res) => {
  try {
    const posts = await Users.getUserPosts(req.user.id);
    if (posts.length) {
      res.status(200).json(posts);
    } else {
      res
        .status(404)
        .json({ message: "No posts were found for the specified user." });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "The posts information could not be retrieved." });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await Users.get();
    if (users.length) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "No users were found." });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "The users information could not be retrieved." });
  }
});

router.get("/:id", (req, res) => {
  res.status(200).json(req.user);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.user;
  try {
    const deleted = await Users.remove(id);
    res.status(200).json(deleted);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "The user could not be removed" });
  }
});

router.put("/:id", validateUser, async (req, res) => {
  const { id } = req.user;
  const { name } = req.body;
  try {
    await Users.update(id, { name });
    res.status(200).json(await Users.getById(id));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "The user information could not be modified." });
  }
});

module.exports = router;

