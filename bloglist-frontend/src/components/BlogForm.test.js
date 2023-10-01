import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"

describe("<BlogFrorm />", () => {
  let container, mockSubmit

  beforeEach(() => {
    mockSubmit = jest.fn()

    container = render(<BlogForm createBlog={mockSubmit} />).container
  })

  test("<BlogForm /> updates parent state and calls onSubmit", async () => {
    const mockCall = {
      title: "test title",
      url: "test URL",
      author: "test author",
    }

    const user = userEvent.setup()
    const addButton = screen.getByText("Add")

    const inputTitle = container.querySelector("#blogform-title")
    const inputAuthor = container.querySelector("#blogform-author")
    const inputUrl = container.querySelector("#blogform-url")

    await user.type(inputTitle, "test title")
    await user.type(inputAuthor, "test author")
    await user.type(inputUrl, "test URL")
    await user.click(addButton)

    expect(mockSubmit.mock.calls).toHaveLength(1)
    expect(JSON.stringify(mockSubmit.mock.calls[0][0])).toBe(
      JSON.stringify(mockCall)
    )
  })
})
