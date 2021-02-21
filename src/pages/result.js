import { motion } from "framer-motion"
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
  color: #000; 
`

const ApiResult = styled.div`
  margin: 10px;
  max-width: 400px;
  color: #666;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Buttons = styled.div`
`

const Button = styled(motion.button)`
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

const Result = () => {
  const {globalContext,setGlobalContext} = useContext(Context)
  const [result,setResult] = useState(null)
  const [count,setCount] = useState(0)
  const [message,setMessage] = useState(null)

  function onClick(e,path) {
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
          setResult({
            cost: "$"+response.cost.toFixed(2), 
            accuracy: null
          })
        })
      })
    }
  }, [globalContext.params])

  useEffect(() => {
    setMessage(messages[Math.floor(Math.random() * Math.floor(messages.length))])
    const interval = setInterval(() => {
      setCount(prev => prev + 1)
      setMessage(messages[Math.floor(Math.random() * Math.floor(messages.length))])
    }, 3000);
    return () => clearInterval(interval);
  }, [])

  useEffect(() => {

  }, [result])

  return (
    <Page>
      <Content>
        {globalContext.params 
        ? 
          < >
            {(result && count >= 3) ?
              < >
                <ApiResult>
                  <Heading>Result:</Heading>
                  {result.cost}
                </ApiResult>
                <Buttons>
                  <Button href="/form" onClick={e => onClick(e,"/form")}>Run it Back</Button>
                  <Button href="/form" onClick={e => onClick(e,"/analysis")}>See Analysis</Button>
                </Buttons>
              </>
            :
              < >
                <div className="spinner-grow" role="status"/>
                <div>{message}</div>
              </>
            }
          </>
        : 
          < >
            <Heading>Fugedabodit</Heading>
            <p>Nothing to see here. Try entering some parameters first.</p>
            <Button href="/form" onClick={e => onClick(e,"/form")}>Go to Form</Button>
          </>
        }
      </Content>
    </Page>
  )
}

const messages = [
  "Reticulating splines...",
  "Generating witty dialog...",
  "Swapping time and space...",
  "Spinning violently around the y-axis...",
  "Bending the spoon...",
  "Counting backwards from Infinity",
  "Adjusting flux capacitor...",
  "Follow the white rabbit",
  "Spinning the wheel of fortune...",
  "We need more dilithium crystals",
  "Connecting Neurotoxin Storage Tank...",
  "Spinning the hamster...",
  "I think I am, therefore, I am. I think.",
  "Dividing by zero...",
  "If I’m not back in five minutes, just wait longer.",
  "Simulating traveling salesman...",
  "Proving P=NP...",
  "Twiddling thumbs...",
  "Trying to sort in O(n)...",
  "Switching to the latest JS framework...",
  "Waiting for Daenerys say all her titles...",
  "Feel free to spin in your chair",
  "Mining some bitcoins...",
  "Alt-F4 speeds things up.",
  "Optimizing the optimizer...",
  "Updating Updater...",
  "Downloading Downloader...",
  "Running with scissors...",
  "Waking up the minions",
  "You are number 2843684714 in the queue",
  "Grabbing extra minions",
  "Doing the heavy lifting",
  "Still faster than Windows update",
  "Debugging the Debugger...",
  "Deleting hidden porn from your computer"
]

export default Result