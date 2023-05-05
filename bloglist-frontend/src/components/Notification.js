import PropTypes from "prop-types"

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

const Notification = ({ error, message }) => {
  let style = okStyle
  if (error) {
    style = errorStyle
  }
  return (
    <div style={style} id="notification-message">{message}</div>
  )
}

Notification.propTypes = {
  error: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
}

export default Notification