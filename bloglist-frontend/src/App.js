import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import LoginForm from "./components/LoginForm"
import LogoutBtn from './components/LogoutBtn'

import blogService from './services/blogs'
import loginService from "./services/login"
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({message:"", error:false, show:false})

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})
      setUser(user)
      setUsername("")
      setPassword("")
      blogService.setToken(user.token)
      window.localStorage.setItem("loggedInBlogsAppUser", JSON.stringify(user))
      setNotification({message:`${user.username} logged in`, error:false, show:true})
      setTimeout(()=>{
        setNotification({message:"", error:false, show:false})
      }, 5000)

    } catch(error) {
      setNotification({message:error.response.data.error, error:true, show:true})
      setTimeout(()=>{
        setNotification({message:"", error:false, show:false})
      }, 5000)
    }
  }

  const handleNewBlogSubmit = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const response = await blogService.create(newBlog)
      setBlogs(await blogService.getAll())
      setNotification({message:`A new blog "${response.title}" by ${response.author} added`, error:false, show:true})
      setTimeout(()=>{
        setNotification({message:"", error:false, show:false})
      }, 5000)
    } catch (error) {
      setNotification({message:error.response.data.error, error:true, show:true})
      setTimeout(()=>{
        setNotification({message:"", error:false, show:false})
      }, 5000)
    }
  }

  const handleLikeBlog = async (newBlog) => {
    try {
      const response = await blogService.update(newBlog)
      setBlogs(await blogService.getAll())
      setNotification({message:`You'r like added to blog "${response.title}" by ${response.author}`, error:false, show:true})
      setTimeout(()=>{
        setNotification({message:"", error:false, show:false})
      }, 5000)
    } catch (error) {
      setNotification({message:error.response.data.error, error:true, show:true})
      setTimeout(()=>{
        setNotification({message:"", error:false, show:false})
      }, 5000)
    }
  }

  const handleDeleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(await blogService.getAll())
      setNotification({message:`Blog removed`, error:false, show:true})
      setTimeout(()=>{
        setNotification({message:"", error:false, show:false})
      }, 5000)
    } catch (error) {
      setNotification({message:error.response.data.error, error:true, show:true})
      setTimeout(()=>{
        setNotification({message:"", error:false, show:false})
      }, 5000)
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
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
    }
  }, [])

  const blogForm = () => (
    <Togglable buttonLabel={"Add new blog"} ref={blogFormRef}>
      <BlogForm createBlog={handleNewBlogSubmit}/>
    </Togglable>
  )

  return (
    <div>
      {notification.show && <Notification message={notification.message} error={notification.error}/>}
      {!user && <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} onSubmit={handleLogin}/>}
      {user && 
      <div>
        <div>{user.username} logged in <LogoutBtn onClick={handleLogout}/></div>
        {blogForm()}
        <h2>blogs</h2>
        {
          blogs
          .sort((a,b)=>b.likes-a.likes)
          .map(blog =>
            <Blog key={blog.id} blog={blog} likeBlog={handleLikeBlog} delBlog={handleDeleteBlog}/>
          )
        }
      </div>
      }
    </div>
  )
}

export default App