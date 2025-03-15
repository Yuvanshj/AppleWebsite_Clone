import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import ModelView from "./ModelView"



const Model = () => {

    useGSAP(()=>{
        gsap.to('#heading',{
          opacity: 1,
          ease: 'power1.inOut',
          y:0,
          // delay:3,
        })
    })

  return (

    <section className="common-padding">
       <div className="screen-max-width">

           <h1 id="heading" className="section-heading"> Take a Closer Look</h1>

           <div className="flex flex-col items-center mt-5">
                <div className="w-full h-[75vh] md:h-[75vh] overflow-hidden relative">

                    {/* //Model Goes here */}
                    <ModelView />

                </div>
           </div>

       </div>
    </section>
  )
}

export default Model