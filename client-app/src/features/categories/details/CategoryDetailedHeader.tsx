import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Button, Header, Item, Segment } from "semantic-ui-react";
import { Category } from "app/models/category";

interface Props {
  category: Category;
}

export default observer(function CategoryDetailedHeader({ category }: Props) {
  return (
    <Segment.Group>
      <Segment basic attached="top">
        <Item>
          <Item.Content>
            <Header>{category.name}</Header>
          </Item.Content>
        </Item>
      </Segment>
      <Segment clearing attached="bottom">
        <Button.Group floated="right">
          <Button as={Link} to={`/categories`} negative>
            Back
          </Button>
          {/* <Button as={Link} positive>Edit</Button> */}
        </Button.Group>
      </Segment>
    </Segment.Group>
  );
});
