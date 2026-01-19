import { createContext, useState, useEffect, useContext } from 'react'

// 1. Criamos o Contexto (a "caixa" vazia)
const FavoritesContext = createContext()

// 2. Criamos o Provedor (quem segura a caixa)
export function FavoritesProvider({ children }) {
  const [favoritos, setFavoritos] = useState([])

  // Ao iniciar, tenta ler do LocalStorage (memória do navegador)
  useEffect(() => {
    const dadosSalvos = localStorage.getItem('pokedex-favoritos')
    if (dadosSalvos) {
      setFavoritos(JSON.parse(dadosSalvos))
    }
  }, [])

  // Toda vez que mudar, salva no navegador para não perder ao dar F5
  useEffect(() => {
    localStorage.setItem('pokedex-favoritos', JSON.stringify(favoritos))
  }, [favoritos])

  // Função para adicionar/remover
  const toggleFavorite = (pokemon) => {
    // Verifica se já tem esse ID na lista
    const jaExiste = favoritos.some(fav => fav.id === pokemon.id)

    if (jaExiste) {
      // Se tem, remove (filtra todos MENOS ele)
      setFavoritos(favoritos.filter(fav => fav.id !== pokemon.id))
    } else {
      // Se não tem, adiciona
      setFavoritos([...favoritos, pokemon])
    }
  }

  // Função simples pra saber se é favorito
  const isFavorite = (id) => favoritos.some(fav => fav.id === id)

  return (
    <FavoritesContext.Provider value={{ favoritos, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

// 3. Um Hook personalizado para facilitar o uso (atalho)
export function useFavorites() {
  return useContext(FavoritesContext)
}