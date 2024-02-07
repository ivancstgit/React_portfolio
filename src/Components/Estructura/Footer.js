import React from 'react'
import '../../Styles/Footer.css'

export default function Footer() {
    
  return (
    <section>
      <div className=' bg-black py-5 text-gray-400 px-4'>
        <div className='flex flex-wrap item-center justify-center'>
        Copyright © 2024 My Personal Portfolio.
        <p className='px-2'>
        Designed by Casatti Iván.
        </p>
        </div>
        <div className='border-b border-gray-400 pt-2 w-20 mx-auto'></div>
      </div>
    </section>
    
  )
}
