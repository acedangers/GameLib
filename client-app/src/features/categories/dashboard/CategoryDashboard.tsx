import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import CategoryList from "./CategoryList";

export default observer(function CategoryDashboard() {
  const { categoryStore, gameStore } = useStore();
  const { loadCategories, categoryRegistry, loadingInitial } = categoryStore;

  useEffect(() => {
    if (categoryRegistry.size <= 1) loadCategories();
  }, [loadCategories]);

  const { loadGames, gameRegistry } = gameStore;

  useEffect(() => {
    if (gameRegistry.size < 10) loadGames();
  }, [loadGames]);

  if (loadingInitial)
    return <LoadingComponent content="Loading app" />;

  return (
    <Grid>
      <Grid.Column width="10">
        <CategoryList />
      </Grid.Column>
      <Grid.Column width="6"></Grid.Column>
    </Grid>
  );
});
