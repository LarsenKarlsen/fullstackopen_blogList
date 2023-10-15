import { useState } from "react"
import PropTypes from "prop-types"
import { deleteBlog, updateBlog } from "../reducers/blogReducer"
import { useDispatch } from "react-redux"

const Blog = ({ blog, user }) => {
  const [detailsVisibility, setDetailsVisibility] = useState(false)

  const toggleBlogDetails = () => {
    setDetailsVisibility(!detailsVisibility)
  }

  const dispatch = useDispatch()

  const addLike = () => {
    const req = {
      updatedBlog: {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
      },
      id: blog.id,
    }
    dispatch(updateBlog(req))
  }

  const removeBlog = () => {
    if (window.confirm(`Are sure to delete ${blog.title}`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const showDetails = () => {
    return (
      <div>
        <div className="url">
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div className="likes" style={{ display: "inline" }}>
          Likes: {blog.likes}
        </div>
        <div style={{ display: "inline" }}>
          <button onClick={addLike}>Like</button>
        </div>
        <div>Added by: {blog.user.username}</div>
        {user.id === blog.user.id ? (
          <div>
            <button onClick={removeBlog}>Remove</button>
          </div>
        ) : (
          ""
        )}
      </div>
    )
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} by {blog.author}{" "}
        <button onClick={toggleBlogDetails}>
          {detailsVisibility ? "hide" : "show"}
        </button>
      </div>
      {detailsVisibility && showDetails()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
