import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import './Detalhes.css'

function Detalhes() {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null)
  
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => res.json())
      .then(dados => setPokemon(dados))
    // Adicionei um .catch simples para erros de rede
    .catch(err => console.error("Erro ao carregar pokemon", err));
  }, [id])

  if (!pokemon) {
    return <div className="loading-tela">Carregando dados...</div>
  }

  const CORES = {
    grass: '#204020', fire: '#402020', water: '#202840', bug: '#303520', normal: '#333333',
    poison: '#352035', electric: '#403d20', ground: '#403520', fairy: '#402035', fighting: '#402520',
    psychic: '#352030', rock: '#353525', ghost: '#252035', ice: '#203535', dragon: '#252040',
    dark: '#202020', steel: '#303035', flying: '#253040',
  }
  // Cor de fundo principal da tela
  const corPrincipal = CORES[pokemon.types[0].type.name] || '#333'

  // Função para formatar os nomes dos stats (ex: "special-attack" vira "Sp. Atk")
  const formatarNomeStat = (nome) => {
    const mapaNomes = {
        hp: "HP",
        attack: "Ataque",
        defense: "Defesa",
        "special-attack": "Sp. Atk",
        "special-defense": "Sp. Def",
        speed: "Velocidade"
    }
    return mapaNomes[nome] || nome;
  }

  return (
    <div className="detalhes-wrapper" style={{ backgroundColor: corPrincipal }}>
      
      <Link to="/" className="botao-voltar">⬅ Voltar</Link>

      {/* O cartão agora é um container flexível */}
      <div className="ficha-tecnica animar-subida">
        
        {/* --- COLUNA DA ESQUERDA (Imagem e Tipos) --- */}
        <div className="coluna-visual">
            <img 
            src={pokemon.sprites.other['official-artwork'].front_default} 
            alt={pokemon.name} 
            className="imagem-destaque"
            />
            
            <h1 className="nome-titulo">{pokemon.name}</h1>
            <p className="id-subtitulo">Nº {String(pokemon.id).padStart(3, '0')}</p>

            <div className="tipos-container">
            {pokemon.types.map((t) => (
                <span key={t.type.name} className={`tipo ${t.type.name}`}>
                {t.type.name}
                </span>
            ))}
            </div>
        </div>
        
        {/* --- COLUNA DA DIREITA (Dados e Stats) --- */}
        <div className="coluna-dados">
            
            {/* Medidas Físicas */}
            <div className="secao-medidas">
                <div className="medida-item">
                    <h3>Altura</h3>
                    <p>{pokemon.height / 10} m</p>
                </div>
                <div className="medida-item">
                    <h3>Peso</h3>
                    <p>{pokemon.weight / 10} kg</p>
                </div>
                {/* Adicionando Habilidades extras */}
                <div className="medida-item">
                    <h3>Habilidade Principal</h3>
                    <p style={{textTransform: 'capitalize'}}>
                        {pokemon.abilities[0].ability.name.replace('-', ' ')}
                    </p>
                </div>
            </div>

            <div className="divisor-linha"></div>

            {/* Área dos Status (Barrinhas) */}
            <div className="secao-stats">
                <h2>Status Base</h2>
                <div className="lista-stats">
                    {pokemon.stats.map((statItem) => {
                        // Cálculo simples para a largura da barra (assumindo max 150 para visual)
                        const larguraBarra = Math.min((statItem.base_stat / 150) * 100, 100);
                        // Define a cor da barra baseada no valor
                        let corBarra = '#ff5e57'; // Vermelho (fraco)
                        if (statItem.base_stat >= 60) corBarra = '#ffdd59'; // Amarelo (médio)
                        if (statItem.base_stat >= 90) corBarra = '#0be881'; // Verde (forte)

                        return (
                        <div key={statItem.stat.name} className="stat-row">
                            <span className="stat-nome">{formatarNomeStat(statItem.stat.name)}</span>
                            <span className="stat-valor">{statItem.base_stat}</span>
                            <div className="barra-fundo">
                                <div 
                                    className="barra-progresso"
                                    style={{ width: `${larguraBarra}%`, backgroundColor: corBarra }}
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