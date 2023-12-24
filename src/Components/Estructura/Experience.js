

import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import Loading from '../Utils/Loading';
import '../../Styles/Experience.css'


export default function Experiences({data, mode}) {
    const [experience, setExperience] = useState();


    useEffect(() => {
        setExperience(data)
    }, [data]);

    return (

        <section id='experiences' className="py-8">
            <div className="mx-auto flex flex-wrap mr-4 ml-4 p-4">
                <div className='flex flex-col justify-center mx-auto'>
                    <div className="font-semibold text-3xl pb-8 mx-auto px-8">
                        <h2>Knowleage And Experience</h2>
                    </div>
                    <div className='grid grid-cols-2 mx-auto'>
                    {experience && experience.map((item, index) => (
                                
                            
                        <div className={`m-8 p-8 text-center ${mode ? "bg-zinc-900" : "bg-zinc-200"}`} key={index}>
                            <div className='text-2xl exp relative'>
                                <h2>
                                    {item.name}
                                </h2>
                            </div>
                            <div className='mt-6 mx-auto flex relative text-center box-content w-24 h-24'>
                            <img className="align-middle max-w-full h-auto" src={'data:image/jpeg;base64,' + item.image}/>
                            </div>
                            <p className='mt-4'>
                                {item.description}
                            </p>
                        </div>
                          ))}
                    </div>

                </div>


            </div>
        </section>
    )

}
