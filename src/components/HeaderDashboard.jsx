import React from 'react'
import { CgProfile } from "react-icons/cg";

const HeaderDashboard = () => {
  return (
    <section>
        <div className='w-full h-14 bg-white shadow-lg flex justify-between items-center p-5 font-bold text-3xl  '>
            <h1 className='text-gray-700'>Dashboard <span className='bg-clip-text text-transparent bg-gradient-to-tl from-cyan-800 via-teal-500 to-lime-500'>Ecoquest</span></h1>
            <div className=''>
            <CgProfile className='w-10 h-10' color='#40ff00'/>

            </div>
        </div>
    </section>
  )
}

export default HeaderDashboard