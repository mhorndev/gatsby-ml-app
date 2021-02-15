import React, { useEffect, useState } from "react"
import "../style.css"
import { Context } from "./context"
import routes from "./routes"
import { navigate } from "gatsby"
import Navbar from "./navbar"
import Transition from "./transition"

const Layout = ({children, location}) => {
  const [globalContext,setGlobalContext] = useState({ 
    initial: true,
    navbar: true,
  })

  useEffect(() => {
    if (globalContext.initial) {
      if (location.pathname === "/") {
        setGlobalContext(prev => ({...prev, navbar: false}))
      }
      setGlobalContext(prev => ({...prev, initial: false}))
      return
    }
    let next = routes.findIndex(obj => obj.path === globalContext.path)
    let curr = routes.findIndex(obj => obj.path === location.pathname)
    setGlobalContext(prev => ({...prev, direction: next > curr ? 1 : -1}))
    setGlobalContext(prev => ({...prev, navbar: false}))
    setTimeout(function(){ navigate(globalContext.path) }, 500)
    console.log("HEY")
  }, [globalContext.path])

  useEffect(() => {
    console.log(location)
  }, [])

  return (
    <Context.Provider value={{globalContext,setGlobalContext}}>
      <Navbar/>
      <Transition>
        {children}
      </Transition>
    </Context.Provider>
  )
}

export default Layout