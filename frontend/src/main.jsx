import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';

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
import DisplayPodcast from './pages/DisplayPodcast/DisplayPodcast.jsx';
import PlayerWrapper from './components/videoplayer/PlayerWrapper.jsx';
import Profile from './pages/Profile/Profile.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Dashboard />} />
      <Route path='/videoplay' element={<PlayerWrapper/>} />
      <Route path='/favorites' element={<Favorites />} />
      <Route path='/search' element={<Search />} />
      <Route path='/displaypodcasts/:type' element={<DisplayPodcast />} />
      <Route path='/profile' element={<Profile/>} />
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
    <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
      <AppWrapper />
      </Auth0Provider>
  </StrictMode>,
)
