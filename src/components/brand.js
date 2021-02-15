import React, { useState, useContext } from "react"
import { motion } from "framer-motion"
import { Context } from "../components/context"
import styled from "styled-components"

const Text = styled(motion.div)`
  margin-left: 10px;
`

const Brand = ({cbClick}) => {
  const [hovered,setHovered] = useState(false)
  const {globalContext,setGlobalContext} = useContext(Context)

  function onClick(e,path) {
    e.preventDefault()
    setGlobalContext(prev => ({...prev, path: path}))
  }

  return (
    <div id="brand"
      onClick={e => onClick(e,"/")}
      onMouseEnter={() => { setHovered(true) }}
      onMouseLeave={() => { setHovered(false) }}
      style={{
        display: "flex", 
        cursor: "pointer",
        alignItems: "center"
      }}
    >
      <svg 
        width="40px" 
        height="48px" 
        viewBox="0 0 48 48"
      >
        <motion.path 
          name="hexagon"
          fill="#bf00ff"
          animate={{ rotate: hovered ? 180 : 0 }}
          transition={{ duration: .5 }}
          d="M 47.383 21.898 C 48.206 23.298 48.206 24.699 
          47.383 26.1 L 37.54 42.899 C 36.717 44.3 35.487 45 
          33.846 45 L 14.154 45.001 C 12.514 45.001 11.283 
          44.301 10.463 42.901 L 0.617 26.102 C -0.206 24.701 
          -0.206 23.3 0.617 21.9 L 10.461 5.1 C 11.281 3.7 
          12.512 3.001 14.152 3.001 L 33.844 3 C 35.485 3 
          36.715 3.699 37.538 5.098 Z M 35.262 8.275 C 34.577 
          7.111 33.555 6.529 32.19 6.529 L 15.807 6.53 C 14.443 
          6.53 13.419 7.112 12.737 8.276 L 4.547 22.254 C 3.863 
          23.418 3.864 24.584 4.548 25.749 L 12.738 39.724 C 
          13.42 40.889 14.444 41.47 15.808 41.47 L 32.191 
          41.469 C 33.556 41.469 34.578 40.888 35.263 39.723 L 
          43.452 25.747 C 44.137 24.582 44.136 23.416 43.451 22.252 Z" 
        />
        <motion.path 
          name="letter"
          fill="#000"
          animate={{ scale: hovered ? 1.1 : 1 }}
          transition={{ duration: .25 }}
          d="M 25.82 31.195 L 22.18 31.195 L 22.18 23.575 C 22.18
          22.288 22.057 21.375 21.81 20.835 C 21.57 20.295 21.067 
          20.025 20.3 20.025 C 19.667 20.025 19.153 20.198 18.76 
          20.545 C 18.367 20.885 18.07 21.328 17.87 21.875 L 17.87 
          31.195 L 14.23 31.195 L 14.23 17.195 L 17.05 17.195 L 
          17.47 19.045 L 17.59 19.045 C 18.017 18.445 18.56 17.922 
          19.22 17.475 C 19.887 17.028 20.743 16.805 21.79 16.805 
          C 22.683 16.805 23.413 16.985 23.98 17.345 C 24.553 17.712 
          24.997 18.325 25.31 19.185 C 25.743 18.458 26.297 17.878 
          26.97 17.445 C 27.637 17.018 28.447 16.805 29.4 16.805 C 
          30.187 16.805 30.853 16.898 31.4 17.085 C 31.953 17.272 
          32.403 17.592 32.75 18.045 C 33.097 18.505 33.353 19.118 
          33.52 19.885 C 33.687 20.652 33.77 21.622 33.77 22.795 L 
          33.77 31.195 L 30.13 31.195 L 30.13 23.325 C 30.13 22.225 
          30.013 21.398 29.78 20.845 C 29.547 20.298 29.03 20.025 
          28.23 20.025 C 27.577 20.025 27.057 20.202 26.67 20.555 
          C 26.29 20.908 26.007 21.395 25.82 22.015 L 25.82 31.195 Z" 
        />
      </svg>
      <Text 
          animate={{ 
            scale: hovered ? 1.1 : 1,
            color: hovered ? "#BF00FF" : "#000",
          }}
          transition={{ duration: .25 }}
      >
          MedLearn
      </Text>
    </div>
  )
}

export default Brand
