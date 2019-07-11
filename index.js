// code away!
const express = require("express");
const port = 4000;

const logger = require("./middleware/logger.js");
const userRouter = require("./users/userRouter.js");
const postRouter = require("./posts/postRouter.js");

const server = express();

server.use(logger);

server.get("/", (req, res) => {
  res.status(200).send(`
    <h2>Node Blog API</h2>
    <p>Welcome to the Node Blog API</p>
  `);
});

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

///