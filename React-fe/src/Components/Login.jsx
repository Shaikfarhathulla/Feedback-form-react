import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const userData = useState()
  const handleEmailChange = (event) => {
    setEmail(event.target.value)

  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)

  }
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault()
    const loginBody = {
      email: email,
      password: password
    }
    try {
      const userData = await axios.post('http://localhost:8080/login', loginBody)
      localStorage.setItem('id', userData.data.id)
      localStorage.setItem('username', userData.data.username)
      localStorage.setItem('email', userData.data.email)
      localStorage.setItem('role', userData.data.role)
      navigate('/feedback')

    } catch (error) {
      console.log(error)
    }



  }
  return (
    <div className="background-img login-page">
      <main className="form-signin text-center bg-white p-4">
        <div className='text-center'>
          <h1>Login</h1>
        </div>
        <form className="p-2" onSubmit={handleSubmit}>

          <div className="form-floating mt-4">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="email"
              onChange={handleEmailChange}

            />
            <label htmlFor="floatingInput">Email address</label>
          </div>

          <div className="form-floating mt-2">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="password"
              onChange={handlePasswordChange}

            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className='text-center mt-4'>
            <button onClick={handleSubmit}
              className=" btn btn-outline-primary btn-lg w-100"
              type="submit" >
              Login
            </button>
          </div>

        </form>
      </main>
    </div>
  )
}

export default Login
