import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Movies from './pages/Movies';
import TVShows from './pages/TVShows';
import Netflix from './pages/Netflix';
import Player from './pages/Player';
import Signup from './pages/Signup';
import UserLiked from './pages/UserLiked';
import Transact from './components/Transact';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/player' element={<Player />} />
        <Route exact path='/movies' element={<Movies />} />
        <Route exact path='/tv' element={<TVShows />} />
        <Route exact path='/transact' element={<Transact />} />
        <Route exact path='/myList' element={<UserLiked />} />
        <Route exact path='/' element={<Netflix />} />
      </Routes>
    </BrowserRouter>
  )
};
export default App;