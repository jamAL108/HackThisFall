import React from 'react'
import { useNavigate } from 'react-router-dom'
const Page = () => {
    const navigate = useNavigate()
  return (
    <div className='w-[100%] h-[100vh] flex justify-center items-center bg-white'>
        <div className='border-[2px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.2)] border-[#f5f5f5] w-[300px] h-[250px] flex flex-col justify-center items-center gap-4 rounded-[10px]'>
            <h1 className='w-[90%] text-center'> Thank You , for Providing the food and help the needy people.</h1>
            <button className='border-none bg-[#FFA732] hover:bg-[#EE9322] w-auto px-[18px] py-[10px] 
            rounded-[10px]'  onClick={(e)=>{
                navigate('/donor/dashboard')
            }}>Dashboard</button>
        </div>
    </div>
  )
}

export default Page