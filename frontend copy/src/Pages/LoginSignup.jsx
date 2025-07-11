import React from 'react'
import './css/loginsignup.css'
import { useState } from 'react';

const LoginSignup = () => {

  const [state, setState] = useState("Login");
  const [formData, setformData] = useState({
    username: "",
    password: "",
    email: ""
  })
  const changeHandler = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value })
  }

  const login = async () => {
    console.log("login done", formData);
    let responseData;
    await fetch('https://e-comm-backend-wvjk.onrender.com/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data)

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    }
    else{
  
      alert(responseData.error)
    }


  }

  const signup = async () => {
    console.log("sign up done", formData);
    let responseData;
    await fetch('https://e-comm-backend-wvjk.onrender.com/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data)

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    }
    else{

      alert(responseData.errors)
    }
  }


  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-field">
          {state === "Sign Up" ? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' /> : <></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
        </div>
        <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
        {state === "Sign Up" ? <p className='loginsignup-login'>Alredy have an account? <span onClick={() => { setState("Login") }}>Login here</span></p> : <p className='loginsignup-login'>Create an account? <span onClick={() => { setState("Sign Up") }}>Click here</span></p>}

        <div className='loginsignup-agree'>
          <input type="checkbox" name='' id='' />
          <p className='agree'>By continuing I agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
