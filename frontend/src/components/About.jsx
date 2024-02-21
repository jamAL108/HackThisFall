/* eslint-disable no-unused-vars */

// ABOUT COMPONENT


import React from "react";
import aboutimg from "../assets/aboutimg.png";
import AboutBackgroundImage from "../assets/about-background.png";
import { BsFillPlayCircleFill } from "react-icons/bs";
// pat-na1-d84c8884-554b-4f26-add4-664b1f94f0e9
const About = () => {
  function handleVideo(){
    window.open("https://youtu.be/GamVrr_P5XU?si=SoVsz4QXzJqKrArg");
  }
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackgroundImage} alt=""  />
      </div>
      <div className="about-section-image-container">
        <img src={aboutimg} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
        Urgent. Solvable. Action.
        </h1>
        <p className="primary-text">
        Ending world hunger is not just a moral imperative, its within our grasp if we act collectively with compassion and determination.
        </p>
        <p className="primary-text">
        World hunger persists as a stark reminder of our collective obligation to ensure food security for every individual on the planet.
        </p>
        <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
          <button className="watch-video-button" onClick={handleVideo}>
            <BsFillPlayCircleFill /> Watch Video about Food hunger in India
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;