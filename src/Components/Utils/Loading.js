import React from "react";
import MoonLoader from "react-spinners/MoonLoader";
import '../../Styles/Loading.css'

const Loading = ({mode}) => (
  <div className={`min-h-screen flex justify-center items-center  ${mode ? "" : ""}`}>
    <div className={` select-none ${mode ? "loader_dark" : "loader_light"}`}>
    Loading...
    </div>
    </div>

);

export default Loading;