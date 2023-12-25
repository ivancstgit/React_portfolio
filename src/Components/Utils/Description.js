import React, { useEffect } from 'react'
import Draggable from 'react-draggable';
import { useRef, useState } from 'react';
import '../../Styles/Description.css'

export default function Description({ name, description }) {
    const [isVisible, setIsVisible] = useState(true);
    const intervalRef = useRef(null);
    
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
        
    
        // Reiniciar el temporizador
        clearInterval(intervalRef.current);
        startTimer();
      };
    
      const startTimer = () => {
        intervalRef.current = setInterval(() => {
          setIsVisible((prevVisibility) => !prevVisibility);
        }, 6000);
      };
    
      useEffect(() => {
        startTimer();
    
        // Limpiar el intervalo al desmontar el componente para evitar fugas de memoria
        return () => clearInterval(intervalRef.current);
      }, []);


    return (

        <div className="cursor-pointer mx-auto my-auto flex  font-semibold text-bg items-start">

            <div  className={`absolute transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <a onClick={toggleVisibility}>
                <h1 className="text-lg">Hello! I'm</h1>
                <p className="p-4 ml-16 text-3xl">{name}</p>
                </a>
            </div>

            <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-0' : 'opacity-100'}`}>
                <a onClick={toggleVisibility}>
                <h1 className="text-lg">Who Am I?</h1>
                <p className="p-4 ml-16 text-xl">{description}</p>
            </a>
            </div>
        </div>

    )
}
