import { useState } from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Signup from './components/Signup'
import Login from './components/Login'
import AddRecipe from './components/AddRecipe'
import Landing from './components/Landing'
import Home from './components/Home'
import Details from './components/Details'
import Command from './components/Command'
import Update from './components/Update'
import UserDetails from './components/UserDetails'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/add' element={<AddRecipe/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/recipe/:id' element={<Details/>} />
        <Route path='/addcommand/:id' element={<Command/>}/>
        <Route path='/update/:id' element={<Update/>} />
        <Route path='/userdetails' element={<UserDetails/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
