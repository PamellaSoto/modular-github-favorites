import { useState } from "react";

const ItemRepo = ({ name, owner, description, repoURL, onSaveRepo, isRepoSaved }) => {
  const [savedRepoLabel, setSavedRepoLabel] = useState(isRepoSaved);

  const handleSavedRepoLabel = () => {
    setSavedRepoLabel(!savedRepoLabel);
  }

  return (
    <li>
      <div>
        <h3>{owner}/{name}</h3>
        <a href={repoURL} target="_blank" rel="noreferrer">Ver repositório</a>
      </div>
      <p>{description || "Sem descrição"}</p>
      <button onClick={() =>{
        handleSavedRepoLabel()
        onSaveRepo()
      }}>{savedRepoLabel ? 'Remover' : 'Salvar'}</button>
    </li>
  );
};

export default ItemRepo;
