/* eslint-disable react/react-in-jsx-scope */
import './App.css';
import Login from './Components/Estructura/Login';

import { Navigate, Route, Routes } from 'react-router-dom';
import Missing from "./Components/Utils/Missing";
import Layout from "./Components/Utils/Layout";
import RequireAuth from "./Components/Utils/RequireAuth";
import Home from "./Components/Estructura/Home";

const ROLES = {
  'User': 'USER',
  'Admin': 'ADMIN'
}


function App() {
  
  return (
    <div >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" />} />
          {/* public routes */}
          <Route path="login" element={<Login />} />

          {/* we want to protect these routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
            <Route path="home" element={<Home />} />
          </Route>

          {/* catch all */}
         <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
      </div>
  );
}

export default App;
