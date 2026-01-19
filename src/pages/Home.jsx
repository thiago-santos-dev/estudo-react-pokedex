import { useState } from 'react'
import { useNavigate } from 'react-router-dom' // <--- IMPORTANTE PARA O CLIQUE
import SearchBar from '../components/SearchBar'
import PokemonCard from '../components/PokemonCard'
import { usePokemonList } from '../hooks/usePokemonList'

function Home() {
  // Chamando nosso Hook
  const { pokemons, carregandoVisual } = usePokemonList()
  
  const [busca, setBusca] = useState('')
  const navigate = useNavigate() // <--- O "MOTORISTA" DA NAVEGAÇÃO

  // Filtro visual
  const pokemonsFiltrados = pokemons.filter(pokemon => 
    pokemon.name.toLowerCase().includes(busca.toLowerCase())
  )

  // Função que o card chama quando é clicado
  const abrirDetalhes = (pokemon) => {
    navigate(`/pokemon/${pokemon.id}`)
  }

  return (
    <div className="container">
      <h1 className="titulo">Pokédex - Home</h1>
      
      <SearchBar busca={busca} setBusca={setBusca} />

      <div className="pokedex-grid">
        {pokemonsFiltrados.map((item) => (
          <PokemonCard 
            key={item.id} 
            pokemon={item} 
            aoClicar={abrirDetalhes} // Passando a função para o card
          />
        ))}
      </div>

      {carregandoVisual && (
        <p style={{textAlign: 'center', padding: 20, color: 'white'}}>
          Carregando mais...
        </p>
      )}
    </div>
  )
}

export default Home