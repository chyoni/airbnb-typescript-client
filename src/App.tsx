import React from "react";
import styled from "styled-components";
import { HashRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Theme from "./Styles/Theme";
import GlobalStyles from "./Styles/GlobalStyles";
import AppRouter from "./Components/AppRouter";
import { useQuery } from "react-apollo-hooks";
import Header from "./Components/Header";
import { IS_LOGGEDIN } from "./Queries";

const AppWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
`;

const App: React.SFC = () => {
  const { data } = useQuery(IS_LOGGEDIN);
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
