import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from "./components/LoginForm"
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (event) => {
    event.preventDefault()
    console.log(`Username: ${username} Password ${password}`)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} onSubmit={handleLogin}/>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App