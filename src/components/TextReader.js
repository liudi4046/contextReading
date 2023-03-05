import { Button, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React, { useContext, useEffect } from "react"
import { useState } from "react"
import Dropzone from "react-dropzone"
import WordContext from "../context/WordContext"
import EpubViewer from "../pages/EpubViewer"
import ePub from "epubjs"
export default function TextPart() {
  const [file, setFile] = useState(null)
  const [isEpub, setIsEpub] = useState(false)
  const [fileData, setFileData] = useState(null)
  const { word, setWord, sentence, setSentence } = useContext(WordContext)
  const [explain, setExplain] = useState("")
  const [isloading, setisLoading] = useState(null)
  const [error, setError] = useState(null)
  const requestOpenai = async () => {
    const prompt = `${sentence}`
    setisLoading(true)
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/chatgpt`,
        {
          method: "POST",
          body: JSON.stringify({ prompt }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      const data = await res.json()
      console.log(data)
      setisLoading(false)
      setExplain(data.text)
      console.log("1",data)
    } catch (error) {
      console.log(error.message)
      setError(error)
      setisLoading(false)
    }
  }

  const handleFileUpload = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
      const reader = new FileReader()
      reader.onload = (e) => {
        setFileData(e.target.result)
      }
      reader.readAsText(acceptedFiles[0], "UTF-8")
    }
  }
  const handleSubmit = (e) => {
    console.log(234)
    e.preventDefault()
    setExplain(null)
    requestOpenai()
  }
  const handleEpubClick = (e) => {
    setIsEpub(true)
  }

  console.log(word)
  console.log(sentence)
  return (
    <Box sx={{ height: "97vh", position: "relative", display: "flex" }}>
      <Box
        sx={{
          flex: 3,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            border: "solid",
            borderColor: "primary.dark",
            justifyContent: "center",
            alignItems: "center",
            height: "85%",
            display: "flex",
          }}
        >
          {isEpub && <EpubViewer />}
          {!file && !isEpub && (
            <Box
              sx={{
                display: "flex",
                gap: 30,
              }}
            >
              <Box>
                <Dropzone onDrop={handleFileUpload} accept=".txt">
                  {({ getRootProps, getInputProps }) => (
                    <Box {...getRootProps()} className="dropzone">
                      <input {...getInputProps()} />
                      <Typography
                        variant="h5"
                        sx={{
                          textDecoration: "underline",
                          color: "primary.dark",
                          ":hover": {
                            cursor: "pointer",
                            color: "primary.main",
                          },
                        }}
                      >
                        Click to select a TXT file
                      </Typography>
                    </Box>
                  )}
                </Dropzone>
              </Box>

              <Box>
                <Typography
                  variant="h5"
                  onClick={() => handleEpubClick()}
                  sx={{
                    textDecoration: "underline",
                    color: "primary.dark",
                    ":hover": {
                      cursor: "pointer",
                      color: "primary.main",
                    },
                  }}
                >
                  Click here to upload epub
                </Typography>
                <Box id="area"></Box>
              </Box>
            </Box>
          )}

          {file && (
            <Box
              sx={{
                display: "flex",
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  height: "95%",
                  overflow: "auto",
                  padding: "16px",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    color: "primary.dark",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  Selected file: {file.name}
                  {fileData && (
                    <div>
                      <p>File data:</p>

                      <Typography fontSize="large">{fileData}</Typography>
                    </div>
                  )}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>

        <form onSubmit={(e) => handleSubmit(e)}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              p: 2,
            }}
          >
            <TextField
              id="outlined-basic"
              label="输入文中不会的句子或单词"
              variant="filled"
              sx={{
                width: 300,
              }}
              onChange={(e) => setWord(e.target.value)}
              value={word}
            />
            <TextField
              id="filled-basic"
              label="输入要在哪一个句子或段落中解释"
              variant="filled"
              sx={{
                ml: 1,
                width: 300,
              }}
              onChange={(e) => setSentence(e.target.value)}
              value={sentence}
            />
            <Button
              variant="contained"
              sx={{
                fontSize: 25,
              }}
              type="submit"
            >
              提交
            </Button>
          </Box>
        </form>
      </Box>
      <Box
        sx={{
          flex: 1,
          border: "solid 3px",
          borderColor: "primary.dark",
          padding: 2,
        }}
      >
        {error && <Typography>{error.message.error}</Typography>}
        {isloading && <Typography>Loading...</Typography>}
        <Typography fontSize="large">{explain}</Typography>
      </Box>
    </Box>
  )
}
