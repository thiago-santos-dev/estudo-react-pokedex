import { useState, useEffect } from 'react'

export function usePokemonDetails(id) {
  const [pokemon, setPokemon] = useState(null)
  
  useEffect(() => {
    if (!id) return
    
    // Reseta o pokemon anterior para mostrar loading na troca
    setPokemon(null) 

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => res.json())
      .then(dados => setPokemon(dados))
      .catch(err => console.error("Erro", err))
  }, [id])

  return { pokemon }
}