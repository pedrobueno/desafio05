import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Loadding, Owner, IssueList } from './styles';

function Repository({ match }) {
  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getRepo() {
      setLoading(true);
      const repoName = decodeURIComponent(match.params.name);

      const [_repository, _issues] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: 'open',
            per_page: 5,
          },
        }),
      ]);

      setRepository(_repository.data);
      setIssues(_issues.data);
      setLoading(false);
    }

    getRepo();
  }, []);

  if (loading) {
    return <Loadding>Carregando</Loadding>;
  }

  const { owner } = repository;
  return (
    <Container>
      <Owner>
        <Link to="/">Voltar</Link>
        <img src={owner.avatar_url} alt={owner.login} />
        <h1>{repository.name}</h1>
        <p>{repository.description}</p>
      </Owner>
      <IssueList>
        {issues.map(issue => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />
            <div>
              <strong>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={issue.html_url}
                >
                  {issue.title}
                </a>
                {issue.labels.map(label => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}
              </strong>
              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssueList>
    </Container>
  );
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};

export default Repository;
