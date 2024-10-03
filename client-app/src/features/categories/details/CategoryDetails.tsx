import { useEffect } from "react";
import { useStore } from "app/stores/store";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Grid, Segment } from "semantic-ui-react";
import LoadingComponent from "app/layout/LoadingComponent";
import CategoryDetailedHeader from "./CategoryDetailedHeader";
import GameListItem from "components/games/dashboard/GameListItem";

export default observer(function CategoryDetails() {
  const { categoryStore, gameStore } = useStore();

  const { selectedCategory: category, loadCategory, loadingInitial: categoryLI } = categoryStore;
  const { loadGamesByIds, selectedGames, loadingInitial: gamesLI } = gameStore;

  const { name } = useParams();

  useEffect(() => {
    if (name) loadCategory(name);
  }, [name, loadCategory]);

  useEffect(() => {
    if (category) loadGamesByIds(category.gameIds);
  }, [category, loadGamesByIds]);

  if (categoryLI || gamesLI || !category || !selectedGames) return <LoadingComponent />;

  console.log(`Loaded category: ${category.name}, ${category.gameIds.map((id) => " " + id)}`);

  if (selectedGames.length > 0) {
    console.log(
      `Loaded games from category gameIds: ${selectedGames.map((g) => " " + g.name)}`
    );
  } else {
    console.log(`Games didn't load`);
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <CategoryDetailedHeader category={category} />
        <Segment attached="top">
          {selectedGames.map((game) => (
            <GameListItem key={game.id} game={game} />
          ))}
        </Segment>
      </Grid.Column>
      <Grid.Column width={6}></Grid.Column>
    </Grid>
  );
});
