import { Link } from "react-router-dom";
import { Button, Container, Header, Segment } from "semantic-ui-react";

export default function HomePage() {
    return (
        <Segment inverted textAlign='center' vertical className='homepage-body'>
            <Container text>
                <Header as='h1' inverted>
                    Home Page
                </Header>
                <Header as='h2' inverted>
                    Welcome to Home Page
                </Header>
                <Button as={Link} to='/games' size='huge'>
                    Proceed to games list 
                </Button>
            </Container>
        </Segment>
    )
}