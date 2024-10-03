import { useStore } from "app/stores/store";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Header } from "semantic-ui-react";
import { Fragment } from "react/jsx-runtime";
import GameListItem from "./GameListItem";

export default observer(function GameList() {
  const { gameStore } = useStore();
  const { groupedGames } = gameStore;

  return (
    <>
      {groupedGames.map(([group, games]) => (
        <Fragment key={group}>
          <Header as={Link} to={`/categories/${group}`} inverted>
            {group}
          </Header>
          {games.map((game) => (
            <GameListItem key={game.id} game={game} />
          ))}
        </Fragment>
      ))}
    </>
  );
});
