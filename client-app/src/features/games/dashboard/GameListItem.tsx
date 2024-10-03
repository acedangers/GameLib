import { useStore } from "app/stores/store";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Button, Card } from "semantic-ui-react";
import { Game } from "app/models/game";

interface Props {
  game: Game;
}

const GameListItem1 = ({ game }: Props) => {
  const { gameStore } = useStore();
  const { deleteGame } = gameStore;

  return (
    <Card fluid>
      <Card.Header as="h1">{game.name}</Card.Header>
      <Card.Description>{game.description}</Card.Description>
      <Card.Meta>
        {game.tagNames.map((tagName) => (
          <Button
            key={tagName}
            className="tag-button"
            as={Link}
            to={`/tags/${tagName}`}
          >
            {tagName}
          </Button>
        ))}
      </Card.Meta>
      <Button.Group floated="right" widths="2">
        <Button onClick={() => deleteGame(game.id)} negative content="Delete" />
        <Button.Or />
        <Button as={Link} to={`/games/${game.id}`} positive content="View" />
      </Button.Group>
    </Card>
  );
};

export default observer(GameListItem1);
