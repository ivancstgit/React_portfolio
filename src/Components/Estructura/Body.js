

import { Auth0Provider } from '@auth0/auth0-react';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import Loading from '../Utils/Loading';
import Notification from '../Utils/Notification';
import Contact from './Contact';
import Experiences from './Experience';
import Footer from './Footer';
import Header from './Header';
import Profile from './Profile';
import Proyects from './Proyects';
import Skills from './Skills';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

export default function Body({ mode, toggleDarkMode}) {


  const [headerData, setHeaderData] = useState();
  const [profileData, setProfileData] = useState();

  const [skillsData, setSkillsData] = useState();

  const [experienceData, setExperienceData] = useState();
  const [proyectsData, setProyectsData] = useState();

  const [hasError, setHasError] = useState(false);
  const [userRole, setUserRole] = useState();

  //NOTIFICATION PARAMS
  const [visibleNot, setVisibleNot] = useState(false);
  const [textNot, setTextNot] = useState();
  const [typeNot, setTypeNot] = useState();
  const [flagWelcome, setFlagWelcome] = useState(true);

  const toggleShow = () =>{
    setVisibleNot(visible => !visible);
  }
  //----------------------------------


  //welcome notification
  const toggleWelcome = () =>{
    setFlagWelcome(false)
  }
  
  useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        const decoded = jwtDecode(access_token);
        if (decoded.role == "ADMIN") {
            setUserRole("Welcome you are logged as Admin")
        } else {
          setUserRole("Welcome you are logged as Guest")
        }

        setTimeout(() => {
          // La función que se ejecutará después de 3 segundos si show es true
          toggleWelcome();
          // Aquí puedes llamar a la función que necesitas ejecutar
        }, 3000);
    }, [])
//------------------------------------------------
  const handleDataFetch = async (endpoint, setDataFunction) => {
    try {
      const token = localStorage.getItem('access_token');
      const respuesta = await axios.get(endpoint, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      setDataFunction(respuesta.data);
      
    } catch (error) {
      setHasError(true);
      setVisibleNot(true);
      setTypeNot('error');
      setTextNot('Error fetching data... Please try again later');
      setTimeout(() => {
        // La función que se ejecutará después de 3 segundos si show es true
        setVisibleNot(visible => !visible);
        // Aquí puedes llamar a la función que necesitas ejecutar
      }, 3000);
    }
  };

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    const decoded = jwtDecode(access_token);
    setUserRole(decoded.role === 'ADMIN' ? 'Welcome you are logged as Admin' : 'Welcome you are logged as Guest');

    setTimeout(() => {
      toggleWelcome();
    }, 3000);
  }, []);

  useEffect(() => {
    handleDataFetch('/contact', setHeaderData);
  }, []);

  useEffect(() => {
    handleDataFetch('/profile/1', setProfileData);
  }, []);

  useEffect(() => {
    handleDataFetch('/proyect', setProyectsData);
  }, []);

  useEffect(() => {
    handleDataFetch('/experience', setExperienceData);
  }, []);

  useEffect(() => {
    handleDataFetch('/skills', setSkillsData);
  }, []);

  return (
    <section>
      <Header mode={mode} toggleDarkMode={toggleDarkMode} data={headerData} />

      <div className='pt-40 w-full fixed z-40'>
        <Notification type={typeNot} message={textNot} status={visibleNot} toggleShow={toggleShow} />
      </div>
      {profileData && proyectsData && experienceData && skillsData ? 
      <>
        <div className='pt-40 w-full fixed z-40'>
        <Notification type={"info"} message={userRole} status={flagWelcome} toggleShow={toggleWelcome}/>
        </div>


      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
        <Profile data={profileData.entity} mode={mode}/>

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
