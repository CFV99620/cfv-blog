import { useEffect, useState } from "react";
import api from "../api/api";

function PostList() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/api/posts/list")
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Posts</h2>

      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default PostList;