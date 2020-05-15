// Packages
import React, { useState } from 'react'
import {Redirect} from 'react-router-dom'

const Login = props => {
  // Declare and initialize state variables
  let [email, setEmail] = useState('')
  let [message, setMessage] = useState('')
  let [password, setPassword] = useState('')

  // Event handlers
  const handleSubmit = e => {
    e.preventDefault()
    console.log('submit', email, password)
    // Fetch call to POST data to server side
    fetch(process.env.REACT_APP_SERVER_URL + 'auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('RESPONSE', response)
      //if response isn't a 200 OK - set error message
      if (!response.ok) {
        setMessage(`${response.status}: ${response.statusText}`)
        return
      }
      //we got a good (200) response, we get the token
      response.json().then(result => {

        console.log('result', result)
        props.updateToken(result.token)
      })
    })
    .catch(err => {
      console.log('ERROR SUBMITTING: ',err)
    })
  }
  //if there is a user, redirect to profile page
  if (props.user){
    return <Redirect to="/profile"/>
  }

  return (
    <div>
      <h2>Login</h2>
      <span className="red">{message}</span>
      <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" name="email" onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit">Beam Me Up!</button>
        </form>
    </div>
  )
}

export default Login
