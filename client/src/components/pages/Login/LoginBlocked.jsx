import { Link } from "react-router-dom"

export default function LoginBlocker() {
  return (
    <div className="border mx-4 mb-2 bg-dark p-2 text-center text-light">
      <h1>Login to create a new post!</h1>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <Link to="/Login">
            <button type="submit" className="btn btn-secondary mt-2">
              Login
            </button>

          </Link>
        </div>
        <div className="col-md-6">
          <Link to="/signup">
            <button type="submit" className="btn btn-secondary mt-2">
              Signup
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}