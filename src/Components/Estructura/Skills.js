import React from 'react'
import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import '../../Styles/Skills.css'

export default function Skills({data, mode}) {
    const [skills, setSkills] = useState();


    useEffect(() => {
        setSkills(data);
    }, [data]);

    return (
        <section id='skills' className='flex py-8'>
            <div className="w-1/2 px-16 mt-6 pb-16  flex flex-col text-center">
                <h2 className="text-4xl font-bold">
                    Soft Skills
                </h2>
                <div className="pt-8 px-auto text-xl">
                Throughout my professional life 
                <br></br>
                i have managed to acquire several skills...
                <p className='pt-8'>
                But, in which skills do I <strong className='underline'>stand out</strong>?
                </p>
                </div>
                
            </div>
            <div className='w-1/2 flex flex-col'>
                {skills && skills.map((item, index) => (
                    <div key={index} className='pr-16 pt-4'>
                        <div className="flex justify-between items-end">
                            <span className="font-semibold">
                                {item.name}
                            </span>
                            <small>{item.porcent}%</small>

                        </div>
                        <div className='progress ' style={{ "--progress": `${item.porcent}%` }}>
                            <div className={`bar ${mode ? "progress-dark" : "progress-light"}`}></div>
                        </div>
                    </div>




                ))}

            </div>
        </section>
    )
}
