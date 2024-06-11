import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'
import { Products } from './components/Products/Products'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path='/' element={<Products/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
