import { useSelector } from "react-redux"

import Blog from "./Blog"

import { CardGroup } from "react-bootstrap"

const BlogList = () => {
  let blogs = useSelector((state) => {
    if (state.blogs.length > 0) {
      return [...state.blogs].sort((a, b) => b.likes - a.likes)
    }
    return state.blogs
  })

  return (
    <div>
      <h2>Blogs</h2>
      <CardGroup className="d-flex flex-wrap align-content-between gap-3">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </CardGroup>
    </div>
  )
}

export default BlogList
