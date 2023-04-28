import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import LoginForm from "./components/LoginForm"
import LogoutBtn from './components/LogoutBtn'

import blogService from './services/blogs'
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(`Username: ${username} Password ${password}`)

    try {
      const user = await loginService.login({username, password})
      setUser(user)
      setUsername("")
      setPassword("")
      blogService.setToken(user.token)
      window.localStorage.setItem("loggedInBlogsAppUser", JSON.stringify(user))
    } catch(error) {
      console.log(error)
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

  return (
    <div>
      
      {!user && <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} onSubmit={handleLogin}/>}
      {user && 
      <div>
        <div>{user.username} logged in <LogoutBtn onClick={handleLogout}/></div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
      }
    </div>
  )
}

export default App