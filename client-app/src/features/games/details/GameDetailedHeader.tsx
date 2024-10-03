import { useStore } from "../../../app/stores/store";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Button, Header, Item, Segment } from "semantic-ui-react";
import { Game } from "app/models/game";

interface Props {
  game: Game;
  setDisplay: (value: boolean) => void;
}

const GameDetailedHeader = ({ game, setDisplay }: Props) => {
  const { gameStore } = useStore();
  const { deleteGame } = gameStore;

  return (
    <Segment.Group>
      <Button as={Link} to={`/games`} primary>
        Back
      </Button>
      <Segment basic attached="top">
        <Item>
          <Item.Content>
            <Header>{game.name}</Header>
          </Item.Content>
        </Item>
      </Segment>
      <Segment clearing attached="bottom">
        <Button.Group floated="right">
          <Button as={Link} to={`/games`} onClick={() => deleteGame(game.id)} negative>
            Delete
          </Button>
          <Button onClick={() => setDisplay(true)} positive>
            Edit
          </Button>
        </Button.Group>
      </Segment>
    </Segment.Group>
  );
};

export default observer(GameDetailedHeader);
