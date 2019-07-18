import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { HashRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Theme from "./Styles/Theme";
import GlobalStyles from "./Styles/GlobalStyles";
import AppRouter from "./Components/AppRouter";
import { useQuery } from "react-apollo-hooks";
import Header from "./Components/Header";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const AppWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
`;

const App: React.SFC = () => {
  const { data } = useQuery(QUERY);
  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router>
          <Header isLoggedIn={data.isLoggedIn} />
          <AppWrapper>
            <AppRouter isLoggedIn={data.isLoggedIn} />
          </AppWrapper>
        </Router>
      </>
    </ThemeProvider>
  );
};

export default App;
