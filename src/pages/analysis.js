import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import Plot from "react-plotly.js"

export const Query = graphql`
  query {
    allInsuranceCsv {
      edges {
        node {
          age
          sex
          bmi
          smoker
          region
          risk
          #children
        }
      }
    }
  }
`

const Page = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: scroll;
`

const Content = styled.div`
  margin: 0 auto;
  padding: 20px;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PlotContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Heading = styled.h1`
  margin-top: 2em;
`

const Analysis = ({ data }) => {
  if(!data) return null
  return (
    <Page>
      <Content>
        <Heading>Analysis</Heading>
        { data 
            ? 
              <>
                <FeatureHeatmap data={data} />
                <AgeCostScatter data={data} />
                <BmiCostScatter data={data} />
                <MaleFemaleBoxPlot data={data} />
              </> 
            : 
              <>Nope</> 
        }
      </Content>
    </Page>
  )
}

function AgeCostScatter({ data }) {
  const [x, setX] = useState([])
  const [y, setY] = useState([])
  const [xs, setXs] = useState([])
  const [ys, setYs] = useState([])

  useEffect(() => {
    var x = []
    var y = []
    var xs = []
    var ys = []

    const edges = data.allInsuranceCsv.edges

    for (var row in edges) {
      if (edges[row].node.smoker === "no") {
        x.push(edges[row].node.age)
        y.push(edges[row].node.risk)
      } else {
        xs.push(edges[row].node.age)
        ys.push(edges[row].node.risk)
      }
    }

    setX(x)
    setY(y)
    setXs(xs)
    setYs(ys)
  }, [data])

  return (
    <PlotContainer>
      {x.length > 0 && y.length > 0 && (
        <Plot
          data={[
            {
              x: xs,
              y: ys,
              type: "scatter",
              mode: "markers",
              name: "smoker",
              marker: { color: "red" },
            },
            {
              x: x,
              y: y,
              type: "scatter",
              mode: "markers",
              name: "non-smoker",
              marker: { color: "green" },
            },
          ]}
          useResizeHandler
          style={{ width: "100%", height: "100%" }}
          layout={{
            xaxis: {
              title: "Age",
            },
            yaxis: {
              title: "Risk",
            },
            legend: { orientation: "h", y: 0, yanchor: "top" },
            title: "Age vs Risk",
          }}
        />
      )}
    </PlotContainer>
  )
}

function BmiCostScatter({ data }) {
  const [x, setX] = useState([])
  const [y, setY] = useState([])
  const [xs, setXs] = useState([])
  const [ys, setYs] = useState([])

  useEffect(() => {
    var x = []
    var y = []
    var xs = []
    var ys = []

    const edges = data.allInsuranceCsv.edges

    for (var row in edges) {
      if (edges[row].node.smoker === "no") {
        x.push(edges[row].node.bmi)
        y.push(edges[row].node.risk)
      } else {
        xs.push(edges[row].node.bmi)
        ys.push(edges[row].node.risk)
      }
    }
    setX(x)
    setY(y)
    setXs(xs)
    setYs(ys)
  }, [data])

  return (
    <PlotContainer>
      {x.length > 0 && y.length > 0 && (
        <Plot
          data={[
            {
              x: xs,
              y: ys,
              type: "scatter",
              mode: "markers",
              name: "smoker",
              marker: { color: "orange" },
            },
            {
              x: x,
              y: y,
              type: "scatter",
              mode: "markers",
              name: "non-smoker",
              marker: { color: "blue" },
            },
          ]}
          useResizeHandler
          style={{ width: "100%", height: "100%" }}
          layout={{
            xaxis: {
              title: "Age",
            },
            yaxis: {
              title: "Risk",
            },
            legend: { orientation: "h", y: 0, yanchor: "top" },
            title: "BMI vs Risk",
          }}
        />
      )}
    </PlotContainer>
  )
}

function MaleFemaleBoxPlot({ data }) {
  const [x, setX] = useState([])
  const [y, setY] = useState([])
  const [xs, setXs] = useState([])
  const [ys, setYs] = useState([])

  useEffect(() => {
    var x = []
    var y = []
    var xs = []
    var ys = []

    const edges = data.allInsuranceCsv.edges

    for (var row in edges) {
      if (edges[row].node.smoker === "no") {
        x.push(edges[row].node.sex)
        y.push(edges[row].node.risk)
      } else {
        xs.push(edges[row].node.sex)
        ys.push(edges[row].node.risk)
      }
    }
    setX(x)
    setY(y)
    setXs(xs)
    setYs(ys)
  }, [data])

  return (
    <PlotContainer>
      {x.length > 0 && y.length > 0 && (
        <Plot
          data={[
            {
              x: xs,
              y: ys,
              type: "box",
              name: "smoker",
              boxpoints: "all",
            },
            {
              x: x,
              y: y,
              type: "box",
              name: "non-smoker",
              boxpoints: "all",
            },
          ]}
          useResizeHandler
          style={{ width: "100%", height: "100%" }}
          layout={{
            xaxis: {
              title: "Age",
            },
            yaxis: {
              title: "Risk",
            },
            legend: { orientation: "h", y: 0, yanchor: "top" },
            title: "Sex vs Risk",
          }}
        />
      )}
    </PlotContainer>
  )
}

function FeatureHeatmap({ data }) {
  const [x, setX] = useState(undefined)
  const [y, setY] = useState(undefined)

  useEffect(() => {
    const edges = data.allInsuranceCsv.edges

    setX(edges[0].node)
    setY(edges[0].node)
  }, [data])

  return (
    <PlotContainer>
      {x && y ?
        <Plot
          data={[
            {
              z: [
                [
                  1.0,
                  -0.020856,
                  0.109272,
                  0.042469,
                  -0.025019,
                  0.002127,
                  0.299008,
                ],
                [
                  -0.020856,
                  1.0,
                  0.046371,
                  0.017163,
                  0.076185,
                  0.004588,
                  0.057292,
                ],
                [
                  0.109272,
                  0.046371,
                  1.0,
                  0.012759,
                  0.00375,
                  0.157566,
                  0.198341,
                ],
                [
                  0.042469,
                  0.017163,
                  0.012759,
                  1.0,
                  0.007673,
                  0.016569,
                  0.067998,
                ],
                [
                  -0.025019,
                  0.076185,
                  0.00375,
                  0.007673,
                  1.0,
                  -0.002181,
                  0.787251,
                ],
                [
                  0.002127,
                  0.004588,
                  0.157566,
                  0.016569,
                  -0.002181,
                  1.0,
                  -0.006208,
                ],
                [
                  0.299008,
                  0.057292,
                  0.198341,
                  0.067998,
                  0.787251,
                  -0.006208,
                  1.0,
                ],
              ],
              x: Object.keys(x),
              y: Object.keys(y),
              type: "heatmap",
            },
          ]}
          useResizeHandler
          style={{ width: "100%", height: "100%" }}
          layout={{ title: "Heatmap of Features" }}
        />
      :
        <></>
      }
    </PlotContainer>
  )
}

export default Analysis
