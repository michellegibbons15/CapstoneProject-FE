import { useState, useEffect } from "react";
import "../../Styles/Community/NewsFeed.css";

export default function NewsFeed() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [editPostId, setEditPostId] = useState(null);
  const [editText, setEditText] = useState("");
  const [menuOpen, setMenuOpen] = useState(null);
  

  useEffect(() => {
    fetch("http://localhost:8081/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.data || []))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const handlePost = () => {
    if (newPost.trim() === "") return;

    const postData = {
      userId: 1,
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
          setPosts([data.data, ...posts]);
          setNewPost("");
        }
      })
      .catch((err) => console.error("Error creating post:", err));
  };

  const handleLike = (postId) => {
    fetch("http://localhost:8081/api/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: 1, postId }),
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

  const handleEdit = (postId, description) => {
    setEditPostId(postId);
    setEditText(description);
    setMenuOpen(null);
  };

  const handleUpdate = () => {
    if (!editText.trim() || editPostId === null) return;

    console.log(`Updating post ${editPostId} with text:`, editText);

    fetch(`http://localhost:8081/api/posts/${editPostId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: editText }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Update response:", data); // Debugging

        if (data.result === 200) {
          setPosts(posts.map((post) =>
            post.id === editPostId ? { ...post, description: editText } : post
          ));
          setEditPostId(null);
          setEditText(""); // Clear input field
        }
      })
      .catch((err) => console.error("Error updating post:", err));
  };

  const handleDelete = (postId) => {
    console.log("Deleting post with ID:", postId);
    fetch(`http://localhost:8081/api/posts/${postId}`, {
      method: "DELETE",
    })
      .then(() => {
        setPosts(posts.filter((post) => post.id !== postId));
      })
      .catch((err) => console.error("Error deleting post:", err));
  };

  return (
    <div className="NewsFeed-container">
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

      {posts.map((post) => (
        <div key={post.id} className="Post-List">
          <div className="post-header">
            <p>Posted by User {post.userId}</p>
            <span className="menu-icon" onClick={() => setMenuOpen(post.id === menuOpen ? null : post.id)}>⋮</span>
            {menuOpen === post.id && (
              <div className="menu-dropdown">
                <button onClick={() => handleEdit(post.id, post.description)}>Edit</button>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              </div>
            )}
          </div>

          <p>{new Date(post.createdAt).toLocaleString()}</p>

          {editPostId === post.id ? (
            <div>
              <textarea value={editText} onChange={(e) => setEditText(e.target.value)} />
              <button onClick={handleUpdate} className="save-btn">Save</button>
            </div>
          ) : (
            <p>{post.description}</p>
          )}

          <div>
            <button className="feed-btn" onClick={() => handleLike(post.id)}>
              ❤️ {post.likes}
            </button>
          </div>

          <div className="Comment-section">
            {post.comments?.map((comment, index) => (
              <p key={index}>
                <span className="user-circle">{comment.userId}</span>
                {comment.content}
              </p>
            ))}

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

