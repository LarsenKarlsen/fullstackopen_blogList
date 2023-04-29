import { useState } from "react"

const Blog = ({
  blog,
  likeBlog,
  delBlog
}) => {
  const [detailsVisibility, setDetailsVisibility] = useState(false)

  const toggleBlogDetails = () => {
    setDetailsVisibility(!detailsVisibility)
  }

  const addLike = () => {
    const req = {
      updatedBlog: {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        },
      id: blog.id
    }
    likeBlog(req)
  }

  const removeBlog = () => {
    if (window.confirm(`Are sure to delete ${blog.title}`)){
      delBlog(blog.id)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showDetails = () => {
    return (
      <div>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>
          Likes:{blog.likes} <span><button onClick={addLike}>Like</button></span>
        </div>
        <div>Added by: {blog.user.username}</div>
        <div><button onClick={removeBlog}>Remove</button></div>
      </div>
    )
  }
  
  return (
  <div style={blogStyle}>
    <div>{blog.title} by {blog.author} <button onClick={toggleBlogDetails}>{detailsVisibility ? "hide" : "show"}</button></div>
    {detailsVisibility && showDetails()}
  </div>
)}

export default Blog