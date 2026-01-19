import { Link, useNavigate } from 'react-router-dom'
import PokemonCard from '../components/PokemonCard'
// Importamos o contexto para pegar a lista salva
import { useFavorites } from '../contexts/FavoritesContext'

function Favoritos() {
  // Pegamos a lista de favoritos direto da nossa "caixa mágica"
  const { favoritos } = useFavorites()
  const navigate = useNavigate()

  const abrirDetalhes = (pokemon) => {
    navigate(`/pokemon/${pokemon.id}`)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 relative">
      
      {/* Botão Voltar para Home */}
      <Link to="/" className="absolute top-8 left-8 text-white/70 hover:text-white flex items-center gap-2 font-bold transition-all hover:-translate-x-1">
         ⬅ Voltar para Home
      </Link>

      <h1 className="text-4xl font-bold text-center text-red-500 mb-2 tracking-wider mt-12 sm:mt-0">
        MEUS FAVORITOS
      </h1>
      <p className="text-center text-gray-400 mb-12">
        Sua equipe Pokémon selecionada ({favoritos.length})
      </p>

      {/* Se a lista estiver vazia, mostra uma mensagem */}
      {favoritos.length === 0 ? (
        <div className="text-center py-20 opacity-50 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 mb-4 text-gray-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
            </svg>
            <p className="text-xl">Você ainda não tem nenhum favorito.</p>
            <Link to="/" className="mt-4 text-yellow-400 underline">Voltar e capturar alguns!</Link>
        </div>
      ) : (
        // Se tiver favoritos, mostra o grid (reaproveitando o PokemonCard)
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto max-w-7xl animate-fade-in-up">
            {favoritos.map((item) => (
            <PokemonCard 
                key={item.id} 
                pokemon={item} 
                aoClicar={abrirDetalhes} 
            />
            ))}
        </div>
      )}

    </div>
  )
}

export default Favoritos