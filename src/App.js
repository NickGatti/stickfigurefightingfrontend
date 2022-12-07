import { useEffect, useState } from 'react'

import './App.css';
import { Arena } from './components/Arena';
import { StickLeft, StickRight } from './components/Stick';

function App() {
  const [player, setPlayer] = useState(null)
  const [stickLeftTop, setStickLeftTop] = useState("45%")
  const [stickLeftLeft, setStickLeftLeft] = useState("25%")
  const [leftSwing, setLeftSwing] = useState(false)

  let stickRightTop = "45%"
  let stickRightLeft = "70%"

  useEffect(() => {
    const  fetchPlayerStatus = async () => {
      const res = await fetch('/player', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET',
      })

      const playerResponse = await res.json()
      return await playerResponse
    }

    fetchPlayerStatus()
      .then(res => {
        console.log(res)
        setPlayer(res)
      })
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', detectKeyDown, true)
  }, [stickLeftTop, stickLeftLeft, leftSwing])

  const detectKeyDown = e => {
    console.log('Clicked key: ', e.key)
    if (e.key === "ArrowUp") {
      let top = Number(stickLeftTop.replace('%', ''))
      setStickLeftTop(top - 1 + "%")
    }
    if (e.key === "ArrowDown") {
      let top = Number(stickLeftTop.replace('%', ''))
      setStickLeftTop(top + 1 + "%")
    }
    if (e.key === "ArrowRight") {
      let left = Number(stickLeftLeft.replace('%', ''))
      setStickLeftLeft(left + 1 + "%")
    }
    if (e.key === "ArrowLeft") {
      let left = Number(stickLeftLeft.replace('%', ''))
      setStickLeftLeft(left - 1 + "%")
    }
    if (e.key === "Control") {
      setLeftSwing(true)
      setTimeout(() => {
        setLeftSwing(false)
      }, 100)
    }
    document.removeEventListener("keydown", detectKeyDown, true)
  }

  return (
    <div className="App">
      <Arena>
        <StickLeft leftSwing={leftSwing} stickLeftTop={stickLeftTop} stickLeftLeft={stickLeftLeft}></StickLeft>
        <StickRight stickRightTop={stickRightTop} stickRightLeft={stickRightLeft}></StickRight>
      </Arena>
    </div>
  );
}

export default App;
