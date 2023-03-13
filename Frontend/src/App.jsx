import * as React from "react"
import {
  ChakraProvider,
  theme as ChakraTheme
} from "@chakra-ui/react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Navbar from './Components/Layout/Navbar'
import Main from "./Components/Landing/Main";
import Report from "./Components/Report/Report";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { orange } from "@mui/material/colors";

const theme = createTheme({
  palette: {
  }
});


export const App = () => (
  <ChakraProvider theme={ChakraTheme}>
    <ThemeProvider theme={theme}>
        <Router>
          <Navbar/>
          <Switch>
            <Route exact path='/' component={Main}></Route>
            <Route path='/report' component={Report}></Route>
          </Switch>
        </Router>
    </ThemeProvider>
  </ChakraProvider>
)
