import React, { createContext, useState, useEffect } from "react";
import postImage1 from "../Images/post1.jpg";
import postImage2 from "../Images/post2.jpg";
import postImage3 from "../Images/post3.jpg";

const BlogContext = createContext();

const initialBlogs = [
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

const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const storedBlogs = localStorage.getItem("blogs");
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    } else {
      setBlogs(initialBlogs);
    }
  }, []);

  const addBlog = (newBlog) => {
    const updatedBlogs = [...blogs, newBlog];
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
  };

  const updateBlog = (updatedBlog) => {
    const updatedBlogs = blogs.map((blog) =>
      blog.id === updatedBlog.id ? updatedBlog : blog
    );
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
  };

  const deleteBlog = (id) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
  };

  const addComment = (blogId, comment) => {
    const updatedBlogs = blogs.map((blog) => {
      if (blog.id === blogId) {
        return { ...blog, comments: [...blog.comments, comment] };
      }
      return blog;
    });
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
  };

  return (
    <BlogContext.Provider
      value={{ blogs, addBlog, updateBlog, deleteBlog, addComment }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export { BlogProvider, BlogContext };
