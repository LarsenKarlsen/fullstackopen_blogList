import { useState, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"

import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import LogoutBtn from "./components/LogoutBtn"

import blogService from "./services/blogs"
import loginService from "./services/login"
import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"

import { setNotification } from "./reducers/notificationReducer"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername("")
      setPassword("")
      blogService.setToken(user.token)
      window.localStorage.setItem("loggedInBlogsAppUser", JSON.stringify(user))
      dispatch(
        setNotification(`${user.username} logged in`)
      )
    } catch (error) {
      dispatch(
        setNotification(error.response.data.error, true)
      )
    }
  }

  const handleNewBlogSubmit = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const response = await blogService.create(newBlog)
      setBlogs(await blogService.getAll())
      dispatch(
        setNotification(`A new blog "${response.title}" by ${response.author} added`)
      )
    } catch (error) {
      dispatch(
        setNotification(error.response.data.error, true)
      )
    }
  }

  const handleLikeBlog = async (newBlog) => {
    try {
      const response = await blogService.update(newBlog)
      setBlogs(await blogService.getAll())
      dispatch(
        setNotification(`You'r like added to blog "${response.title}" by ${response.author}`)
      )
    } catch (error) {
      dispatch(
        setNotification(error.response.data.error, true)
      )
    }
  }

  const handleDeleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(await blogService.getAll())
      dispatch(
        setNotification("Blog removed")
      )
    } catch (error) {
      dispatch(
        setNotification(error.response.data.error, true)
      )
    }
  }

  const handleLogout = () => {
    blogService.setToken(null)
    window.localStorage.removeItem("loggedInBlogsAppUser")
    setUser(null)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInBlogsAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then((blogs) => setBlogs(blogs))
    }
  }, [])

  const blogForm = () => (
    <Togglable buttonLabel={"Add new blog"} ref={blogFormRef}>
      <BlogForm createBlog={handleNewBlogSubmit} />
    </Togglable>
  )

  return (
    <div>
      <Notification />
      {!user && (
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          onSubmit={handleLogin}
        />
      )}
      {user && (
        <div>
          <div>
            {user.username} logged in <LogoutBtn onClick={handleLogout} />
          </div>
          {blogForm()}
          <h2>blogs</h2>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                likeBlog={handleLikeBlog}
                delBlog={handleDeleteBlog}
                user={user}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
