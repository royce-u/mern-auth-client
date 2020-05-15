// Import packages
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import jwtDecode from 'jwt-decode';

// Resources and custom components
import './App.css';
import Content from './content/Content'
import Footer from './nav/Footer'
import Header from './nav/Header'
import Nav from './nav/Nav'

const App = props => {
  // Declare state variables
  let [user, setUser] = useState(null)

  //useEffect hook (onload)
useEffect(() => {
  decodeToken()
},[]) //empty array, meaning only run this on page load

const updateToken = (newToken) => {
  //set the new token into local storage
  localStorage.setItem('boilerToken', newToken || '')
  //update the state (basically the user info)
  decodeToken()
}

  const decodeToken = () => {
    let token = localStorage.getItem('boilerToken')

    if (token) {
      //decrypt user data from the token
      let decodedUser = jwtDecode(token)
      //if the token is not value or expiration date has passed - user stays logged out
      if (!decodedUser || Date.now() > decodedUser.exp * 1000){
        console.log('Expired or bad token')
        setUser(null)
      }
      else {
        //the user is valid, token is good
        console.log('User and token are good')
        setUser(decodedUser)
      }
    }
    else {
      //no user logged in
      console.log('there was no token')
      setUser(null)
    }
  }

  return (
    <Router>
      <div className="App">
        <Nav user={user} updateToken={updateToken}/>
        <Header />
        <main>
          <Content user={user} updateToken={updateToken}/>
          
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
