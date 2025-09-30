const SearchInput = ({ value, onChange, onSearch }) => {
  return (
    <div>
      <input 
        type="text" 
        value={value} 
        onChange={onChange} 
        placeholder="Digite o usuário do GitHub" 
      />
      <button onClick={onSearch}>Buscar</button>
    </div>
  );
};

export default SearchInput;
