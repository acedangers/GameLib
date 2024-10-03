import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Segment, Grid, Icon, Button } from "semantic-ui-react";
import { Game } from "app/models/game";

interface Props {
  game: Game;
}

export default observer(function GameDetailedInfo({ game }: Props) {
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{game.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="file alternate outline" size="large" />
          </Grid.Column>
          <Grid.Column width={7}>
            <span>{game.categoryName}</span>
          </Grid.Column>
          <Grid.Column width={1}>
            <Icon name="tags" size="large" />
          </Grid.Column>
          <Grid.Column width={7}>
            {game.tagNames.map((tag) => (
              <Button
                key={tag}
                className="tag-button"
                as={Link}
                to={`/tags/${tag}`}
              >
                {tag}
              </Button>
            ))}
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
});
