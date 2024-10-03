import { useEffect } from "react";
import { useStore } from "app/stores/store";
import { observer } from "mobx-react-lite";

import { Grid } from "semantic-ui-react";
import LoadingComponent from "app/layout/LoadingComponent";
import GameList from "./GameList";
import GameForm from "../form/GameForm";

const GameDashboard = () => {
  const { gameStore } = useStore();
  const { loadGames, gameRegistry } = gameStore;

  useEffect(() => {
    if (gameRegistry.size < 10) loadGames();
  }, [loadGames]);

  if (gameStore.loadingInitial) return <LoadingComponent content="Loading app" />;

  return (
    <Grid>
      <Grid.Column width="10">
        <GameList />
      </Grid.Column>
      <Grid.Column width="6">
        <GameForm />
      </Grid.Column>
    </Grid>
  );
};

export default observer(GameDashboard);
