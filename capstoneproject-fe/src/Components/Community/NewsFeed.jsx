import { useState, useEffect } from "react";
import "../../Styles/Community/NewsFeed.css";

export default function NewsFeed() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  // fetch all the posts
  useEffect(() => {
    fetch("http://localhost:8081/api/posts")
      .then((res) => res.json())
      .then((data) => {
        console.log("fetched posts:", data);
        setPosts(data.data || []);
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  // Function to handle posting new content
  const handlePost = () => {
    if (newPost.trim() === "") return;

    const postData = {
      userId: 1, // Replace with the actual logged-in user ID
      description: newPost,
      imageUrl: null,
    };

    fetch("http://localhost:8081/api/posts/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result === 201) {
          setPosts([data.data, ...posts]); // Add new post to state
          setNewPost("");
        }
      })
      .catch((err) => console.error("Error creating post:", err));
  };

  // Function to handle liking a post
  const handleLike = (postId) => {
    fetch("http://localhost:8081/api/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: 1, postId }), // Replace with actual userId
    })
      .then((res) => res.json())
      .then(() => {
        setPosts(
          posts.map((post) =>
            post.id === postId ? { ...post, likes: post.likes + 1 } : post
          )
        );
      })
      .catch((err) => console.error("Error liking post:", err));
  };

  // Function to handle adding a comment
  const handleComment = (postId, commentText) => {
    if (commentText.trim() === "") return;
  
    const commentData = { userId: 1, postId, content: commentText };
  
    fetch("http://localhost:8081/api/comments/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("API response:", response);
        if (response.result === 200) {
          // Instead of manually adding the comment, refetch posts
          fetch("http://localhost:8081/api/posts")
            .then((res) => res.json())
            .then((data) => setPosts(data.data || []))
            .catch((err) => console.error("Error fetching posts:", err));
        }
      })
      .catch((err) => console.error("Error adding comment:", err));
  };

  return (
    <div className="NewsFeed-container">
      {/* Post Input Box */}
      <div className="personal-post">
        <textarea
          placeholder="What's on your mind?"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button className="feed-btn" onClick={handlePost}>
          Post
        </button>
      </div>
  
      {/* Posts List */}
      {posts.map((post) => (
        <div key={post.id} className="Post-List">
          <p>Posted by User {post.userId}</p>
          <p>{new Date(post.createdAt).toLocaleString()}</p>
          <p>{post.description}</p>
  
          {/* Like Button */}
          <div>
            <button className="feed-btn" onClick={() => handleLike(post.id)}>
              ❤️ {post.likes}
            </button>
          </div>
  
          {/* Comments Section */}
          <div className="Comment-section">
            {post.comments?.map((comment, index) => (
              <p key={index}>
                {/* User Circle */}
                <span className="user-circle">{comment.userId}</span>
                {comment.content}
              </p>
            ))}
  
            {/* Comment Input */}
            <input
              type="text"
              placeholder="Write a comment..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleComment(post.id, e.target.value);
                  e.target.value = "";
                }
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

