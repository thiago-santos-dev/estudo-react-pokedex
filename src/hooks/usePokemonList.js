import { useState, useEffect, useRef } from 'react'

export function usePokemonList() {
  const [pokemons, setPokemons] = useState([])
  const [carregandoVisual, setCarregandoVisual] = useState(false)
  
  // Refs ajudam a controlar o scroll sem travar a tela (mais performance)
  const offsetRef = useRef(0) 
  const carregandoRef = useRef(false)

  const carregarPokemons = async () => {
    // Trava de segurança: se já estiver carregando, não faz de novo
    if (carregandoRef.current) return
    
    carregandoRef.current = true
    setCarregandoVisual(true)

    const offsetAtual = offsetRef.current
    // Limite de segurança (para não travar o navegador se rodar infinito)
    if (offsetAtual >= 1000) {
        carregandoRef.current = false;
        setCarregandoVisual(false);
        return;
    }

    const arrayDePromessas = []
    for (let i = offsetAtual + 1; i <= offsetAtual + 50; i++) {
      arrayDePromessas.push(
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(res => res.json())
      )
    }

    try {
      const novosPokemons = await Promise.all(arrayDePromessas)
      // Adiciona os novos na lista antiga
      setPokemons(prev => [...prev, ...novosPokemons])
      offsetRef.current += 50
    } catch (error) {
      console.error("Erro ao buscar pokemons", error)
    } finally {
      carregandoRef.current = false
      setCarregandoVisual(false)
    }
  }

  useEffect(() => {
    // Carrega a primeira leva
    if (offsetRef.current === 0) carregarPokemons()

    const handleScroll = () => {
      const alturaPagina = document.documentElement.offsetHeight
      const scrollAtual = window.innerHeight + document.documentElement.scrollTop
      // Se chegou perto do fim, carrega mais
      if (scrollAtual >= alturaPagina - 200) carregarPokemons()
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { pokemons, carregandoVisual }
}