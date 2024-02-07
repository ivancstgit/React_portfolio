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
                    Skills
                </h2>
                <div className="pt-8 px-auto text-xl">
                Through my professional career
                <br></br>
                I have managed to acquire several skills...
                <p className='pt-8'>
                But in whitch of them do i <strong className='underline'>stand out</strong>?
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
                        <div className='progress ' style={{ "--variable": `${item.porcent}%` }}>
                            <div className={`bar ${mode ? "progress-dark" : "progress-light"}`}></div>
                        </div>
                    </div>




                ))}
            </div>
        </section>
    )
}
