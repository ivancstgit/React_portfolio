import { useAuth0 } from '@auth0/auth0-react';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import '../../Styles/Profile.css';
import axios from '../../api/axios';
import Description from '../Utils/Description';

export default function Profile({data, mode}) {
  const {
    isAuthenticated,
    isLoading,
    error, loginWithPopup, logout, user } = useAuth0();

  const [profile, setprofile] = useState();

  useEffect(() => {
    setprofile(data)
  }, [data]);

  const login = () => loginWithPopup();

  const vinculate = async () => {
    try {

      const description = "A System Engineer, Web And Videogames Developer"
      if (profile.description) {
        description = profile.description
      }

      const datosVincular = {
        profile_img: user.picture,
        description: description,
        name: user.name,
      };

      const token = localStorage.getItem('access_token');
      const respuesta = await axios.put(`/profile/1`, datosVincular, {
        headers: {
          Authorization: 'Bearer ' + token,
          "Content-Type": 'application/json',
        },
        withCredentials: true,
      });

      console.log(respuesta.data);
      setprofile(respuesta.data.entity);

      logout({ logoutParams: { returnTo: window.location.origin } });


    } catch (error) {
      console.error("Error durante el proceso de vinculación:", error);
      // Manejar el error según tus necesidades
    }
  };



  const isAdmin = () => {
    const access_token = localStorage.getItem('access_token');
    const decoded = jwtDecode(access_token);
    return (decoded.role == "ADMIN")

  }


  //TODO: MANEJO DE ERRORES
  return (
    <section id="profile" className=''>
      <div className='pt-32'>
        <div className="flex flex-wrap">
          <div className='min-[800px]:w-1/3  min-[800px]:p-12 max-[800px]:py-8 flex justify-center'>
              {profile && (
                <img className={`rounded-full border-2 border-black align-middle max-w-full max-[800px]:w-2/5 ${mode ? "border-white" : "bg-black"}`} src={profile.profile_img} alt={profile.name} draggable="false" />
              )}
          </div>
          <div className="min-[800px]:w-2/3 flex flex-col justify-between max-[800px]:px-16 max-[800px]:mx-auto">
            {profile && (
              <Description name={profile.name} description={profile.description}></Description>
            )}

            {isAdmin() && (
              <div className="flex flex-col items-center">
                <div className='p-2 mx-8 mb-2 mt-auto flex bg-white text-black font-semibold  rounded-lg
                  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-700'>
                  <button onClick={login}>Login Linkedin</button>
                </div>
                <div className='p-2 mx-8 mt-2 mb-auto flex bg-white text-black font-semibold  rounded-lg
                  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-700'>
                  <button onClick={vinculate}>Vincular</button>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  )
}
