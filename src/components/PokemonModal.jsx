// src/components/PokemonModal.jsx

function PokemonModal({ pokemon, fechar }) {
  
  // Se não tiver pokemon selecionado, não retorna nada (segurança extra)
  if (!pokemon) return null

  return (
    <div className="modal-overlay" onClick={fechar}>
      <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
        
        <button className="fechar" onClick={fechar}>✖</button>
        
        <img 
          src={pokemon.sprites.other['official-artwork'].front_default} 
          alt={pokemon.name} 
        />
        
        <h2>{pokemon.name.toUpperCase()}</h2>
        <p>ID: #{pokemon.id}</p>
        
        <div className="tipos">
          {pokemon.types.map((tipo) => (
            <span key={tipo.type.name} className={`tipo ${tipo.type.name}`}>
              {tipo.type.name}
            </span>
          ))}
        </div>

        <p>Peso: {pokemon.weight / 10}kg</p>
        <p>Altura: {pokemon.height / 10}m</p>

      </div>
    </div>
  )
}

export default PokemonModal