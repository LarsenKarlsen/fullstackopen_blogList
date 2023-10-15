import { useSelector } from "react-redux"

const errorStyle = {
  color: "red",
  border: "5px solid red",
  fontSize: "32px",
  marginBottom: "25px",
  backgroundColor: "lightgray",
}
const okStyle = {
  ...errorStyle,
  color: "green",
  border: "5px solid green",
}

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  let style = okStyle
  if (notification.error) {
    style = errorStyle
  }

  return (
    <>
      {notification.show && (
        <div style={style} id="notification-message">
          {notification.message}
        </div>
      )}
    </>
  )
}

export default Notification
