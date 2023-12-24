import React, { useState, useEffect } from 'react'
import { FaPhone, FaMapMarkedAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import '../../Styles/Contact.css'
import axios from '../../api/axios';
import Loading from '../Utils/Loading';
import { jwtDecode } from 'jwt-decode';
import Notification from '../Utils/Notification';

export default function Contact({mode}) {
  const [message, setMessage] = useState();
  const [messageVisible, setMessageVisible] = useState(false);
  const [notMessage, setNotMessage] = useState();
  const [error, setError] = useState(false);
  

  const [isadmin, setIsAdmin] = useState(false);

  useEffect(() => {
    getMessage();
  }, []);

  useEffect(() => {
    isAdmin();
  }, []);

  const getMessage = async () => {
    if(isadmin){
      const token = localStorage.getItem('access_token');
      const respuesta = await axios.get(`/message`, {
        headers: {
          Authorization: 'Bearer ' + token,
          "Content-Type": 'application/json',
        },
        withCredentials: true,
      });
      setMessage(respuesta.data);
    }
  }

  const isAdmin = () => {
    const access_token = localStorage.getItem('access_token');
    const decoded = jwtDecode(access_token);
    setIsAdmin(decoded.role == "ADMIN");
  }

  const postMessage = async (e) => {
    e.preventDefault();

    try {
      const messageData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        text_message: document.getElementById("message").value
      }
  
      const token = localStorage.getItem('access_token');
      const respuesta = await axios.post(`/message`, messageData, {
        headers: {
          Authorization: 'Bearer ' + token,
          "Content-Type": 'application/json',
        },
        withCredentials: true,
      });
      document.getElementById("name").value="";
      document.getElementById("email").value="";
      document.getElementById("message").value="";
      setNotMessage("Message send succesfully")
      setMessageVisible(true)

    } catch (error) {
      setNotMessage("An error ocurred please try again later");
      setMessageVisible(true)
      setError(true);
    }
    
  }

  return (
    <section id='contact'>
      {!error && notMessage && (<Notification type="success" message={notMessage} status={messageVisible} ></Notification>)}
      {error && notMessage && (<Notification type="error" message={notMessage} status={messageVisible} ></Notification>)}

      <div className={`flex flex-wrap justify-center my-20 lg:mx-16 items-center  xl:border ${mode ? "xl:bg-black" : "xl:bg-white xl:border-black"} `} >
        {isadmin && !message && (<Loading></Loading>)}

        {isadmin && message && message.map((item, index) => (
          <div className='flex flex-col' key={index}>
            {item.name}
            {item.email}
            {item.text_message}
          </div>
        ))}

        {!isadmin && (
          <>
            <div className={`mx-6 mb-6  flex flex-col xl:border-none border p-4 ${mode ? "bg-black" : "bg-white border-black"} `}>
              <div className='mx-auto my-8 items-center flex flex-col'>
                <p>
                  Want more information?
                </p>
                <div className="text-xl">
                  CONTACT ME
                </div>
              </div>
              <div className='px-8 py-4 flex items-center'>
                <div className="w-12 h-12 border rounded-full flex items-center justify-center">
                  <FaPhone className='hover:animate-pulse' size={25} />
                </div>
                <p className='ml-6'>+543543617090</p>
              </div>
              <div className='px-8 py-4 flex items-center'>
                <div className="w-12 h-12 border rounded-full flex items-center justify-center">
                  <IoMdMail className='hover:animate-pulse' size={25} />
                </div>
                <p className='ml-6'>Casativanw@gmail.com</p>
              </div>
              <div className='px-8 py-4 flex items-center'>
                <div className="w-12 h-12 border rounded-full flex items-center justify-center">
                  <FaMapMarkedAlt className='hover:animate-pulse' size={25} />
                </div>
                <p className='ml-6'>Argentina Cordoba, Unquillo</p>
              </div>
            </div>

            <div className={` p-8 m-4 lg:mt-8 xl:border-none border ${mode ? "bg-black" : "bg-white border-black"} `}>
              <form className='block' role="form" onSubmit={postMessage}>
                <p className='py-4'> Or send me a message directly from this app...</p>
                <input name="name" type="text" className="form-control" id="name" placeholder="Your Name" required/>

                <input name="email" type="email" className="form-control" id="email" placeholder="Your Email" required/>

                <textarea name="message" rows="5" className="form-control text-area" id="message" placeholder="Your Message" required></textarea>


                <input name="send" type="submit" className={`form-control ${mode ? "input-bg-dark" : "input-bg-light"} `} id="send" value="SEND ME" />
              </form>
            </div>
          </>
        )}

      </div>
    </section>
  )
}
