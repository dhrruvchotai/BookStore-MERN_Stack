import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import CreateBooks from './pages/CreateBooks'
import EditBook from './pages/EditBook'
import ShowBook from './pages/ShowBook'
import DeleteBook from './pages/DeleteBook'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/books/create' element={<CreateBooks/>}/>
        <Route path='/books/details/:id' element={<EditBook/>}/>
        <Route path='/books/edit/:id' element={<ShowBook/>}/>
        <Route path='/books/edit/:id' element={<DeleteBook/>}/>
      </Routes> 
    </>
  )
}

export default App
