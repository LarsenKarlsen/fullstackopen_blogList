import PropTypes from "prop-types"
import { Button } from "react-bootstrap"
import { BoxArrowRight } from "react-bootstrap-icons"

const style = {
  width: "50px",
  height: "50px",
  padding: "7px 10px",
  borderRadius: "35px",
  fontSize: "20px",
  textAlign: "center",
}

const LogoutBtn = ({ onClick }) => (
  <>
    <Button variant="outline-secondary" onClick={onClick} style={style}>
      <div className="d-flex justify-content-center">
        <BoxArrowRight />
      </div>
    </Button>
  </>
)

LogoutBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default LogoutBtn
