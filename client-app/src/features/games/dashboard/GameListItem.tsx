import { Button, Card } from "semantic-ui-react";
import { Game } from "../../../app/models/game";
import { Link } from "react-router-dom";

interface Props {
    game: Game;
}

export default function ActivityListItem({ game }: Props) {

    return (
        <Card>
            <Card.Header>
                {game.name}
            </Card.Header>
            <Card.Content>
                {game.category}
            </Card.Content>
            <Card.Description>
                {game.description}
            </Card.Description>
            <Card.Meta>
                {game.tags}
            </Card.Meta>
            <Button.Group floated="right" widths='2'>
                <Button color='red' content='Delete' />
                <Button as={Link} to={`/games/${game.id}`} color='olive' content='View' />
            </Button.Group>
        </Card>
    )
}