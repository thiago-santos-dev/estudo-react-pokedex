function PokemonCard({ pokemon, aoClicar }) {
    // Definindo cores dinâmicas para o fundo do card (opcional, mas legal)
    const tipo = pokemon.types[0].type.name;
    const bgColors = {
        grass: 'bg-green-900',
        fire: 'bg-red-900',
        water: 'bg-blue-900',
        bug: 'bg-lime-900',
        normal: 'bg-gray-700',
        electric: 'bg-yellow-900',
        // fallback para cinza escuro
        default: 'bg-gray-800'
    }
    const corFundo = bgColors[tipo] || bgColors.default;

    return (
      <div 
        className={`
            ${corFundo} 
            rounded-2xl 
            p-6 
            shadow-lg 
            transform hover:scale-105 hover:shadow-2xl 
            transition duration-300 
            cursor-pointer 
            border border-gray-700
            flex flex-col items-center
        `}
        onClick={() => aoClicar(pokemon)}
      >
        <span className="self-end text-gray-400 font-mono text-sm">
            #{String(pokemon.id).padStart(3, '0')}
        </span>

        <img 
          src={pokemon.sprites.other['official-artwork'].front_default} 
          alt={pokemon.name} 
          className="w-32 h-32 object-contain drop-shadow-md z-10"
        />
        
        <h2 className="text-2xl font-bold capitalize mt-2 text-white drop-shadow-sm">
            {pokemon.name}
        </h2>
        
        <div className="flex gap-2 mt-3">
            {pokemon.types.map(t => (
                <span key={t.type.name} className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wide text-white">
                    {t.type.name}
                </span>
            ))}
        </div>
      </div>
    )
  }
  
  export default PokemonCard