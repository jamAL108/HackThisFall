import React, { useState } from 'react'
import { BookText, Search, UserRound, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import DonorLogo from '../../assets/donateLogo.png'
import History from '../../assets/history-icon.png'
import Dashboard from '../../assets/dashboard.png'

const Navbar = () => {
    const pathname = window.location.pathname
    const navigate = useNavigate()

    function ChangeLetters(inputString) {
        const processedString = inputString.replace(/-/g, " ");
        return processedString;
    }

    return (
        <div className='relative w-[18%] h-[94%] bg-transparent px-[17px] text-[#46494F]'>
            <div className='mt-[-2px] w-full py-[13px] flex justify-between items-center border-b-[2px] border-dotted
         border-b-[#C5C6C8] '>
                <div className='flex justify-center items-center gap-3 select-none'>
                    <img src={Logo} alt="vlogo" className='w-[35px] h-[35px] rounded-[4px]' />
                    <h2 className='text-[1.13rem] text-[#0d0c22] font-[630] tracking-[0.4px]'>The Aahar</h2>
                </div>
                <BookText size={20} color='black' className='opacity-[0.2]' />
            </div>
            <div className='w-full pl-[4px] pt-[2px] pb-[0px] flex items-center gap-[10px] border-b-[2px] border-b-[#E9EDEF]'>
                <Search size={20} color='#526a7b' />
                <input type="text" placeholder='Search' className='meow text-[0.9rem] bg-transparent outline-none w-[80%] !border-none' />
            </div>
            <div className='w-full h-auto flex flex-col mt-[17px] gap-1 text-[#46494F]'>


                <div onClick={(e) => navigate(`/ngo/dashboard`)} style={pathname ? pathname.includes('dashboard') === true ? { backgroundColor: "#eeefff" } : { width: "100%" } : { width: "100%" }} className='capitalize pl-[4px] w-full py-[7px] cursor-pointer rounded-[6px] flex gap-3 items-center bg-transparent hover:bg-[#eeefff]'>
                    <img src={Dashboard} alt="asd" className='w-[19px] h-[19px]' />
                    <h2 className='flex items-center gap-3 text-[0.92rem] tracking-[0.3px] !font-[500]'>{ChangeLetters('dashboard')}</h2>
                </div>

                <div  onClick={(e) => navigate(`/ngo/donation`)} style={pathname ? pathname.includes('donation') === true ? { backgroundColor: "#eeefff" } : { width: "100%" } : { width: "100%" }} className='capitalize pl-[4px] w-full py-[7px] cursor-pointer rounded-[6px] flex gap-3 items-center bg-transparent hover:bg-[#eeefff]'>
                    <img src={DonorLogo} alt="asd" className='w-[19px] h-[19px]' />
                    <h2 className='flex items-center gap-3 text-[0.92rem] tracking-[0.3px] !font-[500]'>{ChangeLetters('donate')} </h2>
                </div>

                <div  onClick={(e) => navigate(`/ngo/history`)} style={pathname ? pathname.includes('history') === true ? { backgroundColor: "#eeefff" } : { width: "100%" } : { width: "100%" }} className='capitalize pl-[4px] w-full py-[7px] cursor-pointer rounded-[6px] flex gap-3 items-center bg-transparent hover:bg-[#eeefff]'>
                    <img src={History} alt="asd" className='w-[19px] h-[19px]' />
                    <h2 className='flex items-center gap-3 text-[0.92rem] tracking-[0.3px] !font-[500]'>{ChangeLetters('Your History')}</h2>
                </div>



            </div>
            <div className='absolute bottom-[0vh] w-[calc(100%_-_38px)] py-[5px]'>
                <div className='w-full py-[8px] cursor-pointer rounded-[6px] flex gap-3 items-center hover:bg-[#eeefff]'>
                    <UserRound size={20} color='#636F7E' />
                    <h2 className='flex items-center gap-3 text-[0.92rem] !font-[500]'>Profile</h2>
                </div>
            </div>
        </div>
    )
}

export default Navbar