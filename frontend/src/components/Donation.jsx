import React, {useEffect, useState} from 'react'
import '../css/donation.css'
import donateGet from '../apis/donate/donationGet';
import donationAccept from '../apis/donate/donationAccept';
import { useNavigate } from 'react-router-dom'
import NoDonation from '../assets/noDonationFound.png'
const DonationComp = () => {
  const navigate = useNavigate()
  const [donordata, setdonordata] = useState([]);
  const [ngokaID, setngokaID] = useState("")

  useEffect(() => {
    const ngoIDFULL = localStorage.getItem('BHOJNA_ngo');
    const ngoID = JSON.parse(ngoIDFULL);
    setngokaID(ngoID.id)
    const FetchDonations = async() => {
        const response = await donateGet()
        const data = response
        setdonordata(data);
    }
    FetchDonations();
  },[])


  const handleAcceptance = async (objectID, index) => {
    let arr = [...donordata]
    arr.splice(index, 1);
    setdonordata(arr)
    try {
        const response = await donationAccept({ objectID, ngokaID})
        console.log(response)
        localStorage.setItem('objectID',objectID)
        navigate('/ngo/verify')
    } catch (error) {
        console.error('Error:', error);
    }
};

  return (
    <div className="donation-list">
      {donordata.map((donation , index) => (
        <div key={index} className="donation-card">
          <h3>{donation.foodname}</h3>
          <p>{donation.description}</p>
          <p>{donation.donorname}</p>
          <p>{donation.address}</p>
          <button onClick={() => handleAcceptance(donation._id.$oid , index) }>Accept</button>
        </div>
      ))}
      {donordata.length===0 && (
        <div className='w-full min-h-[400px] flex flex-col justify-center items-center gap-3'>
           <img src={NoDonation} alt="efvfc"  className='w-[200px] h-[180px]' />
           <h2 className='text-[1rem] font-[500] w-[240px]'>No Donations from Any User Found ! Have a nice day</h2>
        </div>
      )}
    </div>
  )
}

export default DonationComp