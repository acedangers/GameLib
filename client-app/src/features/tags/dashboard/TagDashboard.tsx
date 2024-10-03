import { useEffect } from "react";
import { useStore } from "app/stores/store";
import { observer } from "mobx-react-lite";

import { Grid } from "semantic-ui-react";
import LoadingComponent from "app/layout/LoadingComponent";
import TagList from "./TagList";

export default observer(function TagDashboard() {
  const { tagStore, gameStore } = useStore();

  const { loadTags, tagRegistry, loadingInitial: tagsLI } = tagStore;
  const { loadGames, gameRegistry, loadingInitial: gamesLI } = gameStore;

  useEffect(() => {
    if (tagRegistry.size <= 1) loadTags();
  }, [loadTags]);

  useEffect(() => {
    if (gameRegistry.size < 10) loadGames();
  }, [loadGames]);

  if (tagsLI || gamesLI) return <LoadingComponent content="Loading app" />;

  return (
    <Grid>
      <Grid.Column width="10">
        <TagList />
      </Grid.Column>
      <Grid.Column width="6"></Grid.Column>
    </Grid>
  );
});
