// src/pages/Home.jsx
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom' // Importante para navegar
import SearchBar from '../components/SearchBar'
import PokemonCard from '../components/PokemonCard'

function Home() {
  const [pokemons, setPokemons] = useState([])
  const [busca, setBusca] = useState('')
  const [carregandoVisual, setCarregandoVisual] = useState(false)
  
  // Hook de navegação
  const navigate = useNavigate()

  const offsetRef = useRef(0) 
  const carregandoRef = useRef(false)

  useEffect(() => {
    if (pokemons.length > 0) return;
    
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

  // Função corrigida para navegar
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
            aoClicar={abrirDetalhes} 
          />
        ))}
      </div>

      {carregandoVisual && <p style={{textAlign: 'center', padding: 20}}>Carregando mais...</p>}
    </div>
  )
}

export default Home