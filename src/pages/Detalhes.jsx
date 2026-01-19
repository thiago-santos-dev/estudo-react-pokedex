import { useParams, Link } from 'react-router-dom'
import { usePokemonDetails } from '../hooks/usePokemonDetails'
import './Detalhes.css'

function Detalhes() {
  const { id } = useParams()
  // Usando o Hook novo
  const { pokemon } = usePokemonDetails(id)

  if (!pokemon) {
    return <div className="detalhes-wrapper"><h2 style={{color:'white'}}>Carregando...</h2></div>
  }

  // --- Funções Visuais (Cores e Nomes) ---
  const CORES = {
    grass: '#204020', fire: '#402020', water: '#202840', bug: '#303520', normal: '#333333',
    poison: '#352035', electric: '#403d20', ground: '#403520', fairy: '#402035', fighting: '#402520',
    psychic: '#352030', rock: '#353525', ghost: '#252035', ice: '#203535', dragon: '#252040',
    dark: '#202020', steel: '#303035', flying: '#253040',
  }
  const corPrincipal = CORES[pokemon.types[0].type.name] || '#333'

  const formatarNomeStat = (nome) => {
    const mapa = { hp: "HP", attack: "Ataque", defense: "Defesa", "special-attack": "Sp. Atk", "special-defense": "Sp. Def", speed: "Velocidade" }
    return mapa[nome] || nome;
  }

  // --- O HTML Visual (igualzinho ao da aula passada) ---
  return (
    <div className="detalhes-wrapper" style={{ backgroundColor: corPrincipal }}>
      <Link to="/" className="botao-voltar">⬅ Voltar</Link>

      <div className="ficha-tecnica animar-subida">
        <div className="coluna-visual">
            <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} className="imagem-destaque"/>
            <h1 className="nome-titulo">{pokemon.name}</h1>
            <p className="id-subtitulo">Nº {String(pokemon.id).padStart(3, '0')}</p>
            <div className="tipos-container">
            {pokemon.types.map((t) => (
                <span key={t.type.name} className={`tipo ${t.type.name}`}>{t.type.name}</span>
            ))}
            </div>
        </div>
        
        <div className="coluna-dados">
            <div className="secao-medidas">
                <div className="medida-item"><h3>Altura</h3><p>{pokemon.height / 10} m</p></div>
                <div className="medida-item"><h3>Peso</h3><p>{pokemon.weight / 10} kg</p></div>
                <div className="medida-item">
                    <h3>Habilidade</h3>
                    <p style={{textTransform: 'capitalize'}}>{pokemon.abilities[0].ability.name.replace('-', ' ')}</p>
                </div>
            </div>

            <div className="secao-stats">
                <h2>Status Base</h2>
                <div className="lista-stats">
                    {pokemon.stats.map((statItem) => {
                        const largura = Math.min((statItem.base_stat / 150) * 100, 100);
                        let cor = '#ff5e57';
                        if (statItem.base_stat >= 60) cor = '#ffdd59';
                        if (statItem.base_stat >= 90) cor = '#0be881';

                        return (
                        <div key={statItem.stat.name} className="stat-row">
                            <span className="stat-nome">{formatarNomeStat(statItem.stat.name)}</span>
                            <span className="stat-valor">{statItem.base_stat}</span>
                            <div className="barra-fundo">
                                <div className="barra-progresso" style={{ width: `${largura}%`, backgroundColor: cor }}></div>
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