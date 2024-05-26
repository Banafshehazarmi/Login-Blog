import React, { useContext, useState, useEffect } from "react";
import { BlogContext } from "../context/BlogContext";
import { useNavigate, useParams } from "react-router-dom";
import "./Blog.css";

function Blog({ isLoggedIn }) {
  const { blogs, addBlog, updateBlog, deleteBlog, addComment } =
    useContext(BlogContext);
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [comments, setComments] = useState({});
  const [editCommentId, setEditCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  useEffect(() => {
    if (id) {
      const blogToEdit = blogs.find((blog) => blog.id === parseInt(id));
      if (blogToEdit) {
        setCurrentBlog(blogToEdit);
        setTitle(blogToEdit.title);
        setAuthor(blogToEdit.author);
        setText(blogToEdit.text);
        setImage(blogToEdit.image);
        setIsEditing(true);
      }
    }
  }, [id, blogs]);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isLoggedIn) {
      setShowLoginMessage(true);
      return;
    }
    if (!title.trim() || !author.trim() || !text.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const newBlog = {
      id: isEditing ? currentBlog.id : blogs.length + 1,
      title,
      author,
      text,
      image: image ? URL.createObjectURL(image) : currentBlog.image,
      comments: currentBlog ? currentBlog.comments : [],
    };

    if (isEditing) {
      updateBlog(newBlog);
      setIsEditing(false);
    } else {
      addBlog(newBlog);
    }

    setTitle("");
    setAuthor("");
    setText("");
    setImage(null);
    navigate("/");
  };

  const handleEdit = (id) => {
    if (!isLoggedIn) {
      setShowLoginMessage(true);
      return;
    }
    const blogToEdit = blogs.find((blog) => blog.id === id);
    if (blogToEdit) {
      setCurrentBlog(blogToEdit);
      setTitle(blogToEdit.title);
      setAuthor(blogToEdit.author);
      setText(blogToEdit.text);
      setImage(blogToEdit.image);
      setIsEditing(true);
    }
  };

  const handleDelete = (id) => {
    deleteBlog(id);
  };

  const handleSubmitComment = (blogId) => {
    if (!isLoggedIn) {
      setShowLoginMessage(true);
      return;
    }
    const commentText = comments[blogId];
    if (!commentText.trim()) {
      return;
    }
    addComment(blogId, commentText);
    setComments({ ...comments, [blogId]: "" });
  };

  const handleEditComment = (blogId, commentId, commentText) => {
    setEditCommentId(commentId);
    setEditedComment(commentText);
  };

  const handleSaveEditedComment = (blogId, commentId) => {
    const updatedComments = blogs
      .find((blog) => blog.id === blogId)
      .comments.map((comment, index) =>
        index === commentId ? editedComment : comment
      );
    const updatedBlog = blogs.find((blog) => blog.id === blogId);
    updatedBlog.comments = updatedComments;
    updateBlog(updatedBlog);
    setEditCommentId(null);
    setEditedComment("");
  };

  const handleCancelEditComment = () => {
    setEditCommentId(null);
    setEditedComment("");
  };

  return (
    <div className="blog-form-container">
      <h2>{isEditing ? "Edit Blog" : "Create a Blog"}</h2>
      {showLoginMessage && (
        <div className="login-message">
          <p>You need to be logged in to create or edit a blog.</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="form-group">
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Author:{" "}
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Text:
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Image:
          <input type="file" onChange={handleImageChange} accept="image/*" />
          {image && (
            <img
              src={
                typeof image === "string" ? image : URL.createObjectURL(image)
              }
              alt="Selected"
              className="selected-image"
            />
          )}
        </label>
        <br />
        <button type="submit">
          {isEditing ? "Update Blog" : "Create a Blog"}
        </button>
      </form>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <h3>{blog.title}</h3>
            <p>Author: {blog.author}</p>
            <p>{blog.text}</p>
            <img
              src={blog.image}
              alt={`Image for ${blog.title}`}
              className="blog-image"
            />
            <div>
              <textarea
                className="placeholder"
                placeholder="Write a comment..."
                value={comments[blog.id] || ""}
                onChange={(e) =>
                  setComments({ ...comments, [blog.id]: e.target.value })
                }
              />
              <button
                className="submit-comment"
                onClick={() => handleSubmitComment(blog.id)}
              >
                Submit Comment
              </button>
              <div className="comment-section">
                {blog.comments.map((comment, commentIndex) => (
                  <div key={commentIndex} className="comment">
                    {editCommentId === commentIndex ? (
                      <>
                        <textarea
                          value={editedComment}
                          onChange={(e) => setEditedComment(e.target.value)}
                        />
                        <button
                          onClick={() =>
                            handleSaveEditedComment(blog.id, commentIndex)
                          }
                        >
                          Save
                        </button>
                        <button onClick={handleCancelEditComment}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <p>{comment}</p>
                        <button
                          className="edit-comment"
                          onClick={() =>
                            handleEditComment(blog.id, commentIndex, comment)
                          }
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <br />
            <button onClick={() => handleEdit(blog.id)} className="button">
              Edit
            </button>
            <button onClick={() => handleDelete(blog.id)} className="button">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Blog;
