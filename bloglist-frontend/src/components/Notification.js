const errorStyle = {
    color:"red",
    border:"5px solid red",
    fontSize: "32px",
    marginBottom:"25px",
    backgroundColor:"lightgray"
}
const okStyle = {    
    color:"green",
    border:"5px solid green",
    fontSize: "32px",
    marginBottom:"25px",
    backgroundColor:"lightgray"
}

const Notification = props => {
    let style = okStyle
    if (props.error) {
        style = errorStyle
    }
    return (
    <div style={style}>{props.message}</div>
    )
}

export default Notification