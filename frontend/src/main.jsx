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
import DisplayPodcast from './pages/DisplayPodcast/DisplayPodcast.jsx';
import PlayerWrapper from './components/videoplayer/PlayerWrapper.jsx';
import Profile from './pages/Profile/Profile.jsx';
import { Provider } from "react-redux";
import store from './store/store.js';
import { GoogleOAuthProvider } from '@react-oauth/google';  
import PodcastDetails from './pages/PodcastDetails/PodcastDetails.jsx';
import useTheme from './hooks/useTheme.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Dashboard />} />
      <Route path='/videoplay' element={<PlayerWrapper/>} />
      <Route path='/favorites' element={<Favorites />} />
      <Route path='/search' element={<Search />} />
      <Route path='/displaypodcasts/:type' element={<DisplayPodcast />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/podcast/:id' element={<PodcastDetails/>} />
      </Route>
  )
);


function AppWrapper() {
  const [loading, setLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [theme, saveTheme] = useTheme();

  useEffect(() => {
  // Check if it's the first time the app is loaded
  const isFirstVisit = localStorage.getItem('firstLoad') === null;

  if (isFirstVisit) {
    localStorage.setItem('firstLoad', 'false'); // Mark as visited
  }

    setIsFirstLoad(isFirstVisit);
    
    saveTheme(theme);

  // Simulate a delay to show loading animation
  setTimeout(() => {
    setLoading(false); // Hide loading screen after a certain time
  }, 2000);
    
  }, []); // This runs only once when AppWrapper is mounted

  if (loading ) {
    return <div className=" flex justify-center items-center h-screen w-full">
    <PageLoading />
  </div>; // Show loading animation
  }

  return <>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <RouterProvider router={router} />
      </Provider>
      </GoogleOAuthProvider>
  </>; // Render the router after loading
}



createRoot(document.getElementById('root')).render(
  <StrictMode>
    
      <AppWrapper />
      
  </StrictMode>,
)
