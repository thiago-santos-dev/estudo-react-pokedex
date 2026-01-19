// src/components/SearchBar.jsx
function SearchBar({ busca, setBusca }) {
  return (
    <div className="flex justify-center mb-8 mt-5">
      <input 
        type="text" 
        placeholder="Pesquisar Pokémon..."
        className="
            w-full max-w-md 
            p-4 
            bg-white text-gray-900 placeholder-gray-500
            rounded-full 
            border-2 border-gray-300 
            shadow-lg 
            font-bold 
            focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-200
            transition duration-300
        "
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
    </div>
  )
}

export default SearchBar