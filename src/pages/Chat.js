import { Box, Button } from "@mui/material"
import React from "react"
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition"

export default function Chat() {
  const { transcript, resetTranscript } = useSpeechRecognition({})

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  return (
    <div className="chat">
      <div className="chatBox"></div>
      <div className="inputBox">{transcript}</div>
      <div className="buttons">
        <Button
          onClick={() => SpeechRecognition.startListening({ continuous: true })}
        >
          Start
        </Button>
        <Button onClick={SpeechRecognition.stopListening}>Stop</Button>
        <Button onClick={resetTranscript}>Reset</Button>
      </div>
    </div>
  )
}
