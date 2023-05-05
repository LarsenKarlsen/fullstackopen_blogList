import { useState } from "react"
import PropTypes from "prop-types"

const Blog = ({
  blog,
  likeBlog,
  delBlog,
  user
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
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }

  const showDetails = () => {
    return (
      <div>
        <div className="url"><a href={blog.url}>{blog.url}</a></div>
        <div className="likes" style={{ display:"inline" }}>Likes: {blog.likes}</div>
        <div style={{ display:"inline" }}><button onClick={addLike}>Like</button></div>
        <div>Added by: {blog.user.username}</div>
        {user.id === blog.user.id ? <div><button onClick={removeBlog}>Remove</button></div>: ""}
      </div>
    )
  }

  return (
    <div style={blogStyle} className="blog">
      <div>{blog.title} by {blog.author} <button onClick={toggleBlogDetails}>{detailsVisibility ? "hide" : "show"}</button></div>
      {detailsVisibility && showDetails()}
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  delBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog