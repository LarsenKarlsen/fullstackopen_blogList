import { userLogin } from "../reducers/userReducer"
import { useDispatch } from "react-redux"
import { useState } from "react"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(userLogin({ username, password }))
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input
            id="loginForm-username"
            type="text"
            name="username"
            onChange={({ target }) => setUsername(target.value)}
            value={username}
          />
        </div>
        <div>
          Password:
          <input
            id="loginForm-password"
            type="password"
            name="password"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />
        </div>
        <div>
          <input type="submit" value="LogIn" id="loginForm-submitButton"></input>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
