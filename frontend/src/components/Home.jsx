/* eslint-disable no-unused-vars */
import React from 'react';
import "../css/home.css";
import Homepage from "../components/Homepage";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function Home() {

  return (
    <div className="App">
      <Homepage />
      <About />
      <Contact />
      <Footer />

    </div>
  );
}

export default Home;