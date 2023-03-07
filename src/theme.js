import { createTheme } from "@mui/material"
import { lightGreen } from "@mui/material/colors"
const theme = createTheme({
  palette: {
    primary: {
      main: "#8d6e63",
    },
  },
  typography: {
    fontFamily: "Noto Sans SC, sans-serif",
    fontWeightRegular: 400,
    fontWeightBold: 700,
  },
})
export default theme
