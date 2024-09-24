import { Grid, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import TagDetailedHeader from "./TagDetailedHeader";
import GameListItem from "../../games/dashboard/GameListItem";

export default observer(function TagDetails() {
  const { tagStore, gameStore } = useStore();
  const { selectedTag: tag, loadTag, loadingInitial: tagLI } = tagStore;
  const { id } = useParams();
  const { loadGamesByIds, selectedGames, loadingInitial: gamesLI } = gameStore;

  useEffect(() => {
    if (id) loadTag(id);
  }, [id, loadTag]);

  useEffect(() => {
    if (tag) loadGamesByIds(tag.gameIds);
  }, [tag, loadGamesByIds]);

  if (tagLI || gamesLI || !tag || !selectedGames) return <LoadingComponent />;

  console.log(`Loaded tag: ${tag.name}, ${tag.gameIds.map((id) => " " + id)}`);

  if (selectedGames.length > 0) {
    console.log(
      `Loaded games from tag gameIds: ${selectedGames.map((g) => " " + g.name)}`
    );
  } else {
    console.log(`Games didn't load`);
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <TagDetailedHeader tag={tag} />
        <Segment attached="top">
          {selectedGames!.map((game) => (
            <GameListItem key={game.id} game={game} />
          ))}
        </Segment>
      </Grid.Column>
      <Grid.Column width={6}></Grid.Column>
    </Grid>
  );
});
