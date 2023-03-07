import { Button, TextField } from "@mui/material"
import { Box } from "@mui/system"
import React, { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import TextReader from "../components/TextReader"

export default function Home() {
  const [isChatRoom, setIsChatRoom] = useState(false)
  const navigate = useNavigate()
  const goChatRoom = () => {
    navigate("/chatRoom")
  }
  return (
    <div className="home">
      <Button variant="contained" onClick={goChatRoom}>
        ChatRoom
      </Button>
    </div>
  )
}
