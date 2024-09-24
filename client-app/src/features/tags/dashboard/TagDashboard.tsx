import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import TagList from "./TagList";

export default observer(function TagDashboard() {
  const { tagStore, gameStore } = useStore();
  const { loadTags, tagRegistry, loadingInitial } = tagStore;

  useEffect(() => {
    if (tagRegistry.size <= 1) loadTags();
  }, [loadTags]);


  const { loadGames, gameRegistry } = gameStore;

  useEffect(() => {
    if (gameRegistry.size <= 10) loadGames();
  }, [loadGames]);

  if (loadingInitial)
    return <LoadingComponent content="Loading app" />;

  return (
    <Grid>
      <Grid.Column width="10">
        <TagList />
      </Grid.Column>
      <Grid.Column width="6"></Grid.Column>
    </Grid>
  );
});
