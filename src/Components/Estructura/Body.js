

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
const LOGIN_URL = '/auth/signin';

export default function Body({ mode, toggleDarkMode}) {


  const [headerData, setHeaderData] = useState();
  const [profileData, setProfileData] = useState();

  const [skillsData, setSkillsData] = useState();

  const [experienceData, setExperienceData] = useState();
  const [proyectsData, setProyectsData] = useState();

  const [hasError, setHasError] = useState(false);
  const [userRole, setUserRole] = useState("!!!Welcome!!!");

  //NOTIFICATION PARAMS
  const [visibleNot, setVisibleNot] = useState(false);
  const [textNot, setTextNot] = useState();
  const [typeNot, setTypeNot] = useState();
  const [flagWelcome, setFlagWelcome] = useState(true);

  const toggleShow = () =>{
    setVisibleNot(visible => !visible);
  }
  //----------------------------------

  useEffect(() => {
    setTimeout(() => {
      toggleWelcome();
    }, 3000);
  }, []);

  //welcome notification
  const toggleWelcome = () =>{
    setFlagWelcome(false)
  }
    
  const getToken = async (e) => {
    try {
        const response = await axios.post(LOGIN_URL,
            {
                email: "guest@gmail.com",
                password: "123",
                headers: {
                    "Content-Type": 'application/json',
                },
                withCredentials: true,
            });

        const access_token = response?.data?.access_token;

        localStorage.setItem("access_token", access_token);
        return access_token;

    } catch (error) {
        if (!error?.response) {
            setTextNot('No Server Response');
        } else {
            setTextNot('An error ocurred... Please try again later');
        }
        setVisibleNot(true);
        setTimeout(() => {
            setVisibleNot(false);
          }, 3000);
    }
}


//------------------------------------------------
  const handleDataFetch = async (endpoint, setDataFunction) => {
        
        const access_token = localStorage.getItem('access_token');
        
        if(!access_token){
          access_token = getToken();
        }

        const decoded = jwtDecode(access_token);
  
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
        if(decoded.exp < currentTimeInSeconds){
          getToken();
        }

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
