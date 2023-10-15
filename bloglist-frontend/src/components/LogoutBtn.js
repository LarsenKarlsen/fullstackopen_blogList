import PropTypes from "prop-types"

const LogoutBtn = ({ onClick }) => (
  <>
    <button onClick={onClick}>Logout</button>
  </>
)

LogoutBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default LogoutBtn
