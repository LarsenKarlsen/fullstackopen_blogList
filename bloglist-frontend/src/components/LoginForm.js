import PropTypes from "prop-types"

const LoginForm = ({
  onSubmit,
  setUsername,
  setPassword,
  username,
  password
}) => (
  <div>
    <form onSubmit={onSubmit}>
      <div>Username:
        <input
          id="loginForm-username"
          type="text"
          name="username"
          onChange={({ target }) => setUsername(target.value)}
          value={username}/>
      </div>
      <div>Password:
        <input
          id="loginForm-password"
          type="password"
          name="password"
          onChange={({ target }) => setPassword(target.value)}
          value={password}/>
      </div>
      <div><input type="submit" value="LogIn" id="loginForm-submitButton"></input></div>
    </form>
  </div>
)

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm