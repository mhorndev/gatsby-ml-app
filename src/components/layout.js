import React, { useEffect, useState } from "react"
import "../style.css"
import { Context } from "./context"
import routes from "./routes"
import { navigate } from "gatsby"
import Navbar from "./navbar"
import Transition from "./transition"
import { Helmet } from 'react-helmet'

const Layout = ({children, location}) => {
  const [globalContext,setGlobalContext] = useState({
    transitionComplete: true
  })

  useEffect(() => {
    if (!globalContext.path) return
    let next = routes.findIndex(obj => obj.path === globalContext.path)
    let curr = routes.findIndex(obj => obj.path === location.pathname)
    setGlobalContext(prev => ({...prev, direction: next > curr ? 1 : -1}))

    setGlobalContext(prev => ({...prev, transitionComplete: false}))
    setTimeout(function() { navigate(globalContext.path) }, 500)

  }, [globalContext.path, location.pathname])

  return (
    <Context.Provider value={{globalContext,setGlobalContext}}>
      <Helmet>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous"/>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>
      </Helmet>
      <Navbar/>
      <Transition>
        {children}
      </Transition>
    </Context.Provider>
  )
}

export default Layout