// eslint-disable-next-line no-unused-vars
import React, { useState } from "react"
import { Link } from "react-router-dom";
import "./Signup.css";



export default function Signup() {

  const [formData, setFormData] = useState({
    signupUsername: "", signupEmail: "", signupPassword: ""
  })

  function clearForms() {
    setFormData({ signupUsername: "",  signupEmail: "", signupPassword: "" })
  }

  function handleInputChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  async function handleSignup(event) {
    event.preventDefault()
    try {
      const response = await fetch("/api/users", {
        method: 'POST',
        body: JSON.stringify({
          username: formData.signupUsername,
          email: formData.signupEmail,
          password: formData.signupPassword
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      // eslint-disable-next-line no-unused-vars
      const result = await response.json()
      clearForms()
      if (result.status === 'success') {
        window.location.href = "/";
      }
    } catch (err) {
      console.log(err)
    }
    // display a message to the user
  }
  return (
    <>
      <div className="container bg-dark my-2 signup">
        <div className="row justify-content-center py-5">
          <div className="col-md-6">
            <div className="card border-light  text-light text-center">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">Sign Up</h3>
                <form onSubmit={handleSignup}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="signupUsername"
                      value={formData.signupUsername}
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
                      name="signupEmail"
                      value={formData.signupEmail}
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
                      name="signupPassword"
                      className="form-control"
                      value={formData.signupPassword}
                      onChange={handleInputChange}
                      required
                    />

                  </div>
                  <div className="align-items-center justify-content-center">
                    <button type="submit" className="btn btn-primary">
                      Sign Up
                    </button>
                  </div>
                </form>
                <div className="signup-direct">
                  <h5 className="mt-5 mb-3 text-secondary">Already have an account?</h5>
                  <div>
                    <Link to="/login" className="nav-link">
                      Login Instead
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