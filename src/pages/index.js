import React, { useContext }  from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { Context } from "../components/context"
import { GrGatsbyjs } from 'react-icons/gr/';
import { GrReactjs } from 'react-icons/gr/';
import { GrGraphQl } from 'react-icons/gr/';
import { FaPython } from 'react-icons/fa/';
import { GrDocker } from 'react-icons/gr/';


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
  margin: 10px;
  color: #FFF; 
  background-color: #BF00FF;
  border: none;
  outline: none;
  padding: 10px;
  cursor: pointer;
  transition: all 300ms ease;
  &:hover {
    background-color: #663399;
  }
`

const Icons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & > svg {
    margin: 5px;
  }
`

const Home = () => {
  const {globalContext, setGlobalContext} = useContext(Context)

  function onClick(e,path) {
    e.preventDefault()
    setGlobalContext(prev => ({...prev, path: path}))
  }

  return (
    <Page>
      <Content>
        <Heading>Hello.</Heading>
        <Paragraph>This machine learning application is a medical cost risk analysis designed to
          provide an estimated risk cost based on input paramaters.
        </Paragraph>

        <Button href="/form" onClick={e => onClick(e,"/form")}>Let's get started</Button>

        <hr/>
        <Icons>
          <GrReactjs size={28} fill="#61dafb"/>
          <GrGatsbyjs size={28} fill="#663399"/>
          <GrGraphQl size={28} fill="#d64292"/>
          {"|"}
          <FaPython size={28} fill="#2b5b84"/>
          <GrDocker size={28} fill="#0073ec"/>
        </Icons>
      </Content>
    </Page>
  )
}

export default Home