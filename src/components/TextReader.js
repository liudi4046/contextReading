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
    const prompt = `explain the words ${word} in:${sentence}`
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
      if (res.status === 400) {
        throw new Error(data.error)
      }
      console.log(data)
      setisLoading(false)
      setExplain(data.text)
    } catch (error) {
      console.log(error.message)
      setError(error.message)
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
  // if (error) console.log(error.message.error)
  return (
    <Box sx={{ height: "90vh", position: "relative", display: "flex" }}>
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
            display: "flex",
            borderColor: "primary.dark",
            justifyContent: "center",
            alignItems: "center",
            height: "500px",
            overflowY: "auto",
            whiteSpace: "pre-wrap",
            backgroundColor: "#d7ccc8",
          }}
        >
          {isEpub && <EpubViewer />}
          {!file && !isEpub && (
            <Box
              sx={{
                display: "flex",
                gap: 30,
                backgroundColor: "primary.light",
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
                backgroundColor: "#d7ccc8",
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
                backgroundColor: "#d7ccc8",
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
          backgroundColor: "#d7ccc8",
        }}
      >
        {error && <Typography>{error}</Typography>}
        {isloading && <Typography>Loading...</Typography>}
        <Typography fontSize="large">{explain}</Typography>
      </Box>
    </Box>
  )
}
