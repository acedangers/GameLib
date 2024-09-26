import { Container, Icon, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" header>
          <Icon name="home" />
          Home
        </Menu.Item>
        <Menu.Item as={NavLink} to="/games" name="Games" />
        <Menu.Item as={NavLink} to="/tags" name="Tags" />
        <Menu.Item as={NavLink} to="/categories" name="Categories" />
      </Container>
    </Menu>
  );
}
