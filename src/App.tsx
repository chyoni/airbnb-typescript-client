import React from "react";
import styled from "styled-components";
import { HashRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Theme from "./Styles/Theme";
import GlobalStyles from "./Styles/GlobalStyles";
import AppRouter from "./Components/AppRouter";
import { useQuery } from "react-apollo-hooks";
import Header from "./Components/Header";
import { IS_LOGGEDIN } from "./LocalQueries";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Footer from "./Components/Footer";

const AppWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
  min-height: 80vh;
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
            <ToastContainer
              position={toast.POSITION.BOTTOM_CENTER}
              draggable={true}
              autoClose={2500}
            />
          </AppWrapper>
          <Footer />
        </Router>
      </>
    </ThemeProvider>
  );
};

export default App;
