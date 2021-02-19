import React, { useEffect, useState }  from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import Plot from 'react-plotly.js';

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
          charges
          #children
        }
      }
    }
  }
`

const Page = styled.div`
  position: fixed;
  top: 0; bottom: 0;
  left: 0; right: 0;
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

const Heading = styled.h1`
  margin-top: 2em;
`

const Analysis = (props) => {
  const [data,setData] = useState([])

  useEffect(() => {
    setData(props.data.allInsuranceCsv.edges)
  }, [])

  return (
    <Page>
      <Content>
        <Heading>Analysis</Heading>
        {data.length > 0 && (
          <>
            <FeatureHeatmap data={data}/>
            <AgeCostScatter data={data}/>
            <BmiCostScatter data={data}/>
            <MaleFemaleBoxPlot data={data}/>
          </>
        )}
      </Content>
    </Page>
  )
}

function AgeCostScatter(props) {
  const [data, setData] = useState(props.data);
  const [x, setX] = useState([]);
  const [y, setY] = useState([]);
  const [xs, setXs] = useState([]);
  const [ys, setYs] = useState([]);

  useEffect(() => {
      var x = [];
      var y = [];
      var xs = [];
      var ys = [];

      for (var row in data) {
          if (data[row].node.smoker === 'no') {
              x.push(data[row].node.age);
              y.push(data[row].node.charges);
          } else {
              xs.push(data[row].node.age);
              ys.push(data[row].node.charges);
          }
      }
      setX(x);
      setY(y);
      setXs(xs);
      setYs(ys);
  }, []);

  return (
      <div>
          <div>
              {data.length > 0 && x.length > 0 && y.length > 0 &&
                  <Plot
                      data={[
                      {
                          x: xs,
                          y: ys,
                          type: 'scatter',
                          mode: 'markers',
                          name: 'smoker',
                          marker: {color: 'red'},
                      },
                      {
                          x: x,
                          y: y,
                          type: 'scatter',
                          mode: 'markers',
                          name: 'non-smoker',
                          marker: {color: 'green'},
                      },
                      ]}
                      layout={ {
                          width: '100%',
                          xaxis: {
                              title: "Age"
                          },
                          yaxis: {
                              title: "Charges"
                          },
                          autosize: true,
                          width: 500,
                          legend: {x: 0, y: 50, orientation: "h", yanchor:"top"},
                          title: "Relationship between 'Age' and 'Risk'"
                      } }
                      config={{responsive: true}}
                  />
              }
          </div>
      </div>
  )
}

function BmiCostScatter(props) {
  const [data, setData] = useState(props.data);
  const [x, setX] = useState([]);
  const [y, setY] = useState([]);
  const [xs, setXs] = useState([]);
  const [ys, setYs] = useState([]);

  useEffect(() => {
      var x = [];
      var y = [];
      var xs = [];
      var ys = [];

      for (var row in data) {
          if (data[row].node.smoker === 'no') {
              x.push(data[row].node.bmi);
              y.push(data[row].node.charges);
          } else {
              xs.push(data[row].node.bmi);
              ys.push(data[row].node.charges);
          }
      }
      setX(x);
      setY(y);
      setXs(xs);
      setYs(ys);

  }, []);

  return (
      <div>
          <div>
              {data.length > 0 && x.length > 0 && y.length > 0 &&
                  <Plot
                      data={[
                      {
                          x: xs,
                          y: ys,
                          type: 'scatter',
                          mode: 'markers',
                          name: 'smoker',
                          marker: {color: 'orange'},
                      },
                      {
                          x: x,
                          y: y,
                          type: 'scatter',
                          mode: 'markers',
                          name: 'non-smoker',
                          marker: {color: 'blue'},
                      },
                      ]}
                      layout={ {
                          width: '100%',
                          xaxis: {
                              title: "Bmi"
                          },
                          yaxis: {
                              title: "Charges"
                          },
                          width: 500,
                          autosize: true,
                          legend: {x: 0, y: 50, orientation: "h", yanchor:"top"},
                          title: "Relationship between 'Body Mass Index' and 'Risk'"
                      } }
                      config={{responsive: true}}
                  />
              }
          </div>
      </div>
  )
}

function MaleFemaleBoxPlot(props) {
  const [data, setData] = useState(props.data);
  const [x, setX] = useState([]);
  const [y, setY] = useState([]);
  const [xs, setXs] = useState([]);
  const [ys, setYs] = useState([]);

  useEffect(() => {
      var x = [];
      var y = [];
      var xs = [];
      var ys = [];

      for (var row in data) {
          if (data[row].node.smoker === 'no') {
              x.push(data[row].node.sex);
              y.push(data[row].node.charges);
          } else {
              xs.push(data[row].node.sex);
              ys.push(data[row].node.charges);
          }
      }
      setX(x);
      setY(y);
      setXs(xs);
      setYs(ys);

  }, []);

  return (
      <div>
          <div>
              {data.length > 0 && x.length > 0 && y.length > 0 &&
                  <Plot
                      data={[
                      {
                          x: xs,
                          y: ys,
                          type: 'box',
                          name: 'smoker',
                          boxpoints: 'all'
                      },
                      {
                          x: x,
                          y: y,
                          type: 'box',
                          name: 'non-smoker',
                          boxpoints: 'all',
                      },
                      ]}
                      layout={ {
                          width: '100%',
                          xaxis: {
                              title: "Sex"
                          },
                          yaxis: {
                              title: "Charges"
                          },
                          autosize: true,
                          width: 500,
                          legend: {x: 0, y: 50, orientation: "h", yanchor:"top"},
                          title: "Relationship between 'Sex' and 'Risk'"
                      } }
                      config={{responsive: true}}
                  />
              }
          </div>
      </div>
  )
}

function FeatureHeatmap(props) {
  const [data, setData] = useState(props.data);

  return (
      <div>
          <div>
              {data.length > 0 &&
                  <Plot
                      data={[
                      {
                        z: [[1.000000, -0.020856,  0.109272,  0.042469, -0.025019,  0.002127,  0.299008],
                            [-0.020856,  1.000000,  0.046371,  0.017163,  0.076185,  0.004588,  0.057292],
                            [0.109272,  0.046371,  1.000000,  0.012759,  0.003750,  0.157566,  0.198341],
                            [0.042469,  0.017163,  0.012759,  1.000000,  0.007673,  0.016569,  0.067998],
                            [-0.025019,  0.076185,  0.003750,  0.007673,  1.000000, -0.002181,  0.787251],
                            [0.002127,  0.004588,  0.157566,  0.016569, -0.002181,  1.000000, -0.006208],
                            [0.299008,  0.057292,  0.198341,  0.067998,  0.787251, -0.006208,  1.000000]],
                          x: Object.keys(props.data[0].node),
                          y: Object.keys(props.data[0].node),
                        type: 'heatmap',
                      },
                      ]}
                      layout={ {
                          width: 500,
                          autosize: true,
                          title: "Heatmap of Features"
                      }}
                      config={{responsive: true}}
                  />
              }
          </div>
      </div>
  )
}

export default Analysis