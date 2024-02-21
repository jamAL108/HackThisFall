/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from '../../../components/ngo/nav'
import { MoreHorizontal } from 'lucide-react'
import DonationCOMP from '../../../components/Donation'
const Dashboard = () => {
    return (
        <div className='donor_text w-[100vw] min-h-[100vh] h-[100vh] flex justify-center items-center bg-[#F6F8FA] overflow-hidden'>
            <Navbar />
            <div className='bg-[#FFFFFF] px-[25px] w-[82%] mt-[3vh] flex flex-col h-[97vh] rounded-l-[20px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.2)] overflow-hidden'>
                <div className='w-full pt-[15px] flex flex-col gap-5'>
                    <div className='flex py-[4px] gap-2 items-center'>
                        <h1 className='text-[1.5rem] font-[600] tracking-[0.6px]'>Donation Section</h1>
                        <MoreHorizontal size={20} className='cursor-pointer' />
                    </div>
                    <DonationCOMP/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard