import React, { useContext }  from "react"
import styled from "styled-components"
import routes from "../components/routes"
import { Context } from "./context"
import Brand from "../components/brand"
import { motion } from "framer-motion"

const Container = styled(motion.div)`
  z-index: 10;
  position: fixed;
  top: 0; left: 0; right: 0;
  background-color: #FFF;
`

const Content = styled.div`
  margin: 0 auto;
  padding: 20px; 
  max-width: 1000px;
  display: flex;
  justify-content: space-between;
`

const Links = styled.div`
  display: flex;
  align-items: center;
`

const Link = styled.a`
  margin-left: 20px;
  color: #000000;
  text-decoration: none;
  &:hover { color: #BF00FF; }
`

const Navbar = () => {
  const {globalContext,setGlobalContext} = useContext(Context)

  function onClick(e,path) {
    e.preventDefault()
    setGlobalContext(prev => ({...prev, path: path}))
  }

  return (
    <Container
      initial={{y: -100}}
      animate={{ y: globalContext.transitionComplete ? 0 : -100 }}
      transition={{ duration: .25 }}
    >
      <Content>
        <Brand href="/" onClick={e => onClick(e,"/")}>Brand</Brand>
        <Links>
          {routes.map((route,index) => {
            return (
              <Link 
                key={route+index}
                href={route.path} 
                onClick={e => onClick(e,route.path)}>{route.name}
              </Link> 
            )
          })}
        </Links>
      </Content>
    </Container>
  )
}

export default Navbar