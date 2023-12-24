import React, { useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';
import axios from '../../api/axios';

import { FaDiscord, FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaPhone, FaGithub } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import Loading from '../Utils/Loading';
import { Tooltip } from "react-tooltip";
import { Link } from 'react-scroll';
import { FaMoon } from "react-icons/fa6";
import { FaSun } from "react-icons/fa";

import '../../Styles/Header.css';

import image from '../../Assets/1.png';

export default function Header({mode, toggleDarkMode, data}) {
  const [media, setMedia] = useState();
  
  useEffect(() => {
     setMedia(data);
   }, [data]);
   
  const navigate = useNavigate();

  const logout = async () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  }

  return (
    <nav className={`fixed z-50 px-8 w-full ${mode ? "bg-black" : "bg-white"}`}>
      <div className="flex items-center py-2">
        <Link className='cursor-pointer'
          to="profile" spy={true} smooth={true} offset={-96} duration={700}>
          <img src={image} alt="icon" className='w-20 rounded-full' />
        </Link>
        <div className="flex items-center ml-auto">
          <ul className="flex items-center">
            <li className='p-4 font-semibold'>
              <Link className='cursor-pointer px-4'
                to="proyects" spy={true} smooth={true} offset={-105} duration={700}>
                Proyects
              </Link>
              <Link className='cursor-pointer px-4'
                to="experiences" spy={true} smooth={true} offset={-75} duration={700}>
                Experience
              </Link>
              <Link className='cursor-pointer px-4'
                to="skills" spy={true} smooth={true} offset={-110} duration={700}>
                Skills
              </Link>
              <Link className='cursor-pointer px-4'
                to="contact" spy={true} smooth={true} offset={-98} duration={700}>
                Contact
              </Link>
            </li>
          </ul>

          <div className={`flex items-center px-6  border-l border-r ${mode ? "border-white" : "border-black"}`}>
              
              {!media && <div className={`loader_header mx-5 ${mode ? "bg-white" : "bg-black"}`}></div>}
              <ul className='flex'>
                {media && media.map((item) => (
                  <li key={item.icon} className='flex mx-4'>
                    {item.link ? (
                      <a href={item.link} target='_blank' rel="noopener noreferrer" data-tooltip-id={`icon${item.icon}`}>
                        <SocialMediaIcon iconName={item.icon} size={25} />
                      </a>
                    ) :
                      <a data-tooltip-id={`icon${item.icon}`}>
                        <SocialMediaIcon iconName={item.icon} size={25} />
                      </a>
                    }

                    <Tooltip id={`icon${item.icon}`} className="" clickable border="1px solid white" >

                      <div className='p-2 font-bold text-base'>
                        {item.link ? (
                          <a href={item.link} target='_blank' rel="noopener noreferrer"><h3 className='text-blue-400'>{item.social_name}</h3></a>
                        ) : (
                          <a className='pointer'>{item.social_name}</a>
                        )}
                      </div>


                    </Tooltip>


                  </li>
                ))}
              </ul>
          </div>

        </div>
        <div className="flex items-center ml-6">
          <a onClick={logout} className={`${mode ? "btn-dark":"btn-light"} -my-2.5 justify-center rounded-lg text-base font-semibold py-2.5 px-4 mx-4 cursor-pointer`}>Logout</a>
          <button onClick={toggleDarkMode} className={`ml-4 border rounded-full flex ${mode ? "border-white" : "border-black"}`}>
      {/* {mode ? ( */}
        <div className={`transition-opacity duration-400 ${mode ? 'opacity-100' : 'opacity-0'}`}>
        <FaMoon size={30} className='transition-opacity duration-300'></FaMoon>
        </div>
      {/* ) : ( */}
      <div className={`transition-opacity duration-400 ${mode ? 'opacity-0' : 'opacity-100'}`}>
          <FaSun size={30} className='transition-opacity duration-300'></FaSun>
        </div>
        
      {/* )} */}
    </button>
        </div>
      </div>
    </nav>


  )
}

const SocialMediaIcon = ({ iconName, size }) => {
  const iconMapping = {
    facebook: FaFacebook,
    twitter: FaTwitter,
    instagram: FaInstagram,
    discord: FaDiscord,
    linkedin: FaLinkedin,
    phone: FaPhone,
    git: FaGithub,
    mail: IoMdMail
  };
  const SelectedIcon = iconMapping[iconName];

  return <SelectedIcon size={size} />;
};
