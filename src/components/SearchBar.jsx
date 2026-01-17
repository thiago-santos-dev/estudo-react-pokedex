// src/components/SearchBar.jsx

// PROPS: São as "opções" que este componente recebe do pai (App)
// Aqui recebemos o texto atual (busca) e a função para atualizar (setBusca)
function SearchBar({ busca, setBusca }) {
  
  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <input 
        type="text" 
        placeholder="Pesquisar..."
        className="barra-busca"
        value={busca}
        // Quando digitar, avisa o pai (App) que mudou
        onChange={(e) => setBusca(e.target.value)}
      />
    </div>
  )
}

export default SearchBar