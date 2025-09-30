import { useState } from "react";
import SearchInput from "./github-repos/components/SearchInput";
import ItemRepo from "./github-repos/components/itemRepo";
import api from "/src/github-repos/services/api.js";

const App = () => {
  const [storedRepos, setStoredRepos] = useState([]);
  const [displayStoredRepos, setDisplayStoredRepos] = useState(true);
  const [userInput, setUserInput] = useState("");
  const [repos, setRepos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearchRepo = async () => {
    setDisplayStoredRepos(false)
    setErrorMessage('');
    try {
      const { data } = await api.get(`users/${userInput}/repos`);
      setRepos(data);
      if (data.length === 0) {
        setErrorMessage(`user ${userInput} existe mas não tem repositorios!`)
      }
      console.log(data)
    } catch (err) {
      setRepos([]);
      console.error(err);
      setErrorMessage(`user ${userInput} não existe!`)
      
    }
  };

  const handleOnSaveRepo = (repo) => {
    const doesRepoExist = storedRepos.some(storedRepo => storedRepo.id === repo.id);
    if(doesRepoExist) {
      const updatedRepos = storedRepos.filter(storedRepo => storedRepo.id !== repo.id)
      setStoredRepos(updatedRepos);
    } 
    else {
      setStoredRepos(prev => [...prev, repo]);
    }
  }

  const handleClearSearch = () => {
    setDisplayStoredRepos(true);
    setUserInput('');
    setErrorMessage('');
  }
  return (
    <>
      <img
        src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
        width={70}
        alt="Github logo temp"
      />
      <SearchInput 
        value={userInput} 
        onChange={(e) => setUserInput(e.target.value)}
        onSearch={handleSearchRepo} 
      />
      {displayStoredRepos && (
        storedRepos.length === 0 ? (
        <p>Procure por repos pesquisando por nome de usuário!</p>
      ) : (
        storedRepos.map((repo) => (
          <ItemRepo
            key={repo.id}
            name={repo.name}
            owner={repo.owner.login}
            description={repo.description}
            repoURL={repo.html_url}
            isRepoSaved = {true}
            onSaveRepo={() => handleOnSaveRepo(repo)}
          />
        ))
      ))}
      <ul>
        {!displayStoredRepos && repos.map(repo => {
          const saved = storedRepos.some(r => r.id === repo.id);
          return (
            <ItemRepo
              key={repo.id}
              name={repo.name}
              owner={repo.owner.login}
              description={repo.description}
              repoURL={repo.html_url}
              isRepoSaved={saved}
              onSaveRepo={() => handleOnSaveRepo(repo)}
            />
          );
        })}
      </ul>
      {!displayStoredRepos && (
        <button onClick={handleClearSearch}>Limpar busca</button>
      )}
      <div id="resultReposMsg">{errorMessage}</div>
    </>
  );
};

export default App;
