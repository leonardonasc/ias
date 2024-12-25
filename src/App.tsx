import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Hero from './pages/hero'
import React from 'react'
import Yes from './pages/yes'
import No from './pages/no'

function App() {
  console.log(React)
  return (
    <>
      <div className='flex flex-col h-screen justify-end'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/yes" element={<Yes />} />
            <Route path="/no" element={<No />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>

      </div>
    </>
  )
}

export default App
