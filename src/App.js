/* eslint-disable react/react-in-jsx-scope */
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Missing from "./Components/Utils/Missing";
import Layout from "./Components/Utils/Layout";
import Home from "./Components/Estructura/Home";

const ROLES = {
  'User': 'USER',
  'Admin': 'ADMIN'
}


function App() {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
  
}

export default App;
