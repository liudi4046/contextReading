import React, { useContext, useEffect, useState } from "react"
import { Configuration, OpenAIApi } from "openai"
import WordContext from "../context/WordContext"
import { Typography } from "@mui/material"

export default function Explaination() {
  const { word, sentence } = useContext(WordContext)
  const [explain, setExplain] = useState("")
  const requestOpenai = async () => {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    })
    const openai = new OpenAIApi(configuration)
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `explain the word ${word} in this passage ${sentence}`,
        max_tokens: 7,
        temperature: 0,
      })
      setExplain(response["choices"][0]["text"])
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    requestOpenai()
  }, [])
  return (
    <Box>
      <Typography>{explain}</Typography>
    </Box>
  )
}
