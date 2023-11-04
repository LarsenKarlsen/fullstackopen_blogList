import { useState } from "react"
import PropTypes from "prop-types"
import { deleteBlog, updateBlog } from "../reducers/blogReducer"
import { useDispatch, useSelector } from "react-redux"

import { Button, Card, Dropdown } from "react-bootstrap"
import {
  HandThumbsUp,
  ThreeDots,
  Trash,
  Eye,
  EyeSlash,
} from "react-bootstrap-icons"

const Blog = ({ blog }) => {
  const [detailsVisibility, setDetailsVisibility] = useState(false)
  const user = useSelector((state) => state.user)

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

  const showDetails = () => {
    return (
      <>
        <Card.Link>{blog.url}</Card.Link>
        <Card.Text className="text-centert">
          <Button onClick={addLike}>
            <HandThumbsUp /> {blog.likes}
          </Button>
        </Card.Text>
        <Card.Text>Added by {blog.user.username}</Card.Text>
      </>
    )
  }

  return (
    <div>
      <Card style={{ width: "18rem" }} className="text-center">
        <Dropdown style={{ textAlign: "right" }}>
          <Dropdown.Toggle
            variant="success"
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "black",
            }}
          >
            <ThreeDots />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={toggleBlogDetails}>
              {detailsVisibility ? <EyeSlash></EyeSlash> : <Eye></Eye>}{" "}
              {detailsVisibility ? "Hide" : "Show"}
            </Dropdown.Item>
            {user.id === blog.user.id ? (
              <>
                <Dropdown.Item onClick={removeBlog}>
                  <Trash /> Remove
                </Dropdown.Item>
              </>
            ) : (
              ""
            )}
          </Dropdown.Menu>
        </Dropdown>
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
          <Card.Subtitle>by {blog.author}</Card.Subtitle>
          {detailsVisibility && showDetails()}
        </Card.Body>
      </Card>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
