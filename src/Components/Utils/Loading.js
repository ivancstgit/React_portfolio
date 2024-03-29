import React, { useEffect, useState } from "react";
import '../../Styles/Loading.css';

export default function Loading({ mode }) {
  const [flag, setFlag] = useState();

  useEffect(() => {
    setTimeout(() => {
      setFlag(true);
    }, 20000);
  })

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center  ${mode ? "" : ""}`}>
      <div className={` select-none ${mode ? "loader_dark" : "loader_light"}`}>
        Loading...
      </div>

      {flag && (
        <div className="pt-24">A free hosting service is being used... It may take a while.</div>
      )}
    </div>
  )
}