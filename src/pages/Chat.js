import { Box, Button } from "@mui/material"
import React, { useEffect, useState } from "react"
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition"
import { io } from "socket.io-client"
import useFetch from "../hooks/useFetch"

export default function Chat() {
  const { transcript, resetTranscript } = useSpeechRecognition({})
  const [socket1, setSocket1] = useState(null)
  const [socket2, setSocket2] = useState(null)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [restructureText, setRestructureText] = useState("")
  const [source, setSource] = useState(null)
  const [isLoading, setIsloading] = useState(false)
  const [isConnecting, setIsConnecting] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
  useEffect(() => {
    const connectServer = async (isRestructure) => {
      const ws = new WebSocket(
        `wss://liudi4046-scaling-waffle-r6rq44gjr7xcxxqx-4001.preview.app.github.dev/`
      )
      if (!isRestructure) {
        setSocket1(ws)
      } else {
        setSocket2(ws)
      }

      ws.binaryType = "arraybuffer"
      if (!isRestructure) {
      }
      ws.onopen = () => {
        setIsConnecting(false)
        if (isRestructure) {
          console.log("WebSocket restructure connection opened")
        } else {
          console.log("WebSocket connection opened")
        }
      }
      setInterval(() => {
        ws.send("keep-alive")
      }, 30000)

      ws.onmessage = (event) => {
        const message = event.data
        if (typeof message === "string" && !isRestructure) {
          // 接收文本消息
          setIsloading(false)
          setMessages((prev) => [...prev, message])
          console.log("received conversation text message: ", message)
        } else if (typeof message === "string" && isRestructure) {
          //接受restructure text
          setRestructureText(message)
          console.log("received restructure text message: ", message)
        } else {
          // 接收音频文件
          const audioContext = new AudioContext()
          const arrayBuffer = message
          const dataView = new DataView(arrayBuffer)
          const audioData = new Uint8Array(arrayBuffer, 0, dataView.byteLength)
          // console.log("received audio data:", audioData)
          audioContext.decodeAudioData(audioData.buffer).then((decodedData) => {
            const source = audioContext.createBufferSource()
            setSource(source)
            source.buffer = decodedData
            source.connect(audioContext.destination)
            source.start()
          })
        }
      }

      ws.onerror = (error) => {
        console.error("WebSocket error: ", error)
      }
    }
    connectServer(false)
    connectServer(true)
    return () => {
      socket1.close()
    }
  }, [])
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }
  const submitTranscript = () => {
    socket1.send("give me short or meduim length response: " + transcript)
    setIsloading(true)
    resetTranscript()
  }

  const hideTranscript = () => {}
  const restructureTranscript = () => {
    setRestructureText("")
    socket2.send("restructure this sentence in english:" + transcript)
  }
  const stopAudio = () => {
    source.stop()
  }
  return (
    <div className="wrapper">
      <div className="chat">
        <div className="chatBox">
          {isConnecting && <div>正在连接服务器...</div>}
          {!isConnecting && messages.length === 0 && (
            <div>连接成功，请点击"开始说话"按钮</div>
          )}
          {messages.map((message) => {
            return (
              <div>
                <div>{message}</div>
                <br />
              </div>
            )
          })}
          {isLoading && <div>正在生成中...</div>}
        </div>

        <div
          className="inputBox"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        >
          {transcript}
        </div>

        <div className="buttons">
          <Button
            variant="contained"
            onClick={() => {
              SpeechRecognition.startListening({ continuous: true })
              setIsRecording(true)
            }}
          >
            开始说话
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setIsRecording(false)
              SpeechRecognition.stopListening()
            }}
          >
            停止说话
          </Button>
          <Button variant="contained" onClick={resetTranscript}>
            清空输入框
          </Button>
          <Button variant="contained" onClick={submitTranscript}>
            提交文本
          </Button>
          {/* <Button variant="contained" onClick={hideTranscript}>
            隐藏
          </Button> */}
          <Button variant="contained" onClick={restructureTranscript}>
            帮你组织语言
          </Button>
          <Button variant="contained" onClick={stopAudio}>
            停止音频
          </Button>
        </div>
      </div>
      <div className="restructureBox">你可以这么说：{restructureText}</div>
    </div>
  )
}
