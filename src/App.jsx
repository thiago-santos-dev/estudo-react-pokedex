import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [pokemons, setPokemons] = useState([])
  const [busca, setBusca] = useState('')
  const [pokemonSelecionado, setPokemonSelecionado] = useState(null)
  const [carregandoVisual, setCarregandoVisual] = useState(false)

  // MUDANÇA 1: Trocamos useState por useRef para o controle da paginação
  // Isso garante que o valor seja sempre o ATUAL, não o antigo.
  const offsetRef = useRef(0) 
  
  // Controle para não chamar duas vezes
  const carregandoRef = useRef(false)

  useEffect(() => {
    carregarPokemons() // Carrega os primeiros 50

    const handleScroll = () => {
      const alturaPagina = document.documentElement.offsetHeight
      const scrollAtual = window.innerHeight + document.documentElement.scrollTop

      // Se chegou perto do fim (200px)
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

    // MUDANÇA 2: Lemos o valor ATUAL do Ref
    const offsetAtual = offsetRef.current

    // Trava de segurança para não buscar infinitamente (ex: paramos em 1000)
    if (offsetAtual >= 1000) {
        carregandoRef.current = false;
        setCarregandoVisual(false);
        return;
    }

    const arrayDePromessas = []
    
    // MUDANÇA 3: Usamos o valor do Ref para calcular o loop
    for (let i = offsetAtual + 1; i <= offsetAtual + 50; i++) {
      arrayDePromessas.push(
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(res => res.json())
      )
    }

    try {
      const novosPokemons = await Promise.all(arrayDePromessas)
      setPokemons(listaAntiga => [...listaAntiga, ...novosPokemons])
      
      // MUDANÇA 4: Atualizamos o Ref para a próxima vez
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
      <h1 className="titulo">Pokédex React Infinita</h1>

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
        {pokemonsFiltrados.map((item) => (
          <div 
            key={item.id} 
            className="cartao-pokemon"
            onClick={() => setPokemonSelecionado(item)}
          >
            <img src={item.sprites.front_default} alt={item.name} loading="lazy" />
            <p>#{String(item.id).padStart(3, '0')}</p> 
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>

      {carregandoVisual && <p style={{textAlign: 'center', padding: 20}}>Carregando mais...</p>}

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