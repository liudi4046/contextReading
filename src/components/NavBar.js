import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { useNavigate } from "react-router-dom"
import WordContext from "../context/WordContext"
export default function NavBar() {
  const { isLoggedIn, setIsLoggedIn } = React.useContext(WordContext)
  const navigate = useNavigate()
  const Logout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("token")
  }
  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              ":hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => navigate("/")}
          >
            Home
          </Typography>
          {isLoggedIn && (
            <Button color="inherit" onClick={Logout}>
              登出
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
