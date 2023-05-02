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
          type="text"
          name="username"
          onChange={({ target }) => setUsername(target.value)}
          value={username}/>
      </div>
      <div>Password:
        <input
          type="password"
          name="password"
          onChange={({ target }) => setPassword(target.value)}
          value={password}/>
      </div>
      <div><input type="submit" value="LogIn"></input></div>
    </form>
  </div>
)

export default LoginForm