import { useState } from "react"
import { useDispatch } from "react-redux"

import { addBlog } from "../reducers/blogReducer"

const BlogForm = () => {
  const [newBlog, setNewBlog] = useState({ title: "", url: "", author: "" })
  const dispatch = useDispatch()

  const handleNewBlogSubmit = (event) => {
    event.preventDefault()
    dispatch(addBlog(newBlog))
    setNewBlog({ title: "", url: "", author: "" })
  }

  return (
    <div>
      <form onSubmit={handleNewBlogSubmit}>
        <h3>Add new blog</h3>
        <div>
          Title:{" "}
          <input
            type="text"
            value={newBlog.title}
            id="blogform-title"
            onChange={({ target }) =>
              setNewBlog({
                title: target.value,
                url: newBlog.url,
                author: newBlog.author,
              })
            }
          />
        </div>
        <div>
          Author:{" "}
          <input
            type="text"
            value={newBlog.author}
            id="blogform-author"
            onChange={({ target }) =>
              setNewBlog({
                title: newBlog.title,
                url: newBlog.url,
                author: target.value,
              })
            }
          />
        </div>
        <div>
          URL:{" "}
          <input
            type="text"
            value={newBlog.url}
            id="blogform-url"
            onChange={({ target }) =>
              setNewBlog({
                title: newBlog.title,
                url: target.value,
                author: newBlog.author,
              })
            }
          />
        </div>
        <div>
          <input type="submit" value="Add" id="blogform-submit" />
        </div>
      </form>
    </div>
  )
}

export default BlogForm
