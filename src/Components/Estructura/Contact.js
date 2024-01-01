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
  
  

  const [isadmin, setIsAdmin] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [msg, setMsg] = useState();
  
  //NOTIFICATION PARAMS
  const [visibleNot, setVisibleNot] = useState(false);
  const [textNot, setTextNot] = useState();
  const [typeNot, setTypeNot] = useState();

  const toggleShow = () =>{
    setVisibleNot(visible => !visible);
  }

  useEffect(() => {
    console.log(visibleNot);
  }, [visibleNot]);

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
        name: name,
        email: email,
        text_message: msg
      }
  
      const token = localStorage.getItem('access_token');
      const respuesta = await axios.post(`/message`, messageData, {
        headers: {
          Authorization: 'Bearer ' + token,
          "Content-Type": 'application/json',
        },
        withCredentials: true,
      });
      
      
      setTextNot("Message send succesfully")
      setVisibleNot(true)
      setTypeNot("success")

      setTimeout(() => {
        // La función que se ejecutará después de 3 segundos si show es true
        setVisibleNot(false)
        // Aquí puedes llamar a la función que necesitas ejecutar
      }, 4000);

      document.getElementById("name").value="";
      document.getElementById("email").value="";
      document.getElementById("message").value="";

       

    } catch (error) {
      setTextNot("An error ocurred please try again later");
      setVisibleNot(true)
      setTypeNot("error")
      setTimeout(() => {
        // La función que se ejecutará después de 3 segundos si show es true
        setVisibleNot(false)
        // Aquí puedes llamar a la función que necesitas ejecutar
      }, 4000);
      
    }
    
  }

  return (
    <section id='contact'>
      {textNot && (
                                <Notification type={typeNot} message={textNot} status={visibleNot} toggleShow={toggleShow}/>
                 )}

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
                  Quieres mas informacion?
                </p>
                <div className="text-xl">
                  CONTACTAME
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
              <form className='block' onSubmit={postMessage}>
                <p className='py-4'> O enviame un mensaje directamente de esta aplicacion...</p>
                <input name="name" type="text" className="form-control" id="name" placeholder="Your Name" autoComplete="off" onChange={(e) => setName(e.target.value)} required/>

                <input name="email" type="email" className="form-control" id="email" placeholder="Your Email" onChange={(e) => setEmail(e.target.value)} required/>

                <textarea name="message" rows="5" className="form-control text-area" id="message" placeholder="Your Message" autoComplete="off" onChange={(e) => setMsg(e.target.value)} required></textarea>


                <input name="send" type="submit" className={`form-control cursor-pointer ${mode ? "input-bg-dark" : "input-bg-light"} `} id="send" value="SEND ME" />
              </form>
            </div>
          </>
        )}

      </div>
    </section>
  )
}
