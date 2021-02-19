import { replace } from "gatsby"
import React, { useContext, useEffect, useState }  from "react"
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
  max-width: 1000px;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Heading = styled.h1`
  margin-top: 2em;
`

const Paragraph = styled.p`
  margin: 10px;
  max-width: 400px;
  color: #666;
`

const Buttons = styled.div`
`

const Button = styled.button`
  margin: 10px;
  color: #FFF; 
  background-color: #000;
  border: none;
  outline: none;
  padding: 10px;
  cursor: pointer;
  transition: all 300ms ease;
  &:hover {
    background-color: #BF00FF;
  }
`

const Result = ({}) => {
  const {globalContext,setGlobalContext} = useContext(Context)
  const [result,setResult] = useState(null)

  function backToForm(e,path) {
    e.preventDefault()
    setGlobalContext(prev => ({...prev, path: path}))
  }

  useEffect(() => {
    if (globalContext.params) {
      const params = globalContext.params
      const url = 'https://api-ahrjj7evdq-uc.a.run.app/'

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:  JSON.stringify({
          age:params.age, 
          sex:params.sex, 
          bmi:params.bmi, 
          children:params.children,
          smoker:params.smoker,
          region:params.region,
        })
      }

      fetch(url, options)
      .then(response => {
        response = response.json()
        response.then(function(response) {
          console.log(response.cost)
          setResult({
            cost: "$"+response.cost.toFixed(2), 
            accuracy: null
          })
        })
      })
    }
  }, [])

  return (
    <Page>
      <Content>
        <Heading>Results:</Heading>
        <Paragraph>{result ? result.cost : "Contacting Api"}</Paragraph>
        <Buttons>
          <Button href="/form" onClick={e => backToForm(e,"/form")}>Run It Back</Button>
          <Button href="/form" onClick={e => backToForm(e,"/analysis")}>See Analysis</Button>
        </Buttons>
      </Content>
    </Page>
  )
}

export default Result