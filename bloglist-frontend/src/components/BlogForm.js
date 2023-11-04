/* eslint-disable no-unused-vars */
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useField } from "../hooks"
import { Form, Button } from "react-bootstrap"

import { addBlog } from "../reducers/blogReducer"

const BlogForm = () => {
  const title = useField("text")
  const author = useField("text")
  const url = useField("text")
  const formFields = [title, author, url]
  const dispatch = useDispatch()

  const handleNewBlogSubmit = (event) => {
    event.preventDefault()
    const newBlog = { title: title.value, url: url.value, author: author.value }
    dispatch(addBlog(newBlog))
    formFields.forEach(element => {
      element.reset()
    })
  }

  return (
    <Form className="border-0" onSubmit={handleNewBlogSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type={title.type}
          onChange={title.onChange}
          value={title.value}
          placeholder="Blog title"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Author</Form.Label>
        <Form.Control
          type={author.type}
          onChange={author.onChange}
          value={author.value}
          placeholder="Blog author"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>URL</Form.Label>
        <Form.Control
          type={url.type}
          onChange={url.onChange}
          value={url.value}
          placeholder="Blog URL address"
        />
      </Form.Group>
      <Button variant="outline-primary" type="submit" className="me-2 mt-2">
        Submit
      </Button>
      <Button variant="outline-danger" className="me-2 mt-2" onClick={() => document.querySelector(".accordion-button").click()}>
        Cancel
      </Button>
    </Form>
  )
}

export default BlogForm
