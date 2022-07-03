import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import ProviderContext from './Context/ProviderContext';
import './App.css';
import Table from './Components/Table';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: teal;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`;

const Header = styled.header`
  background-color: #282c34;
  width: 100vw;
  display:  flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  & div {
    display: flex;
    flex-direction: column;
  }
  & 
  img {width: 300px;
    magin: 0 auto;}
`;

const Main = styled.div`
background-color: #282c34;
color: orange;
`;

function App() {
  return (

    <ProviderContext>
      <GlobalStyle />
      <Main>
        <Header>
          <div>

            <img src="https://fontmeme.com/permalink/220611/9f8d35e34c1065266e15236bee03a661.png" alt="-main-img" image />

            <img src="https://fontmeme.com/permalink/220611/dc38a21a9566470469c541b73ebaa0c0.png" alt="main-img" image />

            <img src="https://fontmeme.com/permalink/220611/eb695b2fcb1c776581f5e2e6febd8b67.png" alt="main-img" image />

          </div>
        </Header>
        <Table />
      </Main>
    </ProviderContext>

  );
}

export default App;
