/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ColorRing } from 'react-loader-spinner'
import { AlertCircle } from 'lucide-react'

const OtpPage = () => {

  const [request, setrequest] = useState(false)
  const [error, seterror] = useState("")


  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  function handleChange(e) {
    setOtp(e.target.value);
  }

  const handleSubmit = async (e) => {
    setrequest(true)
    seterror("")
    e.preventDefault();
    try {
      const reqID = Cookies.randomNumber; // Access cookie value
      const response = await axios.post('http://localhost:5000/verifyOTP', {
        reqID: reqID,
        otp: otp
      });
      if (response.data.success) {
        navigate('/donor/dashboard');
      } else {
        seterror("OTP Verification Failed")
        setrequest(false)
      }
    } catch (error) {
      seterror("Error verifying OTP")
      setrequest(false)
    }
  };

  return (
    <div className='w-[100%] h-[100vh] flex justify-center items-center flex-col'>
      <div className='w-[400px] h-[250px] rounded-[10px] flex justify-center flex-col items-center  border-[2px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.2)]'>
      <h2>OTP Verification</h2>
      <form onSubmit={handleSubmit} className='flex justify-center items-center'>
        <label>Enter OTP:</label>
        <input type="text" value={otp} onChange={handleChange} />
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
          Verify OTP</button>
      </form>
      </div>
    </div>
  );
};

export default OtpPage;
