import { Link } from "react-router-dom";

import { Button, Card } from "semantic-ui-react";
import { Category } from "app/models/category";
import { Game } from "app/models/game";

interface Props {
  category: Category;
  games: Game[];
}

const TagListItem = ({ category, games }: Props) => {
  return (
    <Card fluid>
      <Card.Header as="h1">{category.name}</Card.Header>
      <Card.Meta>
        {games.map((game) => (
          <Button key={game.id} className="tag-button" as={Link} to={`/games/${game.id}`}>
            {game.name}
          </Button>
        ))}
      </Card.Meta>
      <Button.Group floated="right" widths="2">
        {/* <Button as={Link} to={`/games`} negative content="Delete" />
          <Button.Or /> */}
        <Button as={Link} to={`/categories/${category.name}`} positive content="View" />
      </Button.Group>
    </Card>
  );
};

export default TagListItem;
