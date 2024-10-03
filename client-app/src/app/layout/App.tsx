import { Outlet, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";

import "./App.css";
import "./styles.css";

import { Container } from "semantic-ui-react";
import HomePage from "components/home/HomePage";
import NavBar from "./NavBar";

const App = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/" ? (
        <>
          <NavBar />
          <HomePage />
        </>
      ) : (
        <>
          <NavBar />
          <Container style={{ marginTop: "7em" }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
};

export default observer(App);
