import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer(function GameDetails() {
  const { gameStore } = useStore();
  const { selectedGame: game, loadGame, loadingInitial } = gameStore;
  const { id } = useParams();

  useEffect(() => {
    if (id) loadGame(id);
  }, [id, loadGame]);

  if (loadingInitial || !game) return <LoadingComponent />;

  console.log(
    `Loaded game: ${game.name}, ${game.category}, ${game.description}`
  );

  return (
    <Grid>
      <Grid.Column width={10}></Grid.Column>
      <Grid.Column width={6}></Grid.Column>
    </Grid>
  );
});
