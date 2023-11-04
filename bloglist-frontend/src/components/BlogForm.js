import { useState } from "react"
import { useDispatch } from "react-redux"
import { useField } from "../hooks"
import { Form, Button } from "react-bootstrap"

import { addBlog } from "../reducers/blogReducer"

const BlogForm = () => {
  const title = useField("text")
  const author = useField("text")
  const url = useField("text")
  const [newBlog, setNewBlog] = useState({ title: "", url: "", author: "" })
  const dispatch = useDispatch()

  const handleNewBlogSubmit = (event) => {
    event.preventDefault()
    setNewBlog({ title: title.value, url: url.value, author: author.value })
    dispatch(addBlog(newBlog))
    setNewBlog({ title: "", url: "", author: "" })
  }

  return (
    <Form className="border-0" onSubmit={handleNewBlogSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type={title.type}
          onChange={title.onChange}
          placeholder="Blog title"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Author</Form.Label>
        <Form.Control
          type={author.type}
          onChange={author.onChange}
          placeholder="Blog author"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>URL</Form.Label>
        <Form.Control
          type={url.type}
          onChange={url.onChange}
          placeholder="Blog URL address"
        />
      </Form.Group>
      <Button variant="outline-primary" type="submit">
        Submit
      </Button>
      <Button variant="outline-danger" onClick={() => document.querySelector(".accordion-button").click()}>
        Cancel
      </Button>
    </Form>
  )
}

export default BlogForm
