import { useState } from "react"

const BlogForm = ({
  createBlog
}) => {
  const [newBlog, setNewBlog] = useState({ title: "", url: "", author: "" })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({ title: "", url: "", author: "" })
  }

  return(
    <div>
      <form onSubmit={addBlog}>
        <h3>Add new blog</h3>
        <div>Title: <input
          type="text"
          value={newBlog.title}
          onChange={({ target }) => setNewBlog({ title: target.value, url: newBlog.url, author: newBlog.author })}
        /></div>
        <div>Author: <input
          type="text"
          value={newBlog.author}
          onChange={({ target }) => setNewBlog({ title: newBlog.title , url: newBlog.url, author: target.value })}
        /></div>
        <div>URL: <input
          type="text"
          value={newBlog.url}
          onChange={({ target }) => setNewBlog({ title: newBlog.title, url: target.value, author: newBlog.author })}
        /></div>
        <div><input type="submit" value="Add"/></div>
      </form>
    </div>
  )}

export default BlogForm