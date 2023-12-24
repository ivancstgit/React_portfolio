import { useLocation, Navigate, Outlet } from "react-router-dom";

import React from 'react'
import { jwtDecode } from "jwt-decode";

export default function RequireAuth({ allowedRoles }) {
  const location = useLocation();
  //const rolesUser = [];

  // Verificar si existe el access_token en localStorage
  const access_token = localStorage.getItem('access_token');
  if (!access_token) {
    // Si no hay access_token, redirigir a la página de login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const decoded = jwtDecode(access_token);
  
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  if(decoded.exp < currentTimeInSeconds){
    localStorage.removeItem('access_token')
    console.log("TOKEN EXPIRED")
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const role = decoded.role;


  // if (roles) {
  //   roles.forEach(role => {
  //     rolesUser.push(role);
  //   });
  // }

  return allowedRoles.includes(role) ? (
    <Outlet />
  ) : <Navigate to="/login" state={{ from: location }} replace />
}