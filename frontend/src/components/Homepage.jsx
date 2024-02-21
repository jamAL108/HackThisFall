/* eslint-disable no-unused-vars */

// HOMEPAGE COMPONENT CONSISTS OF HOME COMPONENT'S BODY



import React from "react";
import BannerBackground from "../assets/home-banner-background.png";
import homepageimg from '../assets/homepageimg.png'
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import {useNavigate} from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();
  const navigatetoReg = async() => {
    navigate('/register')
  }
  return (
    <div className="home-container overflow-x-hidden">
      {/* <Navbar /> */}
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
          Feeding Hope, One Meal at a Time: Donate Food, Nourish Lives!
          </h1>
          <p className="primary-text">
          Join our food donation platform to make a real difference in the lives of those in need. With just a few clicks, you can help ensure no one goes hungry in our community.
          </p>
          <button className="secondary-button" onClick={navigatetoReg}>
            Register <FiArrowRight />{" "}
          </button>
          <button className="secondary-button mt-[10px]" onClick={(e)=>{
            navigate("/auth/ngo/login")
          }}>
            LOGIN as NGO <FiArrowRight />{" "}
          </button>
        </div>
        <div className="home-image-section" onClick={navigatetoReg}>
          <img src={homepageimg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;