import React, { useEffect } from 'react'
import Draggable from 'react-draggable';
import { useRef, useState } from 'react';
import '../../Styles/Description.css'

export default function Description({ name, description }) {

    const containerName = useRef(null);
    const containerDesc = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [positionDesc, setPositionDesc] = useState({ x: window.innerWidth * 2, y: 0 });


    const ChangePositionName = () => {
        setPosition({ x: window.innerWidth * 2, y: 0 });
        setPositionDesc({ x: 0, y: 0 })
    }

    const ChangePositionDescription = () => {
        setPositionDesc({ x: window.innerWidth * 2, y: 0 });
        setPosition({ x: 0, y: 0 })
    }


    const handleStop = (e, data) => {
        if (data.x > 50) {
            ChangePositionName();
        }

    };

    const handleStopDesc = (e, data) => {
        if (data.x > 50) {
            ChangePositionDescription();
        }

    };

    useEffect(() => {
        const interval = setInterval(() => {
          autoChange()
        }, 5000);
    
        return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
      }, []);

    const autoChange = () =>{
        const positionName = containerName.current.getBoundingClientRect().x;
        const positionDesc = containerDesc.current.getBoundingClientRect().x;
        const dif = positionName-positionDesc

        if(dif>0){
            ChangePositionDescription();
        }else{
            ChangePositionName()
        }        
    }

    return (

        <div className="cursor-grabbing mx-auto my-auto flex  font-semibold text-bg items-start">
            <Draggable
                axis='x'
                position={position}
                nodeRef={containerName}
                onStop={handleStop}
                bounds={{ left: 0, top: 0, bottom: 0 }}

            >
                <div ref={containerName} className='draggable-items absolute'>
                    <h1 className='text-lg'>Hello! I'm</h1>
                    <p className='p-4 ml-16 text-3xl'>{name}</p>
                </div>
            </Draggable>

            <Draggable
                axis='x'
                position={positionDesc}
                nodeRef={containerName}
                onStop={handleStopDesc}
                bounds={{ left: 0, top: 0, bottom: 0 }}
            >
                <div ref={containerDesc} className='draggable-items'>
                    <h1 className='text-lg '>Who Am I?</h1>
                    <p className='p-4 ml-16 text-xl'>{description}</p>
                </div>
            </Draggable>

        </div>

    )
}
