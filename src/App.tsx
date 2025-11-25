
import SurveyBrowser from "./components/SurveyBrowser";
import './App.css'
import SurveyView from "./components/SurveyView";
import { Outlet } from "react-router-dom";

function App() {

  return (
    <>
      <Outlet />
    </>
  )
}

export default App
