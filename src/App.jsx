import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [pokemons, setPokemons] = useState([])
  const [busca, setBusca] = useState('')
  const [pokemonSelecionado, setPokemonSelecionado] = useState(null)
  const [carregandoVisual, setCarregandoVisual] = useState(false)
  
  const offsetRef = useRef(0) 
  const carregandoRef = useRef(false)

  // 1. [NOVO] Tabela de Cores (Tons escuros para combinar com o Dark Mode)
  const CORES_FUNDO = {
    grass: '#204020',    // Verde Escuro
    fire: '#402020',     // Vermelho Escuro
    water: '#202840',    // Azul Escuro
    bug: '#303520',      // Verde Inseto Escuro
    normal: '#333333',   // Cinza
    poison: '#352035',   // Roxo Escuro
    electric: '#403d20', // Amarelo/Marrom Escuro
    ground: '#403520',   // Marrom Terra
    fairy: '#402035',    // Rosa Escuro
    fighting: '#402520', // Laranja Escuro
    psychic: '#352030',  // Rosa Psíquico
    rock: '#353525',     // Pedra
    ghost: '#252035',    // Fantasma
    ice: '#203535',      // Gelo
    dragon: '#252040',   // Dragão
    dark: '#202020',     // Noturno
    steel: '#303035',    // Aço
    flying: '#253040',   // Voador
  }

  useEffect(() => {
    carregarPokemons()

    const handleScroll = () => {
      const alturaPagina = document.documentElement.offsetHeight
      const scrollAtual = window.innerHeight + document.documentElement.scrollTop
      if (scrollAtual >= alturaPagina - 200) {
        carregarPokemons()
      }
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
      setPokemons(listaAntiga => [...listaAntiga, ...novosPokemons])
      offsetRef.current += 50
    } catch (error) {
      console.error("Erro ao buscar lote", error)
    } finally {
      carregandoRef.current = false
      setCarregandoVisual(false)
    }
  }

  const pokemonsFiltrados = pokemons.filter(pokemon => 
    pokemon.name.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div className="container">
      <h1 className="titulo">Pokédex React</h1>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Pesquisar..."
          className="barra-busca"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="pokedex-grid">
        {pokemonsFiltrados.map((item) => {
          // 2. [NOVO] Descobrir a cor baseada no primeiro tipo do Pokémon
          const tipoPrincipal = item.types[0].type.name
          const corFundo = CORES_FUNDO[tipoPrincipal] || '#1e1e1e' // Se não achar, usa cinza padrão

          return (
            <div 
              key={item.id} 
              className="cartao-pokemon"
              // 3. [NOVO] Aplicar a cor diretamente no estilo
              style={{ backgroundColor: corFundo }}
              onClick={() => setPokemonSelecionado(item)}
            >
              <img src={item.sprites.front_default} alt={item.name} loading="lazy" />
              <p>#{String(item.id).padStart(3, '0')}</p> 
              <h3>{item.name}</h3>
            </div>
          )
        })}
      </div>

      {carregandoVisual && <p style={{textAlign: 'center', padding: 20}}>Carregando mais...</p>}

      {/* MODAL MANTIDO IGUAL */}
      {pokemonSelecionado && (
        <div className="modal-overlay" onClick={() => setPokemonSelecionado(null)}>
          <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
            <button className="fechar" onClick={() => setPokemonSelecionado(null)}>✖</button>
            <img 
              src={pokemonSelecionado.sprites.other['official-artwork'].front_default} 
              alt={pokemonSelecionado.name} 
            />
            <h2>{pokemonSelecionado.name.toUpperCase()}</h2>
            <p>ID: #{pokemonSelecionado.id}</p>
            <div className="tipos">
              {pokemonSelecionado.types.map((tipo) => (
                <span key={tipo.type.name} className={`tipo ${tipo.type.name}`}>
                  {tipo.type.name}
                </span>
              ))}
            </div>
            <p>Peso: {pokemonSelecionado.weight / 10}kg</p>
            <p>Altura: {pokemonSelecionado.height / 10}m</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App