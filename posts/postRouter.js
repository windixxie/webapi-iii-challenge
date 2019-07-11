const express = require("express");
const cors = require("cors");
const router = express.Router();
const { validatePost, validatePostId } = require("../middleware/validators.js");

const Posts = require("../posts/postDb.js");

router.use(express.json());
router.use(cors());

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.get();
    if (posts.length) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: "No posts were found." });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "The posts information could not be retrieved." });
  }
});

router.use("/:id", validatePostId);

router.get("/:id", (req, res) => {
  res.status(200).json(req.post);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.post;
  try {
    const deleted = await Posts.remove(id);
    res.status(200).json(deleted);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "The post could not be removed" });
  }
});

router.put("/:id", validatePost, async (req, res) => {
  const { id } = req.post;
  const { text } = req.body;
  try {
    await Posts.update(id, { text });
    res.status(200).json(await Posts.getById(id));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "The post information could not be modified." });
  }
});

module.exports = router;
