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
    setMessageHistory((prev) => prev.concat(lastMessage));
    if (lastMessage !== null) {
      const messageData = JSON.parse(lastMessage.data)
      console.log('I AM PLAYER:', player)
      console.log('SENDER WAS PLAYER:', messageData.playerNumber)
      if (messageData.playerNumber !== player) {
        if (messageData.message === "ArrowUp") {
          let top = Number(stickRightTop.replace('%', ''))
          setStickRightTop(top - 1 + "%")
        }
        if (messageData.message === "ArrowDown") {
          let top = Number(stickRightTop.replace('%', ''))
          setStickRightTop(top + 1 + "%")
        }
        if (messageData.message === "ArrowRight") {
          console.log('got here 38 app')
          let left = Number(stickRightLeft.replace('%', ''))
          setStickRightLeft(left - 1 + "%")
        }
        if (messageData.message === "ArrowLeft") {
          let right = Number(stickRightLeft.replace('%', ''))
          setStickRightLeft(right + 1 + "%")
        }
        if (messageData.message === "Control") {
          setRightSwing(true)
          setTimeout(() => {
            setRightSwing(false)
          }, 100)
        }
      }
    }

  }, [lastMessage, setMessageHistory]);

  useEffect(() => {
    if (player === null) {
      handleClickSendMessage(JSON.stringify('Player joined with: ' + player + ' player status.'))
    }
    document.addEventListener('keydown', detectKeyDown, true)
    return () => {
      document.removeEventListener('keydown', detectKeyDown, true);
    }
  }, [stickLeftTop, stickLeftLeft, leftSwing, player])

  const handleClickSendMessage = useCallback((msg) => sendMessage(msg), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  useEffect(() => {
    console.log('Connection status:', connectionStatus)
    console.log('Last message status:', lastMessage?.data)
    if (!player) {
      if (lastMessage !== null) {
        const messageData = JSON.parse(lastMessage.data)
        console.log('HEY HEY HEY 0001', messageData.playerNumber)
        setPlayer(JSON.parse(messageData.playerNumber));
      }
    }
  }, [readyState, lastMessage, player])

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
        <StickRight rightSwing={rightSwing} stickRightTop={stickRightTop} stickRightLeft={stickRightLeft}></StickRight>
      </Arena>
    </div>
  );
}

export default App;
