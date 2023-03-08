import { Button, TextField } from "@mui/material"
import { Box } from "@mui/system"
import React, { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import WordContext from "../context/WordContext"

export default function SignUp({ isSigningUp }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { isLoggedIn, setIsLoggedIn } = useContext(WordContext)

  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token && reqTokenValidation(token)) {
      setIsLoggedIn(true)
      navigate("/")
    }
  }, [])

  const reqTokenValidation = async (token) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/tokenvalidation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      )
      const data = await response.json()
      console.log(data)
      return data.isValid
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (e) => {
    console.log("提交")
    e.preventDefault()
    const reqSignUp = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({ email, password }),
          }
        )
        const data = await response.json()
        if (!response.ok) {
          throw new Error(
            `error! response status:${response.status}\n error message:${data.message}`
          )
        }

        if (data.message === "注册成功") {
          localStorage.setItem("token", data.token)
          alert("注册成功")
          setIsLoggedIn(true)
          navigate("/")
        }
      } catch (error) {
        console.log(error)
        alert("注册失败")
      }
    }
    reqSignUp()
  }
  const handleSignIn = (e) => {
    console.log("提交")
    e.preventDefault()
    const reqSignIn = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/signin`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({ email, password }),
          }
        )
        const data = await response.json()
        if (!response.ok) {
          throw new Error(
            `error! response status:${response.status}\n error message:${data.message}`
          )
        }

        if (data.message === "登录成功") {
          localStorage.setItem("token", data.token)
          alert("登录成功")
          setIsLoggedIn(true)
          navigate("/")
        }
      } catch (error) {
        console.log(error)
        alert("登录失败")
      }
    }
    reqSignIn()
  }
  return (
    <div className="signup">
      <h1>{isSigningUp ? "注册" : "登录"}</h1>
      <div>
        <form
          onSubmit={(e) => {
            if (isSigningUp) handleSubmit(e)
            else {
              handleSignIn(e)
            }
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div>
              <TextField
                label="邮箱"
                sx={{
                  color: "white",
                  backgroundColor: "primary.light",
                  borderRadius: "5px",
                }}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
              />
            </div>

            <div style={{ marginTop: "1em" }}>
              <TextField
                label="密码"
                type="password"
                sx={{
                  color: "white",
                  backgroundColor: "primary.light",
                  borderRadius: "5px",
                }}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <Button variant="contained" type="submit" margintop="20px">
              提交
            </Button>
          </Box>
        </form>
      </div>
      <Link
        to="/signin"
        style={{
          textDecoration: "underline",
          color: "white",
          position: "absolute",
          left: "53vw",
          bottom: 0,
        }}
      >
        {isSigningUp ? "已经有账号了" : null}
      </Link>
    </div>
  )
}
