import React, { useEffect, useState } from 'react'
import { hightlightsSlides } from '../constants'
import { pauseImg, playImg, replayImg } from '../utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const VideoCarousal = () => {

    const videoRef = React.useRef([]);
    const videoSpanRef = React.useRef([]);
    const videoDivRef = React.useRef([]);

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId:0,
        isLastVideo:false,
        isPlaying:false,
    })

    const [loadedData, setLoadedData] = useState([])

    const {isEnd, startPlay, videoId, isLastVideo, isPlaying} = video;

    useGSAP(()=>{

        gsap.to('#slider' , {
            transform: `translateX(${-100 * videoId}%)`,
            duration:2,
            ease: 'power2.inOut'
        })

        gsap.to('#video', {
            scrollTrigger : {
                trigger: '#video', 
                toggleActions:'restart none none none'
            },
            onComplete : ()=>{
                setVideo( (prevVideo)=>({
                    ...prevVideo, 
                    startPlay:true, 
                    isPlaying:true
                }) )
            }

        })
    },[isEnd, videoId])

    useEffect(()=>{
        if(loadedData.length > 3){
            if(!isPlaying) {
                videoRef.current[videoId].pause()
            }else{
                startPlay && videoRef.current[videoId].play()
            }
        }
    },[startPlay, videoId, isPlaying, loadedData])

    const handleLoaderMetadata = (i,e) => setLoadedData(
        (prev)=> [...prev, e]
    )

    useEffect(()=>{
        let currentProgress = 0;
        let span = videoSpanRef.current

        if(span[videoId]){
            let animate = gsap.to(span[videoId], {
                onUpdate: ()=>{
                    const progress = Math.ceil( animate.progress() * 100 )

                    if(progress != currentProgress){
                        currentProgress = progress

                        gsap.to(videoDivRef.current[videoId], {
                            width:
                              window.innerWidth < 760
                                ? "10vw" // mobile
                                : window.innerWidth < 1200
                                ? "10vw" // tablet
                                : "4vw", // laptop
                          });
                    }

                },
                onComplete: () => {
                    if(isPlaying){
                        gsap.to(videoDivRef.current[videoId], {
                            width:"12px",
                        })
                        gsap.to(span[videoId] , {
                            backgroundColor: '#afafaf'
                        })
                    }
                  },
            })
            if(videoId === 0){
                animate.restart()
            }

            const animateUpdate = () =>{
                animate.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration)
            }
    
            if(isPlaying){
                gsap.ticker.add(animateUpdate)
            }else{
                gsap.ticker.remove(animateUpdate)
            }
        }


    }, [videoId, startPlay])

    const handleProcess = (type,i) => {
        switch (type) {
            case 'video-end':
                setVideo((prevVideo) => ({...prevVideo, isEnd:true, videoId: i+1 }))
                break;
            
            case 'video-last':
                setVideo( (prevVideo) => ({...prevVideo, isLastVideo:true,}));
                break;
            case 'video-reset':
                setVideo( (prevVideo) => ({...prevVideo, isLastVideo:false, videoId:0}));
                break;
            case 'play':
                setVideo( (prevVideo) => ({...prevVideo, isPlaying:!isPlaying,}));
                break;
            case 'pause':
            setVideo( (prevVideo) => ({...prevVideo, isPlaying:!isPlaying,}));
            break;
            default:
                return video
        }
    }


  return (
    <>
    {/* The Carousal */}
    <div className='flex items-center'>
        {hightlightsSlides.map((slide, i)=>{
            return (
                <div 
                    key={slide.id} 
                    id="slider" 
                    className='sm:pr-20 pr-10'>

                    <div className='video-carousel_container'>

                        <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                            <video 
                            id='video' 
                            preload='auto' 
                            muted 
                            playsInline={true} 
                            key={slide.video}
                            ref={(el)=> (videoRef.current[i] = el)}
                            onPlay={()=>{
                                setVideo((prevVideo) =>({
                                    ...prevVideo,isPlaying: true
                                }) )
                            }}  
                            onLoadedMetadata={(e)=> handleLoaderMetadata(i,e)} 
                            onEnded={()=>{
                                i !== 3 ? handleProcess('video-end', i) : handleProcess('video-last')
                            }} > 

                                <source src={slide.video} type='video/mp4'/>

                            </video>

                        </div>

                        <div className='absolute top-12 left-[5%] z-10'>
                            {slide.textLists.map((text)=>{
                                return(
                                    <h1 
                                    className='md:text-2xl text-xl font-bold' 
                                    key={text}>{text}   </h1>
                                )
                            })}
                        </div>
                    </div>
                        
                </div>
            )
        })}
    </div>

    {/* The Navigator */}
    <div className='flex items-center justify-center mt-10'>
        <div className=' flex items-center justify-center py-5 px-7 bg-[#42424570] backdrop-blur rounded-full'>
            {videoRef.current.map((_, i)=>(
                <span 
                    key={i} 
                    ref={(el)=> videoDivRef.current[i] = el}
                    className='mx-2 w-3 h-3 bg-gray-300 rounded-full relative cursor-pointer'   > 
                    <span className='absolute h-full w-full rounded-full' 
                    ref={(el)=> videoSpanRef.current[i] = el} />
 
                </span>
            ))} 
        </div>

        <button className='control-btn'>
            <img
                className='cursor-pointer'
                onClick={isLastVideo ? ()=> handleProcess('video-reset') : !isPlaying ? ()=> handleProcess('play') : ()=> handleProcess('pause')} 
                src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg } 
                alt={isLastVideo ? "replay" : !isPlaying ? 'play' : "pause"} /> 
        </button>
    </div>
    </>
  )
}

export default VideoCarousal