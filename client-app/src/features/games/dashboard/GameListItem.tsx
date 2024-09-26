import { Button, Card } from "semantic-ui-react";
import { Game } from "../../../app/models/game";
import { Link } from "react-router-dom";

interface Props {
  game: Game;
}

export default function GameListItem({ game }: Props) {
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
        <Button as={Link} to={`/games`} negative content="Delete" />
        <Button.Or />
        <Button as={Link} to={`/games/${game.id}`} positive content="View" />
      </Button.Group>
    </Card>
  );
}
