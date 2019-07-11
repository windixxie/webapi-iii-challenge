import React, { useState, useEffect } from "react";
import axios from "axios";

const ListPosts = ({ id }) => {
  const [posts, storePosts] = useState([]); // stores the list of posts from the server

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const results = await axios.get(
          `http://localhost:4000/api/users/${id}/posts`
        );
        storePosts(results.data);
      } catch (error) {
        console.log("Error retrieving posts");
      }
    };
    fetchPosts();
  }, [id]);

  return (
    <div className="posts">
      {posts.length ? (
        posts.map(post => <h3 key={post.id}>{post.text}</h3>)
      ) : (
        <p>No posts to show</p>
      )}
    </div>
  );
};

export default ListPosts;
