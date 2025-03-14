import React from 'react'
import { appleImg, bagImg, searchImg } from '../utils'
import { navLists } from '../constants/index'

const Navbar = () => {
  return (
    <header className='w-full py-5 px-5 sm:px-10 flex justify-center items-center'>
    <nav className='w-full screen-max-width flex '>

        <img src={appleImg} alt="Apple Image" className='' width={14} height={18} />
    
        <div className='flex flex-1 justify-center gap-4 max-sm:hidden'>
            {navLists.map( (nav)=>{ 
                return <div key={nav} className='px-5 text-sm cursor-pointer text-gray-400 hover:text-white  transition-all' > {nav} </div>
            })}
        </div>

        <div className='flex gap-7 cursor-pointer max-sm:justify-end max-sm:flex-1 '>   
        <img src={bagImg} alt="Apple Image" width={14} height={18} />

        <img src={searchImg} alt="Apple Image" width={14} height={18} />

        </div>

    </nav>
</header>
  )
}

export default Navbar