import { Link } from "react-router-dom";

import { Button, Header, Item, Segment } from "semantic-ui-react";
import { Tag } from "app/models/tag";

interface Props {
  tag: Tag;
}

const TagDetailedHeader = ({ tag }: Props) => {
  return (
    <Segment.Group>
      <Segment basic attached="top">
        <Item>
          <Item.Content>
            <Header>{tag.name}</Header>
          </Item.Content>
        </Item>
      </Segment>
      <Segment clearing attached="bottom">
        <Button.Group floated="right">
          <Button as={Link} to={`/tags`} negative>
            Back
          </Button>
          {/* <Button as={Link} positive>Edit</Button> */}
        </Button.Group>
      </Segment>
    </Segment.Group>
  );
};

export default TagDetailedHeader;
