import { useState, useEffect, useRef } from 'react'
import './App.css'

// Importamos nossos novos blocos de LEGO
import SearchBar from './components/SearchBar'
import PokemonCard from './components/PokemonCard'
import PokemonModal from './components/PokemonModal'

function App() {
  const [pokemons, setPokemons] = useState([])
  const [busca, setBusca] = useState('')
  const [pokemonSelecionado, setPokemonSelecionado] = useState(null)
  const [carregandoVisual, setCarregandoVisual] = useState(false)
  
  const offsetRef = useRef(0) 
  const carregandoRef = useRef(false)

  useEffect(() => {
    carregarPokemons()
    const handleScroll = () => {
      const alturaPagina = document.documentElement.offsetHeight
      const scrollAtual = window.innerHeight + document.documentElement.scrollTop
      if (scrollAtual >= alturaPagina - 200) carregarPokemons()
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, []) 

  const carregarPokemons = async () => {
    if (carregandoRef.current) return
    carregandoRef.current = true
    setCarregandoVisual(true)

    const offsetAtual = offsetRef.current
    if (offsetAtual >= 1000) {
        carregandoRef.current = false;
        setCarregandoVisual(false);
        return;
    }

    const arrayDePromessas = []
    for (let i = offsetAtual + 1; i <= offsetAtual + 50; i++) {
      arrayDePromessas.push(
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(res => res.json())
      )
    }

    try {
      const novosPokemons = await Promise.all(arrayDePromessas)
      setPokemons(prev => [...prev, ...novosPokemons])
      offsetRef.current += 50
    } catch (error) {
      console.error("Erro", error)
    } finally {
      carregandoRef.current = false
      setCarregandoVisual(false)
    }
  }

  const pokemonsFiltrados = pokemons.filter(pokemon => 
    pokemon.name.toLowerCase().includes(busca.toLowerCase())
  )

  // --- OLHA COMO O RETURN FICOU LIMPO! ---
  return (
    <div className="container">
      <h1 className="titulo">Pokédex React Componentizada</h1>

      {/* Usando o componente de Busca */}
      <SearchBar busca={busca} setBusca={setBusca} />

      <div className="pokedex-grid">
        {pokemonsFiltrados.map((item) => (
          // Usando o componente de Card
          <PokemonCard 
            key={item.id} 
            pokemon={item} 
            aoClicar={setPokemonSelecionado} 
          />
        ))}
      </div>

      {carregandoVisual && <p style={{textAlign: 'center', padding: 20}}>Carregando mais...</p>}

      {/* Usando o componente de Modal */}
      {pokemonSelecionado && (
        <PokemonModal 
          pokemon={pokemonSelecionado} 
          fechar={() => setPokemonSelecionado(null)} 
        />
      )}
    </div>
  )
}

export default App