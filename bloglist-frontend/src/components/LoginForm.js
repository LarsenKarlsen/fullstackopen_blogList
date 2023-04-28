const LoginForm = (props) => (
    <div>
        <form onSubmit={props.onSubmit}>
            <div>Username:
                <input
                type="text"
                name="username"
                onChange={({ target }) => props.setUsername(target.value)}
                value={props.username}/>
            </div>
            <div>Password:
                <input
                type="password"
                name="password"
                onChange={({ target }) => props.setPassword(target.value)}
                value={props.password}/>
            </div>
            <div><input type="submit" value="LogIn"></input></div>
        </form>
    </div>
)

export default LoginForm