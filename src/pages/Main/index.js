import React, { useState, useEffect } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Form, SubmitButton, List } from './styles';
import Container from '../../components/Container';

import api from '../../services/api';

export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const repos = localStorage.getItem('repositories');

    if (repos) {
      setRepositories(JSON.parse(repos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('repositories', JSON.stringify(repositories));
  }, [repositories]);

  const handleInputChange = e => {
    setNewRepo(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const response = await api.get(`/repos/${newRepo}`);

    const data = {
      name: response.data.full_name,
    };

    setRepositories([...repositories, data]);
    setNewRepo('');
    setLoading(false);
  };

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repositórios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar repositório"
          value={newRepo}
          onChange={handleInputChange}
        />

        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#FFF" size="14px" />
          ) : (
            <FaPlus color="#FFF" size="14px" />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repositories.map(repo => (
          <li key={repo.name}>
            <span>{repo.name}</span>
            <Link
              to={`/repository/${encodeURIComponent(repo.name)}`}
              alt="link"
            >
              Detalhes
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}
