import { useParams, Link } from 'react-router-dom'
import { usePokemonDetails } from '../hooks/usePokemonDetails'

function Detalhes() {
  const { id } = useParams()
  const { pokemon } = usePokemonDetails(id)

  if (!pokemon) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
            <h2 className="text-2xl animate-pulse font-bold">Carregando dados...</h2>
        </div>
    )
  }

  const CORES = {
    grass: '#204020', fire: '#402020', water: '#202840', bug: '#303520', normal: '#333333',
    poison: '#352035', electric: '#403d20', ground: '#403520', fairy: '#402035', fighting: '#402520',
    psychic: '#352030', rock: '#353525', ghost: '#252035', ice: '#203535', dragon: '#252040',
    dark: '#202020', steel: '#303035', flying: '#253040',
  }
  const corPrincipal = CORES[pokemon.types[0].type.name] || '#333'

  const formatarNomeStat = (nome) => {
    const mapa = { hp: "HP", attack: "ATK", defense: "DEF", "special-attack": "SPA", "special-defense": "SPD", speed: "SPD" }
    return mapa[nome] || nome;
  }

  return (
    <div 
        className="min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-500"
        style={{ backgroundColor: corPrincipal }}
    >
      
      <Link 
        to="/" 
        className="absolute top-6 left-6 bg-white text-black hover:bg-gray-200 px-6 py-2 rounded-full font-bold transition-all duration-300 z-50 shadow-lg border-2 border-white"
      >
        ⬅ Voltar
      </Link>

      {/* MUDANÇA 1: Clareamos o fundo (bg-black/20 em vez de 40) e aumentamos o blur */}
      <div className="
            relative w-full max-w-6xl 
            bg-black/20 backdrop-blur-2xl 
            rounded-[3rem] p-8 md:p-12
            flex flex-col md:flex-row gap-12 items-center
            shadow-2xl border border-white/30
            animate-fade-in-up
      ">
        
        {/* --- LADO ESQUERDO --- */}
        <div className="flex-1 flex flex-col items-center">
            <img 
                src={pokemon.sprites.other['official-artwork'].front_default} 
                alt={pokemon.name} 
                className="w-full max-w-sm drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)] animate-bounce-slow"
            />
            
            {/* MUDANÇA 2: Texto Branco Puro e Sombra Forte para leitura */}
            <h1 className="text-5xl md:text-6xl font-black text-white capitalize mt-4 drop-shadow-md text-center tracking-wide">
                {pokemon.name}
            </h1>
            
            <span className="mt-2 bg-white text-black px-6 py-1 rounded-full font-bold text-xl shadow-lg">
                #{String(pokemon.id).padStart(3, '0')}
            </span>

            <div className="flex gap-4 mt-6">
            {pokemon.types.map((t) => (
                // MUDANÇA 3: Etiquetas mais brilhantes
                <span key={t.type.name} className="px-6 py-2 bg-white text-black rounded-full font-bold uppercase tracking-widest shadow-lg border-2 border-white/50">
                    {t.type.name}
                </span>
            ))}
            </div>
        </div>
        
        {/* --- LADO DIREITO --- */}
        <div className="flex-1 w-full text-white">
            
            <div className="grid grid-cols-3 gap-4 bg-white/10 p-6 rounded-3xl mb-8 border border-white/20 text-center shadow-inner">
                {/* MUDANÇA 4: Rótulos agora são cinza claro (text-gray-200) e valores Branco Puro */}
                <div>
                    <h3 className="text-sm font-bold uppercase text-gray-200 mb-2 tracking-wider">Altura</h3>
                    <p className="text-3xl font-black text-white drop-shadow-sm">{pokemon.height / 10} m</p>
                </div>
                <div>
                    <h3 className="text-sm font-bold uppercase text-gray-200 mb-2 tracking-wider">Peso</h3>
                    <p className="text-3xl font-black text-white drop-shadow-sm">{pokemon.weight / 10} kg</p>
                </div>
                <div>
                    <h3 className="text-sm font-bold uppercase text-gray-200 mb-2 tracking-wider">Habilidade</h3>
                    <p className="text-xl font-bold capitalize text-white truncate">{pokemon.abilities[0].ability.name.replace('-', ' ')}</p>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-black mb-6 border-l-8 border-white pl-4 uppercase tracking-widest text-white drop-shadow-md">
                    Status Base
                </h2>
                
                <div className="flex flex-col gap-5">
                    {pokemon.stats.map((statItem) => {
                        const largura = Math.min((statItem.base_stat / 150) * 100, 100);
                        let cor = '#ff5e57';
                        if (statItem.base_stat >= 60) cor = '#ffdd59';
                        if (statItem.base_stat >= 90) cor = '#4cd137';

                        return (
                        <div key={statItem.stat.name} className="flex items-center gap-4">
                            {/* MUDANÇA 5: Nomes dos Stats maiores e brancos */}
                            <span className="w-16 font-bold text-right text-sm text-white uppercase tracking-wider">
                                {formatarNomeStat(statItem.stat.name)}
                            </span>
                            <span className="w-10 font-bold text-right text-white text-lg">{statItem.base_stat}</span>
                            
                            <div className="flex-1 h-4 bg-gray-700/50 rounded-full overflow-hidden border border-white/10">
                                <div 
                                    className="h-full rounded-full shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                                    style={{ width: `${largura}%`, backgroundColor: cor, transition: 'width 1s ease-out' }}
                                ></div>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>

        </div>
      </div>
    </div>
  )
}

export default Detalhes