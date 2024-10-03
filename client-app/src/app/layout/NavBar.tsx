import { NavLink } from "react-router-dom";

import { Container, Icon, Menu } from "semantic-ui-react";

const NavBar = () => {
  return (
    <Menu inverted fixed="top">
      <Container className="navBar">
        <Menu.Item as={NavLink} to="/" header>
          <Icon name="home" />
          <span>Home</span>
        </Menu.Item>
        <Menu.Item as={NavLink} to="/games">
          <Icon name="game" />
          <span>Games</span>
        </Menu.Item>
        <Menu.Item as={NavLink} to="/tags" name="Tags">
          <Icon name="tags" />
          <span>Tags</span>
        </Menu.Item>
        <Menu.Item as={NavLink} to="/categories" name="Categories">
          <Icon name="folder open" />
          <span>Categories</span>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
