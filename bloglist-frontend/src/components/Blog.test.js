import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe("<Blog />", () => {
  let container
  let mockLikeClickHandler
  let mockDeleteClickHandler

  beforeEach(() => {
    const testBlog = {
      author:"test author",
      title: "test title",
      url: "test url",
      likes: 42,
      user:{ username:"test username" }
    }
    mockLikeClickHandler = jest.fn()
    mockDeleteClickHandler = jest.fn()

    container = render(<Blog  blog={testBlog} likeBlog={mockLikeClickHandler} delBlog={mockDeleteClickHandler}/>).container
  })

  test("render content of Blog component", () => {
    const div = container.querySelector(".blog")
    expect(div).toHaveTextContent("test title by test author")
  })

  test("blog's URL and number of likes are shown when the button controlling the shown details has been clicked", async () => {
    const user = userEvent.setup()
    const button = screen.getByText("show")
    await user.click(button)

    const div = container.querySelector(".blog")
    const urlElement = div.querySelector(".url")
    const likesElements = div.querySelector(".likes")

    expect(urlElement).toHaveTextContent("test url")
    expect(likesElements).toHaveTextContent("Likes: 42")
  })

  test("if the like button is clicked twice, the event handler the component received as props is called twice", async() => {
    const user = userEvent.setup()
    const button = screen.getByText("show")
    await user.click(button)

    const likeButton = screen.getByText("Like")
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLikeClickHandler.mock.calls).toHaveLength(2)
  })
})

