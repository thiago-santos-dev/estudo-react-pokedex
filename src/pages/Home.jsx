import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom' // <--- Importe Link
import SearchBar from '../components/SearchBar'
import PokemonCard from '../components/PokemonCard'
import { usePokemonList } from '../hooks/usePokemonList'
// Importe o contexto para contar quantos favoritos temos
import { useFavorites } from '../contexts/FavoritesContext' 

function Home() {
  const { pokemons, carregandoVisual } = usePokemonList()
  const { favoritos } = useFavorites() // <--- Pegando os favoritos
  const [busca, setBusca] = useState('')
  const navigate = useNavigate()

  const pokemonsFiltrados = pokemons.filter(pokemon => 
    pokemon.name.toLowerCase().includes(busca.toLowerCase())
  )

  const abrirDetalhes = (pokemon) => {
    navigate(`/pokemon/${pokemon.id}`)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      
      <h1 className="text-4xl font-bold text-center text-yellow-400 tracking-wider relative">
        POKÉDEX
      </h1>
      
      {/* --- NOVO LINK PARA A PÁGINA DE FAVORITOS --- */}
      <div className="text-center mt-4 mb-8">
        <Link to="/favoritos" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-bold transition-colors shadow-lg shadow-red-600/20 group">
            {/* Ícone de Pokébola Pequeno */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500">
                <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10-8a8 8 0 00-8 8 7.963 7.963 0 002.053 5.346l-.004-.003.004.003A7.963 7.963 0 0012 20a8 8 0 100-16zm0 6a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            Ver Meus Favoritos ({favoritos.length})
        </Link>
      </div>
      {/* ------------------------------------------- */}

      <SearchBar busca={busca} setBusca={setBusca} />
      
      {/* ... resto do grid e loading ... */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto max-w-7xl">
        {pokemonsFiltrados.map((item) => (
          <PokemonCard key={item.id} pokemon={item} aoClicar={abrirDetalhes} />
        ))}
      </div>

      {carregandoVisual && (
        <div className="text-center mt-8 text-xl animate-pulse">Carregando mais Pokémons...</div>
      )}
    </div>
  )
}

export default Home