import { createTheme } from "@mui/material"
import { lightGreen } from "@mui/material/colors"
const theme = createTheme({
  palette: {
    primary: {
      light: lightGreen[100],
      main: lightGreen[500],
      dark: lightGreen[800],
    },
  },
})
export default theme
