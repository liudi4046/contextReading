import { ThemeProvider } from "@emotion/react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import theme from "./theme"
import WordContext from "./context/WordContext"
import { useState } from "react"
import Test from "./pages/EpubViewer"
function App() {
  const [word, setWord] = useState("")
  const [sentence, setSentence] = useState("")

  return (
    <div className="App">
      <WordContext.Provider value={{ word, setWord, sentence, setSentence }}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/test" element={<Test />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </WordContext.Provider>
    </div>
  )
}

export default App
