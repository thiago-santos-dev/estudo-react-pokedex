// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

// Importando as PÁGINAS que criamos
import Home from './pages/Home'
import Detalhes from './pages/Detalhes'

function App() {
  return (
    // BrowserRouter: Habilita o sistema de rotas no App inteiro
    <BrowserRouter>
      {/* Routes: Onde definimos os caminhos */}
      <Routes>
        
        {/* Quando o caminho for "/" (raiz), mostra a Home */}
        <Route path="/" element={<Home />} />
        
        {/* Quando o caminho for "/detalhes", mostra a Detalhes */}
        <Route path="/pokemon/:id" element={<Detalhes />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App