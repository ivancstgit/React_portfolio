import React, { useEffect, useState } from 'react'
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { FiAlertTriangle } from "react-icons/fi";
import { MdDoneOutline } from "react-icons/md";
import { FaInfo } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";

import '../../Styles/Notification.css'
import { get } from 'react-scroll/modules/mixins/scroller';

export default function Notification({ message, type, status, toggleShow }) {
    const [getType, setType] = useState();
    const [getColor, setColor] = useState();

    const [visibility, setVisibility] = useState(false);

    useEffect(() => {
        switch (type) {
            case "info":
                setColor("cyan")
                setType(<FaInfo color="cyan" />)

                break;
            case "success":
                setColor("green")
                setType(<MdDoneOutline color="green" />)

                break;
            case "warning":
                setColor("yellow")
                setType(<FiAlertTriangle color="yellow" />)

                break;
            case "error":
                setColor("red")
                setType(<MdOutlineReportGmailerrorred color="red" />)


                break;
            default:
                break;
        }

    }, [type])

    useEffect(() => {
        setVisibility(status);
    }, [status])
    
    return (
        <div className='fixed notification absolute text-white flex justify-center'>
            <div className={`z-40  overlay ${visibility ? "active" :""}  items-center justify-center flex`}>
                <div className='w-auto h-auto items-center justify-center flex'>
                <div className={`absolute rounded shadow-not bg-black ${type} py-5 px-6 shadow shadow-${getColor}-700  items-center justify-center flex`}>

                    <a className={`cursor-pointer btnClose shadow shadow-${getColor}-700`} onClick={toggleShow}><IoCloseCircleOutline color={getColor} size={20} /></a>
                    
                    <div className='mr-2'>{getType}</div>
                    <p>{message}</p>
                    

                </div>
                </div>
            </div>
        </div>
    )
}