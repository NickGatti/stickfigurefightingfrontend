import { useEffect, useState, useCallback } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket';

import './App.css';
import { Arena } from './components/Arena';
import { StickLeft, StickRight } from './components/Stick';

function App() {
  const [socketUrl, setSocketUrl] = useState('ws://localhost:7071/ws');
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  const [player, setPlayer] = useState(null)
  const [stickLeftTop, setStickLeftTop] = useState("45%")
  const [stickLeftLeft, setStickLeftLeft] = useState("25%")
  const [leftSwing, setLeftSwing] = useState(false)

  const [stickRightTop, setStickRightTop] = useState("45%")
  const [stickRightLeft, setStickRightLeft] = useState("70%")
  const [rightSwing, setRightSwing] = useState(false)

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  useEffect(() => {
    document.addEventListener('keydown', detectKeyDown, true)
    return () => {
      document.removeEventListener('keydown', detectKeyDown, true);
    }
  }, [stickLeftTop, stickLeftLeft, leftSwing])

  const handleClickSendMessage = useCallback((msg) => sendMessage(msg), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  useEffect(() => {
    console.log('ESTAS', connectionStatus)
  }, [readyState])

  const detectKeyDown = e => {
    console.log('Clicked key: ', e.key)
    if (e.key === "ArrowUp") {
      let top = Number(stickLeftTop.replace('%', ''))
      setStickLeftTop(top - 1 + "%")
      handleClickSendMessage(JSON.stringify(e.key))
    }
    if (e.key === "ArrowDown") {
      let top = Number(stickLeftTop.replace('%', ''))
      setStickLeftTop(top + 1 + "%")
      handleClickSendMessage(JSON.stringify(e.key))
    }
    if (e.key === "ArrowRight") {
      let left = Number(stickLeftLeft.replace('%', ''))
      setStickLeftLeft(left + 1 + "%")
      handleClickSendMessage(JSON.stringify(e.key))
    }
    if (e.key === "ArrowLeft") {
      let left = Number(stickLeftLeft.replace('%', ''))
      setStickLeftLeft(left - 1 + "%")
      handleClickSendMessage(JSON.stringify(e.key))
    }
    if (e.key === "Control") {
      setLeftSwing(true)
      handleClickSendMessage(JSON.stringify(e.key))
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
