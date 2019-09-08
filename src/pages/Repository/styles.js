import styled from 'styled-components';

export const Loadding = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }
  img {
    width: 120px;
    border-radius: 100%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    max-width: 400px;
  }
`;

export const ButtonIssue = styled.button.attrs({
  type: 'button',
})`
  font-size: 16px;
  color: ${props => (props.active ? '#FFF' : '#333')};
  background: ${props => (props.active ? '#333' : '#eee')};
  border: 0;
  border-radius: 4px;
  margin-left: 10px;
  padding: 10px;
  border: 2px solid transparent;

  &:hover {
    border: 2px solid #7159c1;
  }

  &[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
    border: 2px solid transparent;
  }
`;

export const IssueList = styled.div`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    margin-top: 10px;

    span {
      margin: 0 15px;
      font-size: 16px;
    }
  }

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 100%;
      border: 2px solid #eee;
    }

    div {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;
