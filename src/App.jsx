import React from "react"
import Navbar from "./Components/Navbar"
import Hero from "./Components/Hero"
import Highlights from "./Components/Highlights"

function App() {

  return (
    <>
      <main className="bg-black">
        <Navbar />
        <Highlights />
        <Hero />
      </main>
    </>
  )
}

export default App
