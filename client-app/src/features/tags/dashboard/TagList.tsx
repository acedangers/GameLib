import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Fragment } from "react/jsx-runtime";
import TagListItem from "./TagListItem";

export default observer(function TagList() {
  const { tagStore, gameStore } = useStore();
  const { groupedTags: tags } = tagStore;
  const { gameRegistry } = gameStore;

  return (
    <>
      {tags.map(([group, tags]) => (
        <Fragment key={group}>
          <Header as="h1" inverted>
            {group}
          </Header>
          {tags.map((tag) => (
            <TagListItem
              key={tag.id}
              tag={tag}
              games={tag.gameIds
                .map((id) => gameRegistry.get(id))
                .filter((game) => game !== undefined)}
            />
          ))}
        </Fragment>
      ))}
    </>
  );
});
