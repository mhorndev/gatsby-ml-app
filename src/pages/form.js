import React, { useEffect, useState }  from "react"
import styled from "styled-components"

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
  flex-direction: column;
`

const Heading = styled.h1`
  margin-top: 2em;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const Label = styled.div`
  flex: 1;
`

const Control = styled.div`
  flex: 4;
`

const Group = styled.div`
  width: 100%;
`

const Params = {
  age: undefined,
  height: undefined,
  weight: undefined,
  bmi: undefined,
  children: undefined,
  state: undefined,
  region: undefined,
  sex: undefined,
  smoker: undefined,
}

const Form = ({}) => {
  const [params,setParams] = useState(Params)  

  function formatHeight() {
    if (params.height === undefined) return
    var feet = Math.floor(params.height / 12)
    var inches = params.height - (feet * 12)
    return feet + "'" + inches + "\"";
  }

  function formatWeight() {
    if (params.weight === undefined) return
    return params.weight + " lbs"
  }

  function formatBmi() {
    if (params.bmi === undefined) return
    return params.bmi + " (kg/m^2)"
  }

  function formatState() {
    if (params.state === undefined) return
    return states[params.state]
  }

  function formatChildren() {
    if (params.children === undefined) return
    return params.children
  }

  function formatSex() {
    if (params.sex === undefined) return
    return (params.sex === 0 ? "M" : "F")
  }

  function formatSmoker() {
    if (params.smoker === undefined) return
    console.log("not undefined")
    console.log(params.smoker)
    return (params.smoker > 0 ? "Y" : "N")
  }

  function formatAge(value) {
    if (params.age === undefined) return
    return params.age
  }

  useEffect(() => {
    if (params.height && params.weight) {
      setParams({...params, 
        bmi: ((params.weight/params.height/params.height)*703).toFixed(2)
      })
    }
  }, [params.height,params.weight])

  useEffect(() => {
    console.log(params.smoker)
  }, [params.smoker])

  return (
    <Page>
      <Content>
        <Heading>Form</Heading>

          <Container>
            <Label>
              <strong>Age:</strong>
              {" "}
              {formatAge(params.age)}
            </Label>
            <Control>
              <input 
                type="range" class="form-range" id="ageRange" min="18" max="99" value={params.age || 0}
                onChange={e => setParams({...params, age: e.target.value})}
                onMouseDown={e => {if (params.age === undefined){setParams({...params, age: 18})}}}
              />
            </Control>
          </Container>

          <Container>
            <Label>
              <strong>Height:</strong>
              {" "}
              {formatHeight(params.height)}
            </Label>
            <Control>
              <input 
                type="range" class="form-range" id="heightRange" min="48" max="84" value={params.height || 0}
                onChange={e => setParams({...params, height: e.target.value})}
                onMouseDown={e => {if (params.height === undefined){setParams({...params, height: 48})}}}
              />
            </Control>
          </Container>

          <Container>
            <Label>
              <strong>Weight:</strong>
              {" "}
              {formatWeight(params.weight)}
            </Label>
            <Control>
              <input 
                type="range" class="form-range" id="weightRange" min="75" max="300" value={params.weight || 0}
                onChange={e => setParams({...params, weight: e.target.value})}
                onMouseDown={e => {if (params.weight === undefined){setParams({...params, weight: 75})}}}
              />
            </Control>
          </Container>

          <Container>
            <Label>
              <strong>BMI:</strong>
              {" "}
              {formatBmi(params.bmi)}
            </Label>
            <Control>
              <input 
                type="range" class="form-range" id="bmiRange" min="10" max="90" value={params.bmi || 0} disabled
              />
            </Control>
          </Container>

          <Container>
            <Label>
              <strong>Children:</strong>
              {" "}
              {formatChildren(params.children)}
            </Label>
            <Control>
              <input 
                type="range" class="form-range" id="childrenRange" min="0" max="7" value={params.children || 0}
                onChange={e => setParams({...params, children: e.target.value})}
                onMouseDown={e => {if (params.children === undefined){setParams({...params, children: 0})}}}
              />
            </Control>
          </Container>

          <Container>
            <Label>
              <strong>State:</strong>
              {" "}
              {formatState(params.state)}
            </Label>
            <Control>
              <input 
                type="range" className="form-range" id="stateRange" min="0" max="49" value={params.state || 0}
                onChange={e => setParams({...params, state: e.target.value})}
                onMouseDown={e => {if (params.state === undefined) {setParams({...params, state: 0})}}}
              />
            </Control>
          </Container>

          <Container>
            <Label>
              <strong>Sex:</strong>
              {" "}
              {formatSex(params.sex)}
            </Label>
            <Control>
              <input 
                type="range" class="form-range" id="sexRange" min="0" max="1" value={params.sex || 0}
                onChange={e => setParams({...params, sex: e.target.value})}
                onMouseDown={e => {if (params.sex === undefined){setParams({...params, sex: 0})}}}
              />
            </Control>
          </Container>

          <Container>
            <Label>
              <strong>Smoker:</strong>
              {" "}
              {formatSmoker(params.smoker)}
            </Label>
            <Control>
              <input 
                type="range" className="form-range" id="smokerRange" min="0" max="1" value={params.smoker || 0}
                onChange={e => setParams({...params, smoker: e.target.value})}
                onMouseDown={e => {if (params.smoker === undefined){setParams({...params, smoker: 0})}}}
              />
            </Control>
          </Container>

          <hr/>

      </Content>
    </Page>
  )
}

const states = [ 
  "AK",
  "AL",
  "AR",
  "AZ",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "IA",
  "ID",
  "IL",
  "IN",
  "KS",
  "KY",
  "LA",
  "MA",
  "MD",
  "ME",
  "MI",
  "MN",
  "MO",
  "MS",
  "MT",
  "NC",
  "ND",
  "NE",
  "NH",
  "NJ",
  "NM",
  "NV",
  "NY",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VA",
  "VT",
  "WA",
  "WI",
  "WV",
  "WY"
]

export default Form