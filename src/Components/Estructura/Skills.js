import React, { useEffect, useState } from 'react';
import '../../Styles/Skills.css';

export default function Skills({data, mode}) {
    const [skills, setSkills] = useState();


    useEffect(() => {
        setSkills(data);
    }, [data]);

    return (
        <section id='skills' className='flex flex-wrap py-8 justify-center'>
            
            <div className="min-[900px]:w-1/2 px-16 mt-6 pb-16 flex flex-col text-center">
                <h2 className="text-4xl font-bold">
                    Habilidades
                </h2>
                <div className="pt-8 px-auto text-xl">
                A lo largo de mi carrera profesional
                <br></br>
                he logrado adquirir varias habilidades...
                <p className='pt-8'>
                Pero, ¿Cuáles son las habilidades en las que <strong className='underline'>destaco</strong>?
                </p>
                </div>
                
            </div>
            <div className='min-[900px]:w-1/2 flex flex-col max:[900px]:px-4 min-[900px]:pr-16 '>
                {skills && skills.map((item, index) => (
                    <div key={index} className='pt-4 max-[900px]:w-80'>
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
