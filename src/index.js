import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import { Home } from './pages/Home'
import { Upload } from './pages/Upload'

const App = () => {
  return (

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/upload' element={<Upload />} />
    </Routes>

  )
}

export default App;


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

