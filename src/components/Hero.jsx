import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'
import { heroVideo, smallHeroVideo } from '../utils';

const Hero = () => {

  const [videoSrc, setVideoSrc] = React.useState( window.innerWidth <760 ? smallHeroVideo : heroVideo )

  function handleVideoSrc(){
    if(window.innerWidth < 760){
      setVideoSrc(smallHeroVideo)
    }else{
      setVideoSrc(heroVideo)
    }
  }

  React.useEffect( ()=>{
      window.addEventListener('resize', handleVideoSrc)

      return() => window.removeEventListener('resize', handleVideoSrc)
      
  }, [])
  

  useGSAP( ()=>{
  
    if(videoSrc === smallHeroVideo){
      gsap.to('.hero-title', {
        opacity: 0.6,
        delay:2,
        ease: "power1.in"
      })

      gsap.to('#cta', {
        opacity: 1,
        y:-100,
        delay:2,
        ease:'power1.inOut'
      })
    }else{
      gsap.to('.hero-title', {
        opacity: 0.6,
        delay:1,
        ease: "power1.in"
      })

      gsap.to('#cta', {
        opacity: 1,
        y:-150,
        delay:1,
        ease:'power1.inOut'
      })
    }
  }, [])

  return (
    <section className='w-full nav-height bg-black relative '>
      <div className='h-5/6 w-full flex-center flex-col'>
        <p className='hero-title' id='iphone'> iPhone 15 Pro </p>

        <div className='md:w-10/12 w-8/12'>
          <video className='pointer-events-none' autoPlay muted playsInline={true} key={videoSrc}>
            <source src={videoSrc} type='video/mp4' />
          </video>
        </div>
      </div>
      <div id='cta' className='flex flex-col items-center opacity-0 translate-y-20'>

        <a href="#highlights" className='btn'> Buy </a>     
        <p className='font-normal text-xl'> From $199/month or $999</p>

      </div>
    </section>
  )
}

export default Hero