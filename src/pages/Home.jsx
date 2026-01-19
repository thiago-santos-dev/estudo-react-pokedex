import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import PokemonCard from '../components/PokemonCard'
import { usePokemonList } from '../hooks/usePokemonList'

function Home() {
  const { pokemons, carregandoVisual } = usePokemonList()
  const [busca, setBusca] = useState('')
  const navigate = useNavigate()

  const pokemonsFiltrados = pokemons.filter(pokemon => 
    pokemon.name.toLowerCase().includes(busca.toLowerCase())
  )

  const abrirDetalhes = (pokemon) => {
    navigate(`/pokemon/${pokemon.id}`)
  }

  return (
    // Fundo cinza escuro, texto branco, altura mínima da tela toda
    <div className="min-h-screen bg-slate-900 text-white p-8">
      
      {/* Título Amarelo e Centralizado */}
      <h1 className="text-4xl font-bold text-center text-yellow-400 mb-8 tracking-wider">
        POKÉDEX
      </h1>
      
      <SearchBar busca={busca} setBusca={setBusca} />

      {/* GRID RESPONSIVO DO TAILWIND:
         - grid-cols-1: 1 coluna no celular
         - sm:grid-cols-2: 2 colunas em tablets pequenos
         - md:grid-cols-3: 3 colunas em tablets/laptops
         - lg:grid-cols-4: 4 colunas em monitores grandes
         - gap-6: Espaço entre os cards
         - mx-auto max-w-7xl: Centraliza o grid na tela
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto max-w-7xl">
        {pokemonsFiltrados.map((item) => (
          <PokemonCard 
            key={item.id} 
            pokemon={item} 
            aoClicar={abrirDetalhes} 
          />
        ))}
      </div>

      {carregandoVisual && (
        <div className="text-center mt-8 text-xl animate-pulse">
          Carregando mais Pokémons...
        </div>
      )}
    </div>
  )
}

export default Home