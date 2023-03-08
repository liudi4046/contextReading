import { ThemeProvider } from "@emotion/react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import theme from "./theme"
import WordContext from "./context/WordContext"
import { useState } from "react"
import TextPart from "./components/TextReader"
// import Test from "./pages/Test"
import Chat from "./pages/Chat"
import NavBar from "./components/NavBar"
import SignUp from "./pages/SignUp"
function App() {
  const [word, setWord] = useState("")
  const [sentence, setSentence] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isSigningUp, setIsSigningUp] = useState(true)
  return (
    <div className="App">
      <WordContext.Provider
        value={{
          word,
          setWord,
          sentence,
          setSentence,
          isLoggedIn,
          setIsLoggedIn,
        }}
      >
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route
                path="/"
                element={isLoggedIn ? <Home /> : <Navigate to="/signup" />}
              />
              {/* <Route path="/test" element={<Test />} /> */}
              <Route
                path="/chatRoom"
                element={isLoggedIn ? <Chat /> : <Navigate to="/signup" />}
              />
              <Route path="/signup" element={<SignUp isSigningUp={true} />} />
              <Route path="/signin" element={<SignUp isSigningUp={false} />} />

              <Route
                path="/textpart"
                element={isLoggedIn ? <TextPart /> : <Navigate to="/signup" />}
              />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </WordContext.Provider>
    </div>
  )
}

export default App
