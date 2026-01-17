// src/components/PokemonCard.jsx

// Tabela de cores movida para cá (ela pertence ao cartão visualmente)
const CORES_FUNDO = {
  grass: '#204020',    fire: '#402020',     water: '#202840',
  bug: '#303520',      normal: '#333333',   poison: '#352035',
  electric: '#403d20', ground: '#403520',   fairy: '#402035',
  fighting: '#402520', psychic: '#352030',  rock: '#353525',
  ghost: '#252035',    ice: '#203535',      dragon: '#252040',
  dark: '#202020',     steel: '#303035',    flying: '#253040',
}

function PokemonCard({ pokemon, aoClicar }) {
  
  // Lógica da cor interna do componente
  const tipoPrincipal = pokemon.types[0].type.name
  const corFundo = CORES_FUNDO[tipoPrincipal] || '#1e1e1e'

  return (
    <div 
      className="cartao-pokemon"
      style={{ backgroundColor: corFundo }}
      onClick={() => aoClicar(pokemon)} // Avisa o pai que foi clicado
    >
      <img src={pokemon.sprites.front_default} alt={pokemon.name} loading="lazy" />
      <p>#{String(pokemon.id).padStart(3, '0')}</p> 
      <h3>{pokemon.name}</h3>
    </div>
  )
}

export default PokemonCard