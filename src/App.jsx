import { useState } from 'react' // Importamos o gerenciador de estado
import './App.css' // Importamos o CSS que acabamos de colar

function App() {
  
  // 1. O ESTADO (STATE)
  // Imagine que isso é o "Banco de Dados" local do componente.
  // Por enquanto, vamos usar dados falsos (fixos) só para testar o layout.
  const [pokemons, setPokemons] = useState([
    { id: 1, nome: 'Bulbasaur', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
    { id: 4, nome: 'Charmander', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
    { id: 7, nome: 'Squirtle', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
    { id: 25, nome: 'Pikachu', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' }
  ])

  // 2. O RETORNO VISUAL (JSX)
  return (
    <div className="container">
      
      <h1 className="titulo">Pokédex React do Tiago</h1>

      <div className="pokedex-grid">
        
        {/* AQUI ACONTECE A MÁGICA: O LOOP MAP */}
        {/* Para cada item da lista 'pokemons', desenhe uma div */}
        {pokemons.map((item) => (
          
          <div key={item.id} className="cartao-pokemon">
            <img src={item.imagem} alt={item.nome} />
            <p>#{item.id}</p>
            <h3>{item.nome}</h3>
          </div>

        ))}

      </div>

    </div>
  )
}

export default App