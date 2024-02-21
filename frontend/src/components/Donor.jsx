/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Location from './Location';
import { useNavigate } from 'react-router-dom'
import donateuser from '../apis/donate/donateForm';
import { ColorRing } from 'react-loader-spinner'
import { AlertCircle } from 'lucide-react'
const DonationForm = () => {
  const [donationData, setDonationData] = useState({
    description: '',
    foodname: '',
    phone: '',
    donorname: '',
    address: ''
  });
  const [request, setrequest] = useState(false)
  const [error, seterror] = useState("")

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonationData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await donateuser({
      description: donationData.description,
      foodname: donationData.foodname,
      phone: donationData.phone,
      donorname: donationData.donorname,
      address: donationData.address
    })
    if (response.error === null) {
      /// error
    } else {
      navigate("/donor/thankyou")
    }

  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }} className='flex flex-col'>
      <Box className='gap-[20px]'
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem',
          margin: '0 auto', // Center the form horizontally
        }}
      >
        <div className='w-[50%] max-h-[500px] flex flex-col gap-[1rem] bg-[#f5f5f5] py-[20px] px-[20px] rounded-[15px]'>
          <TextField
            className='bg-white'
            label="Food Name"
            name="foodname"
            value={donationData.foodname}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            className='bg-white'
            label="Description"
            name="description"
            value={donationData.description}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            className='bg-white'
            label="Phone"
            name="phone"
            value={donationData.phone}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            className='bg-white'
            label="Donor Name"
            name="donorname"
            value={donationData.donorname}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            className='bg-white'
            label="Your address"
            name="address"
            multiline
            rows={4}
            value={donationData.address}
            onChange={handleChange}
            variant="outlined"
          />
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
            Submit</button>
        </div>
        <Location />
      </Box>
    </form>
  );
};

export default DonationForm;
