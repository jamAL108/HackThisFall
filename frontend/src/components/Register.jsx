/* eslint-disable no-unused-vars */

// SIGNUP COMPONENT

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import '../css/auth.css'
import { ColorRing } from 'react-loader-spinner'
import { AlertCircle } from 'lucide-react'
import RegisterFunction from '../apis/donate/register'
// import toast from 'react-hot-toast';

const SignUp = () => {
  const navigate = useNavigate();
  const [regForm, setregForm] = useState({
    email: "",
    password: "",
    phone: "",
    fullname: ""
  })

  const [request, setrequest] = useState(false)
  const [error, seterror] = useState("")


  function handleChange(e) {
    setregForm({
      ...regForm,
      [e.target.name]: e.target.value

    })
  }


  async function handleSubmit() {
    setrequest(true)
    seterror("")
    try {
      const msg = await axios.post('http://localhost:5000/registerUser', {
        email: regForm.email,
        password: regForm.password,
        phone: regForm.phone,
        fullname: regForm.fullname
      });
      console.log(msg.data.data)
      if (msg.data.data!==null) {
        navigate('/otp');
      } else {
        seterror("Invalid Credentials")
        setrequest(false)
      }
    } catch (error) {          
      setrequest(false) 
      seterror("Server Error")
      console.error(error);
    }
  }





  return (
    // signup page frontend
    <div className="signupform">
      <h2 className="text-[1.5rem] font-[500] ">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={regForm.email} onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" value={regForm.password} onChange={handleChange} required />

        <label>Phone:</label>
        <input type="number" name="phone" value={regForm.phone} onChange={handleChange} required />

        <label>Full Name:</label>
        <input type="text" name="fullname" value={regForm.fullname} onChange={handleChange} required />

        {error.length !== 0 && (
          <span className="pb-[10px] text-[#f44336] flex justify-center items-center gap-2 "><AlertCircle size={20} color='#f44336' /> {error}</span>
        )}

        <button className="bg-[#FFA732] hover:bg-[#EE9322] flex justify-center items-center gap-2 mb-[20px]" disabled={request} style={request === true ? { opacity: 0.67 } : { opacity: 1 }} onClick={(e) => {
          handleSubmit()
        }}> <ColorRing
            visible={request}
            height="30"
            width="30"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
          />
          Sign up</button>
      </form>
      <h6>Already have an account? <a href="/auth/donor/login">Login</a></h6>
    </div>
  )
}

export default SignUp;