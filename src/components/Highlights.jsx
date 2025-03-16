import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'
import {ScrollTrigger} from 'gsap/all'
import { rightImg, watchImg } from '../utils'

import VideoCarousal from './VideoCarousal'
import { animateWithGsap } from '../utils/animations'

gsap.registerPlugin(ScrollTrigger)

const Highlights = () => {

  // const scrollRef = React.useRef(()=>{});

  useGSAP(()=>{
    animateWithGsap('#title',{
      opacity: 1,
      ease: 'power1.inOut',
      y:0,
      // delay:3,
    })
    animateWithGsap('.link',{
      opacity: 1,
      ease: 'power1.inOut',
      y:0,
      // delay:3,
      duration:1,
      stagger:0.2
    })
  }, [])

  return (
    <section id='highlights' className='w-screen overflow-hidden h-full common-padding bg-[#101010]'>
      <div className='screen-max-width'>
        <div className='mb-12 w-full md:flex items-end justify-between'>

          <h1 id='title' className='section-heading'>Get the highlights.</h1>
          
          <div className='flex flex-wrap items-end gap-5'>
            <p className='link'>
              Watch the film 
              <img className='ml-2' src={watchImg} alt="watchImage" />
            </p>

            <p className='link'>
              Watch the Event 
              <img className='ml-2' src={rightImg} alt="watchImage" />
            </p>
          </div>
          </div>
        <VideoCarousal />
      </div>
    </section>
  )
}

export default Highlights