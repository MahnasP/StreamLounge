import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Favorites from './pages/Favorites/Favorites.jsx';
import Search from './pages/Search/Search.jsx';
import PageLoading from './components/PageLoading.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Dashboard />} />
      <Route path='/favorites' element={<Favorites />} />
      <Route path='/search' element={<Search/>}/>
      </Route>
  )
);


function AppWrapper() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []); // This runs only once when AppWrapper is mounted

  if (loading) {
    return <div className=" flex justify-center items-center h-screen w-full">
    <PageLoading />
  </div>; // Show loading animation
  }

  return <RouterProvider router={router} />; // Render the router after loading
}



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper/>
  </StrictMode>,
)
