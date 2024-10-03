import { useEffect, useState } from "react";
import { useStore } from "app/stores/store";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Grid } from "semantic-ui-react";
import LoadingComponent from "app/layout/LoadingComponent";
import GameDetailedHeader from "./GameDetailedHeader";
import GameDetailedInfo from "./GameDetailedInfo";
import GameForm from "../form/GameForm";

const GameDetails = () => {
  const { gameStore } = useStore();
  const { selectedGame: game, loadGame, loadingInitial } = gameStore;
  const { id } = useParams();

  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (id) loadGame(id);
  }, [id, loadGame]);

  if (loadingInitial || !game) return <LoadingComponent />;

  console.log(`Loaded game: ${game.name}, ${game.categoryName}, ${game.description}`);

  return (
    <Grid>
      <Grid.Column width={10}>
        <GameDetailedHeader game={game} setDisplay={setDisplay} />
        <GameDetailedInfo game={game} />
      </Grid.Column>
      {display && (
        <Grid.Column width={6}>
          <GameForm setDisplay={setDisplay} />
        </Grid.Column>
      )}
    </Grid>
  );
};

export default observer(GameDetails);
