import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter ,RouterProvider } from 'react-router-dom';

import Home from './pages/home.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Favoriotos from './pages/Favoritos.jsx';


const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    errorElement: <ErrorPage/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
     {
        path:'/favoritos',
        element:<Favoriotos/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
