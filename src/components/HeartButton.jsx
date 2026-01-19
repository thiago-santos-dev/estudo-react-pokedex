import { useFavorites } from '../contexts/FavoritesContext'

function HeartButton({ pokemon, className = "" }) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const amado = isFavorite(pokemon.id)

  const handleClick = (e) => {
    e.stopPropagation()
    toggleFavorite(pokemon)
  }

  return (
    <button 
      onClick={handleClick}
      className={`
        group
        transition-all duration-300 active:scale-90 hover:scale-110 
        focus:outline-none 
        ${className}
      `}
      title={amado ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        strokeWidth={2} 
        // MUDANÇA 1: O contorno é sempre PRETO (black ou currentColor se o pai for preto)
        stroke="black"
        className="w-8 h-8 drop-shadow-md overflow-visible"
      >
        
        {/* --- CAMADA DE RECHEIO (Só aparece se for favorito) --- */}
        {amado && (
            <g className="animate-fade-in">
                {/* Metade de Cima: Vermelha */}
                <path d="M2 12 A10 10 0 0 1 22 12 Z" fill="#ef4444" stroke="none" />
                {/* Metade de Baixo: Branca */}
                <path d="M2 12 A10 10 0 0 0 22 12 Z" fill="white" stroke="none" />
            </g>
        )}

        {/* --- CAMADA DE CONTORNO (Sempre visível e preta) --- */}
        {/* Círculo Externo */}
        <circle cx="12" cy="12" r="10" fill="none" className="transition-colors group-hover:stroke-red-500"/>
        
        {/* Linha do meio */}
        <line x1="2" y1="12" x2="22" y2="12" className="transition-colors group-hover:stroke-red-500" />
        
        {/* Botão Central: Se amado, recheio branco. Se não, transparente. Contorno sempre preto. */}
        <circle 
            cx="12" cy="12" r="3" 
            fill={amado ? "white" : "none"} 
            className="transition-colors group-hover:stroke-red-500"
        />

      </svg>
    </button>
  )
}

export default HeartButton