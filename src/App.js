import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
        setRepositories(response.data)
    });
}, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Project ${Date.now()} `, 
      url: "https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs", 
      techs: ["Node.js", "React"],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const newRepository = repositories.filter(repo => repo.id !== id)
    setRepositories(newRepository)
    
    //Segunda Forma para remoção
    // repositories.splice(repositories.findIndex(repo => repo.id === id), 1)
    // setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repo => (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
