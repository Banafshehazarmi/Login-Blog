import React, { useContext, useState } from "react";
import { BlogContext } from "../context/BlogContext";
import { useNavigate } from "react-router-dom";
import postImage1 from "../Images/post1.jpg";
import postImage2 from "../Images/post2.jpg";
import postImage3 from "../Images/post3.jpg";
import "./Home.css";

const staticBlogPosts = [
  {
    id: 1,
    title: "Florence & Art",
    author: "Jane Doe",
    text: "Lorem ipsum dolor sit amet.",
    image: postImage1,
    comments: [],
  },
  {
    id: 2,
    title: "A day in Chicago",
    author: "John Smith",
    text: "Consectetur adipiscing elit.",
    image: postImage2,
    comments: [],
  },
  {
    id: 3,
    title: "Budapest's Danube",
    author: "Alice Johnson",
    text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: postImage3,
    comments: [],
  },
];

function Home({ isLoggedIn }) {
  const { blogs, addComment } = useContext(BlogContext);
  const navigate = useNavigate();
  const [comments, setComments] = useState({});

  const allBlogs = [...staticBlogPosts, ...blogs];

  const handleSubmitComment = (blogId) => {
    if (!isLoggedIn) {
      
      return;
    }
    const commentText = comments[blogId];
    if (!commentText.trim()) {
      
      return;
    }
    addComment(blogId, commentText);
    setComments({ ...comments, [blogId]: "" });
  };

  return (
    <div className="blog-container">
      <h2>Welcome to the Blog!</h2>
      <br /> <br />
      <div className="blog-posts">
        {allBlogs.map((blog) => (
          <div key={blog.id} className="blog-post">
            <h3>{blog.title}</h3>
            <p>Author: {blog.author}</p>
            <p>{blog.text}</p>
            <img
              src={blog.image}
              alt={`Image for ${blog.title}`}
              className="post-image"
            />
            <div>
              {/* Comment Section */}

              {/*<textarea
                className="CommentBox"
                placeholder="Write a comment..."
                value={comments[blog.id] || ""}
                onChange={(e) =>
                  setComments({ ...comments, [blog.id]: e.target.value })
                }
              />*/}
              {/*<button
                className="CommentButton"
                onClick={() => handleSubmitComment(blog.id)}
              >
                Submit Comment
            </button>*/}
              <div className="comment-section">
                {blog.comments.map((comment, index) => (
                  <p key={index} className="comment">
                    {comment}
                  </p>
                ))}
              </div>
            </div>
            <br />
            <button
              className="button-edit"
              onClick={() => navigate(`/blog/${blog.id}`)}
            >
              Edit or write a comment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
