import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FavoritesProvider } from './contexts/FavoritesContext'
import Home from './pages/Home'
import Detalhes from './pages/Detalhes'
import Favoritos from './pages/Favoritos'

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* 2. Adicione a nova rota aqui: */}
          <Route path="/favoritos" element={<Favoritos />} /> 
          <Route path="/pokemon/:id" element={<Detalhes />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  )
}

export default App