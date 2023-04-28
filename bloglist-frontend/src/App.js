import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from "./components/LoginForm"
import blogService from './services/blogs'
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, saveUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(`Username: ${username} Password ${password}`)

    try {
      const user = await loginService.login({username, password})
      saveUser(user)
      setUsername("")
      setPassword("")
      console.log(user)
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      
      {!user && <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} onSubmit={handleLogin}/>}
      {user && 
      <div>
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