import React, { useContext }  from "react"
import styled from "styled-components"
import { Context } from "../components/context"

const Page = styled.div`
  position: fixed;
  top: 0; bottom: 0;
  left: 0; right: 0;
  overflow: hidden;
`

const Content = styled.div`
  margin: 0 auto;
  padding: 20px; 
  height: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Heading = styled.h1`
  margin: 10px;
  color: #000;
`

const Paragraph = styled.p`
  margin: 10px;
  max-width: 400px;
  color: #666;
`

const Button = styled.button`
  color: #FFF; margin: 10px;
  background-color: #000;
  border: none;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #BF00FF;
  }
  transition: all 300ms ease;
  outline: none;
`


const Home = ({}) => {
  const {globalContext,setGlobalContext} = useContext(Context)

  function onClick(e,path) {
    e.preventDefault()
    setGlobalContext(prev => ({...prev, path: path}))
  }

  return (
    <Page>
      <Content>
        <Heading>Home</Heading>
        <Paragraph>This machine learning application is a medical cost risk analysis designed to
          provide an estimated risk cost based on input paramaters.
        </Paragraph>
        <Button href="/form" onClick={e => onClick(e,"/form")}>Let's get started</Button>
      </Content>
    </Page>
  )
}

export default Home