

import React, { useEffect, useState } from 'react';
import '../../Styles/Proyects.css';


export default function Proyects({data}) {
    const [proyects, setProyect] = useState();

    useEffect(() => {
        setProyect(data)
    }, [data]);
        
    return (
        
        <section id='proyects' className="py-12">
            <div className="max-w-max pr-4 pl-4 mr-auto ml-auto" >
                <div className="mx-auto flex flex-wrap mr-4 ml-4 justify-center">
                    <div className="xl:w-1/3 px-auto py-4 my-auto">
                        <div>
                            <div className="proyect_title mb-8 flex">
                                <span className='mr-2 text-lg'>My</span>
                                <h2>Proyects</h2>
                            </div>
                            <p className='mb-8 px-4'>All my pending and completed projects represent my passion and dedication for my profession.
                            <br/>
                            <br/>
                            Each one of them represents my commitment to excellence and constant desire to overcome challenges.</p>
                            <a href="https://github.com/IvanCsTGit" target='_blank' rel="noopener noreferrer" className="bg-transparent primary-btn">
                                See my git repositories</a>
                        </div>
                    </div>
                    <div className="xl:w-2/3 pl-4 mt-4">
                        <div className="flex flex-wrap">
                            
                            {proyects && proyects.map((item, index) => (
                                <div key={index} className="w-1/2 p-2 mb-4">
                                    
                                    <div className={`proyect_img flex relative ${item.state ? 'status_true' : 'status_false'}`}>
                                        <img className="align-middle max-w-full" src={'data:image/jpeg;base64,' + item.image} alt={item.title} />
                                    </div>
                                    <h4 className='text-xl mb-2 mt-4'>{item.title}</h4>
                                    <p>{item.description}</p>
                                </div>
                            ))}

                        </div>
                    </div>

                </div>
            </div>
        </section>
    )

}
