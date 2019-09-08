import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Loadding, Owner, IssueList, ButtonIssue } from './styles';

function Repository({ match }) {
  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [issueState, setIssueState] = useState('all');
  const [page, setPage] = useState(1);

  const issueOptions = [
    { value: 'all', label: 'Todas' },
    { value: 'open', label: 'Abertas' },
    { value: 'closed', label: 'Fechadas' },
  ];

  useEffect(() => {
    async function getRepo() {
      setLoading(true);
      const repoName = decodeURIComponent(match.params.name);

      const [_repository, _issues] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: issueState,
            per_page: 10,
            page,
          },
        }),
      ]);

      setRepository(_repository.data);
      setIssues(_issues.data);
      setLoading(false);
    }

    getRepo();
  }, [issueState, page]);

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
        <div>
          {issueOptions.map(option => (
            <ButtonIssue
              key={option.value}
              active={option.value === issueState}
              onClick={() => setIssueState(option.value)}
            >
              {option.label}
            </ButtonIssue>
          ))}
        </div>
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
        <div>
          <ButtonIssue disabled={page === 1} onClick={() => setPage(page - 1)}>
            Página Anterior
          </ButtonIssue>
          <span>Página {page}</span>
          <ButtonIssue onClick={() => setPage(page + 1)}>
            Próxima Página
          </ButtonIssue>
        </div>
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
