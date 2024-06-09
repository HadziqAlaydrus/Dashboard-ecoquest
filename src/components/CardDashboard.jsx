import React from 'react'

const CardDashboard = () => {
  return (
    <section className='max-w-screen p-14 bg-gradient-to-tl from-cyan-800 via-teal-500 to-lime-500 pt-20'>
        <div>
            <h1 className='font-bold text-7xl flex justify-center items-center p-10'>DASHBOARD</h1>
            <div className='bg-gray-300 h-fit rounded-lg p-20'>
                <div className='flex justify-between'>
                    <h3>ID</h3>
                    <h3>Nama Client</h3>
                    <h3>Total Berat Sampah</h3>
                    <h3>Tanggal Pengambilan</h3>
                    <h3>Status</h3>

                </div>
            </div>
        </div>
    </section>
  )
}

export default CardDashboard