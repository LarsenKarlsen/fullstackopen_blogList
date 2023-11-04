import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import LoginForm from "./components/LoginForm"
import LogoutBtn from "./components/LogoutBtn"

import blogService from "./services/blogs"
import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"
import { Navbar, Stack, Accordion } from "react-bootstrap"


import BlogList from "./components/BlogList"
import { initializeBlogs } from "./reducers/blogReducer"
import { setUser, userLogout } from "./reducers/userReducer"

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(userLogout())
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInBlogsAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
      dispatch(initializeBlogs())
    }
  }, [])

  const blogForm = () => (
    <>
      <Accordion className="border-0">
        <Accordion.Item className="border-0" eventKey="0">
          <Accordion.Header>
          Add new blog
          </Accordion.Header>
          <Accordion.Collapse eventKey="0">
            <BlogForm />
          </Accordion.Collapse>
        </Accordion.Item>
      </Accordion>
    </>
  )

  return (
    <div className="container">
      <Notification />
      {!user && <LoginForm />}
      {user && (
        <div>
          <Navbar>
            <Stack style={{ width: "100%" }} direction="horizontal" gap={3}>
              <div className="p-2">
                <Navbar.Brand className="p-2">BlogList</Navbar.Brand>
              </div>
              <div className="p-2 ms-auto">
                You logged in as {user.username}
              </div>
              <div className="vr" />
              <div className="p-2">
                <LogoutBtn onClick={handleLogout} />
              </div>
            </Stack>
          </Navbar>
          {blogForm()}
          <BlogList />
        </div>
      )}
    </div>
  )
}

export default App
