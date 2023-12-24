

import React from 'react'
import Profile from './Profile'
import { Auth0Provider } from '@auth0/auth0-react';
import Proyects from './Proyects';
import Skills from './Skills';
import Experiences from './Experience';
import Contact from './Contact';
import Footer from './Footer';
import Notification from '../Utils/Notification';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Header from './Header';
import axios from '../../api/axios';
import Loading from '../Utils/Loading';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

export default function Body({ mode, toggleDarkMode}) {


  const [headerData, setHeaderData] = useState();
  const [profileData, setProfileData] = useState();

  const [skillsData, setSkillsData] = useState();

  const [experienceData, setExperienceData] = useState();
  const [proyectsData, setProyectsData] = useState();

  const [typeNot, setTypeNot] = useState();
  const [hasError, setHasError] = useState(false);
  const [getMessageNot, setMessageNot] = useState();
  const [notVisible, setNotVisible] = useState(false);
  const [userRole, setUserRole] = useState();


  useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        const decoded = jwtDecode(access_token);
        if (decoded.role == "ADMIN") {
            setUserRole("Welcome you are logged as Admin")
        } else {
          setUserRole("Welcome you are logged as Guest")
        }
        
    }, [])


// HEADER DATA
useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const respuesta = await axios.get(`/contact`, {
        headers: {
          Authorization: 'Bearer ' + token,
          "Content-Type": 'application/json',
        },
        withCredentials: true,
      });

      setHeaderData(respuesta.data);
    } catch (error) {
      setHasError(true);
      setNotVisible(true);
      setTypeNot("error");
      setMessageNot("Error fetching data... Please try again later");
    }
  };

  fetchData();
}, []);

// PROFILE DATA
useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const respuesta = await axios.get(`/profile/1`, {
        headers: {
          Authorization: 'Bearer ' + token,
          "Content-Type": 'application/json',
        },
        withCredentials: true,
      });
      setProfileData(respuesta.data.entity);
    } catch (error) {
      setHasError(true);
      setNotVisible(true);
      setTypeNot("error");
      setMessageNot("Error fetching data... Please try again later");
    }
  };

  fetchData();
}, []);

// PROYECTS DATA
useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const respuesta = await axios.get(`/proyect`, {
        headers: {
          Authorization: 'Bearer ' + token,
          "Content-Type": 'application/json',
        },
        withCredentials: true,
      });
      setProyectsData(respuesta.data);
    } catch (error) {
      setHasError(true);
      setTypeNot("error");
      setNotVisible(true);
      setMessageNot("Error fetching data... Please try again later");
    }
  };

  fetchData();
}, []);

// EXPERIENCE DATA
useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const respuesta = await axios.get(`/experience`, {
        headers: {
          Authorization: 'Bearer ' + token,
          "Content-Type": 'application/json',
        },
        withCredentials: true,
      });
      setExperienceData(respuesta.data);
    } catch (error) {
      setHasError(true);
      setNotVisible(true);
      setTypeNot("error");
      setMessageNot("Error fetching data... Please try again later");
    }
  };

  fetchData();
}, []);

// SKILLS DATA
useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const respuesta = await axios.get(`/skills`, {
        headers: {
          Authorization: 'Bearer ' + token,
          "Content-Type": 'application/json',
        },
        withCredentials: true,
      });
      setSkillsData(respuesta.data);
    } catch (error) {
      setHasError(true);
      setNotVisible(true);
      setTypeNot("error");
      setMessageNot("Error fetching data... Please try again later");
    }
  };

  fetchData();
}, []);



  return (
    <section>
      <Header mode={mode} toggleDarkMode={toggleDarkMode} data={headerData} />

      <div className='pt-40 w-full fixed z-40'>
        <Notification type={typeNot} message={getMessageNot} status={notVisible} />
      </div>
      {profileData && proyectsData && experienceData && skillsData ? 
      <>
        <div className='pt-40 w-full fixed z-40'>
        <Notification type={"info"} message={userRole} status={true} />
        </div>


      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
        <Profile data={profileData} mode={mode}/>

      </Auth0Provider>

      <Proyects data={proyectsData} />
      <Experiences data={experienceData} mode={mode}/>
      <Skills data={skillsData} mode={mode}/>
      <Contact mode={mode}/>
      <Footer />
      </>
      :
       <Loading mode={mode}></Loading>}
    </section>
  )
}
