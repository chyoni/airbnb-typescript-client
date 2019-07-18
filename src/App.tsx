import React from "react";
import { gql } from "apollo-boost";
import { HashRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Theme from "./Styles/Theme";
import GlobalStyles from "./Styles/GlobalStyles";
import AppRouter from "./Components/AppRouter";
import { useQuery } from "react-apollo-hooks";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const App: React.SFC = () => {
  const { data } = useQuery(QUERY);
  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router>
          <AppRouter isLoggedIn={data.isLoggedIn} />
        </Router>
      </>
    </ThemeProvider>
  );
};

export default App;
