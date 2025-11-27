import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import SurveyBrowser from './components/SurveyBrowser.tsx'
import SurveyView from './components/SurveyView.tsx'
import { createHashRouter, RouterProvider } from 'react-router'
const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <SurveyBrowser />,
        index: true
      },
      {
        path: "survey/:id",
        element: <SurveyView /> 
      }
    ]
  }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
