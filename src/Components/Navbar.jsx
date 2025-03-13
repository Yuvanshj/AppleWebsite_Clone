import React from 'react'
import {appleImg} from '../utils/index'

const Navbar = () => {
  return (
    <header>
        <nav>
            <img src={appleImg} alt="Apple Image" />
        </nav>
    </header>
  )
}

export default Navbar