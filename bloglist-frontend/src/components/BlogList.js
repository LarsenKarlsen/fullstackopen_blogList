import { useSelector } from "react-redux"

import Blog from "./Blog"

const BlogList = (user) => {
  let blogs = useSelector(state => {
    if (state.blogs.length > 0 ) {
      return [...state.blogs].sort((a,b) => b.likes - a.likes)
    }
    return state.blogs
  })

  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  )
}

export default BlogList
