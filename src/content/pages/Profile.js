import React, { useEffect, useState } from 'react'
import {Redirect} from 'react-router-dom'

const Profile = props => {
  let [secretMessage, setSecretMessage] = useState('')

  useEffect(()=> {
    //Get the token from local storage
    let token = localStorage.getItem('boilerToken')
    console.log(token)
    //Make a call to a protected route
    fetch(process.env.REACT_APP_SERVER_URL + 'profile',{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Response: ',response)
      //make sure we got a good response
      if (!response.ok) {
        setSecretMessage('Nice try!')
        return
      }
      //we did get a good response
      response.json()
      .then(result => {
        console.log(result)
        setSecretMessage('Yellow!')
      })

    })
    .catch(err => {
      console.log(err)
      setSecretMessage('No message for you')
    })
  })

  if (!props.user) {
    return <Redirect  to="/login"/>
  }
  return (
    <div>
      <h2>{props.user.firstname}</h2>
      {secretMessage}
    </div>
  )
}

export default Profile
