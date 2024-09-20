import { observer } from "mobx-react-lite";
import { Button, Header, Item, Segment } from "semantic-ui-react";
import { Game } from "../../../app/models/game";
import { Link } from "react-router-dom";

interface Props {
  game: Game;
}

export default observer(function GameDetailedHeader({ game }: Props) {
  return (
    <Segment.Group>
      <Segment basic attached="top">
        <Item>
          <Item.Content>
            <Header>{game.name}</Header>
          </Item.Content>
        </Item>
      </Segment>
      <Segment clearing attached="bottom">
        <Button.Group floated="right">
          <Button as={Link} to={`/games`} negative>Back</Button>
          <Button as={Link} positive>Edit</Button>
        </Button.Group>
      </Segment>
    </Segment.Group>
  );
});
