import { useState } from "react"

const Blog = ({blog}) => {
  const [detailsVisibility, setDetailsVisibility] = useState(false)

  const toggleBlogDetails = () => {
    setDetailsVisibility(!detailsVisibility)
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
          Likes:{blog.likes} <span><button>Like</button></span>
        </div>
      </div>
    )
  }
  
  return (
  <div style={blogStyle}>
    <div>{blog.title} by {blog.author}</div>
    <button onClick={toggleBlogDetails}>{detailsVisibility ? "hide" : "show"}</button>
    {detailsVisibility && showDetails()}
  </div>
)}

export default Blog