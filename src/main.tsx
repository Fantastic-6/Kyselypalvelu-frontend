import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import SurveyBrowser from './components/SurveyBrowser.tsx'
import SurveyView from './components/SurveyView.tsx'
import { createHashRouter, RouterProvider } from 'react-router'
import ResponsesView from './components/ResponsesView.tsx'
import SurveyResponsesView from './components/SurveyResponsesView.tsx'
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
      },
      {
        path: "responses",
        element: <ResponsesView />
      },
      {
        path: "survey/:id/responses",
        element: <SurveyResponsesView />
      }
    ]
  }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
