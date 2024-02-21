/* eslint-disable no-unused-vars */

// CONTACT COMPONENT (contains query feature)

import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import axios from 'axios'
import '../css/home.css'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import '../css/contact.css'

const Contact = () => {
  const navigate = useNavigate();
  const [queryForm, setqueryForm] = useState({
    email: " ",
    comment: " "
  })
  const [msg, setMsg] = useState(false);

  const CookieofUser = Cookies.get('userCookie')
  useEffect(() => {
    const checkCookie = async () => {
      if (CookieofUser) {
        setMsg(true);
      }
    }
    checkCookie();
  });

  const handleChange = (e) => {
    setqueryForm({
      ...queryForm,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // if (!msg) {
      //   navigate('/login')
      // } else {
      const response = await axios.post('http://localhost:5000/queryStorage', {
        email: queryForm.email,
        comment: queryForm.comment
      });

      if (response.status === 200) {
        alert(response.data.message);
        setqueryForm({
          email: "",
          comment: "",
        });
      }
      // }
    } catch (error) {
      console.error("Error submitting query:", error);
      if (error.response && error.response.status === 404) {
        console.log(error);
      } else {
        console.log(error);
      }
    }
  };


  return (
    <div className="w-full bg-[#F5F5F5] py-[30px] px-[50px] flex justify-center items-center">
      <div className="w-full flex justify-center items-center flex-col gap-7">
        <div className="w-full flex justify-center items-center flex-col">
          <h1 className="flex text-[1.3rem] mb-[30px] opacity-[0.5] font-[550]">Have a Question in Mind?</h1>
          <h1 className="text-center w-[600px] text-[2.6rem] font-[600] leading-[52px] text-[#4C4C4C]">Let Us Help You by answering queries about this platform</h1>
        </div>

        <motion.div className="left" initial={{ x: -250, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            opacity: { duration: 0.3, delay: 0.3 },
            x: { duration: 0.8, type: "spring", delay: 0.25 },
          }} >
          <form className="form">
            <div className="upp">
              <input type="text" placeholder='Your email address' value={queryForm.email}
                onChange={handleChange} />
            </div>
            <div className="down">
              <textarea name="para" placeholder='Your Meassage to me' value={queryForm.comment}
                onChange={handleChange} id="" cols="30" rows="10"></textarea>
            </div>
          </form>
          <div className="submit" onClick={handleSubmit}>
            <button>Send</button>
          </div>
        </motion.div>

      </div>
    </div>


  );
};

export default Contact;