import { Box, Button } from "@mui/material"
import ePub from "epubjs"
import React, { useContext, useEffect, useState } from "react"
import WordContext from "../context/WordContext"
export default function EpubViewer() {
  let book
  console.log("epub")
  const [rendition, setRendition] = useState(null)
  const handleEpubClick = async () => {
    if (rendition) return
    try {
      console.log("ci")
      book = ePub(
        `${process.env.REACT_APP_BACKEND_URL}/api/getepub/sample.epub`,{
          mode: 'cors',
        }
      )

      let newRendition = book.renderTo("area", {
        method: "continuous",
        width: "500px",
        height: "500px",
      })
      console.log(book)
      newRendition.themes.default({ p: { "font-size": "large !important" } })
      await newRendition.display()

      setRendition(newRendition)
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleFrontClick = () => {
    rendition.prev() // move to the next page
    // setTemp(temp + 1)
  }

  const handleBackClick = () => {
    rendition.next() // move to the previous page
    // setTemp(temp + 1)
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        gap: 3,
        // backgroundColor: "primary.main",
      }}
    >
      <Box
        id="area"
        sx={{
          width: "70%",
          height: "100%",
          // backgroundColor: "primary.main",
          // border: "solid 1px",
          display: "flex",
          pt: 5,
          justifyContent: "center",
        }}
      ></Box>
      <Box
        sx={{
          alignSelf: "center",
          display: "flex",
          gap: 3,
        }}
      >
        <Button onClick={handleEpubClick} variant="contained">
          加载图书
        </Button>
        <Button onClick={handleFrontClick} variant="contained">
          前一页
        </Button>
        <Button
          onClick={handleBackClick}
          variant="contained"
          sx={{
            backgroundColor: "primary.light",
          }}
        >
          后一页
        </Button>
      </Box>
    </Box>
  )
}
