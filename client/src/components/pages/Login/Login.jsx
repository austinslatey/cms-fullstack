// eslint-disable-next-line no-unused-vars
import React, { useState } from "react"
import { Link } from "react-router-dom";


export default function Login() {

  

  const [formData, setFormData] = useState({
    loginUsername: "", loginEmail: "", loginPassword: ""
  })

  function clearForms() {
    setFormData({ loginUsername: "", loginEmail: "", loginPassword: "" })
  }

  function handleInputChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }


  async function handleLogin(event) {
    event.preventDefault()
    try {
      const response = await fetch("/api/users/login", {
        method: 'POST',
        body: JSON.stringify({
          loginUsername: formData.loginPassword,
          email: formData.loginEmail,
          password: formData.loginPassword
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const result = await response.json()
      clearForms()
      if (result.status === 'success') {
        window.location.href = "/";
      }
    } catch (err) {
      console.log(err.message)
    }
  }
  return (
    <>
      <div className="container bg-dark my-2 login">
        <div className="row justify-content-center py-5">
          <div className="col-md-6">
            <div className="card border-light  text-light text-center">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">Login</h3>
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="loginUsername"
                      value={formData.loginUsername}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email:
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="loginEmail"
                      value={formData.loginEmail}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password:
                    </label>
                    <input
                      type="password"
                      name="loginPassword"
                      className="form-control"
                      value={formData.loginPassword}
                      onChange={handleInputChange}
                      required
                    />

                  </div>
                  <div className="align-items-center justify-content-center">
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </div>
                </form>
                <div className="signup-direct">
                  <h5 className="mt-5 mb-3 text-secondary">Need an account?</h5>
                  <div>
                    <Link to="/signup" className="nav-link">
                      Sign up Instead
                    </Link>
                  </div>
                </div>
                <div>
                  <Link to="/" className="nav-link">
                    Back To Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}