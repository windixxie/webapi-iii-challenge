const Users = require("../users/userDb.js");
const Posts = require("../posts/postDb.js");

function validateUser(req, res, next) {
  // console.log("validateUser");
  const { body } = req;
  if (Object.keys(body).length === 0) {
    res.status(400).json({ message: "Missing user data" });
  } else if (!body.name) {
    res.status(400).json({ message: "Missing required name field" });
  }
  next();
}

async function validateUserId(req, res, next) {
  // console.log("validateUserId");
  const { id } = req.params;
  try {
    const user = await Users.getById(id);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({ message: `Invalid user id: ${id}` });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

async function validatePostId(req, res, next) {
  // console.log("validatePostId");
  const { id } = req.params;
  try {
    const post = await Posts.getById(id);
    if (post) {
      req.post = post;
      next();
    } else {
      res.status(400).json({ message: `Invalid post id: ${id}` });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

function validatePost(req, res, next) {
  // console.log("validatePost");
  const { body } = req;
  if (Object.keys(body).length === 0) {
    res.status(400).json({ message: "Missing post data" });
  } else if (!body.text) {
    res.status(400).json({ message: "Missing required text field" });
  } else {
    next();
  }
}

module.exports = { validateUserId, validateUser, validatePost, validatePostId };
