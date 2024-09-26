import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Fragment } from "react/jsx-runtime";
import CategoryListItem from "./CategoryListItem";

export default observer(function CategoryList() {
  const { categoryStore, gameStore } = useStore();

  const { groupedCategories: categories } = categoryStore;

  const { gameRegistry } = gameStore;

  return (
    <>
      {categories.map(([group, categories]) => (
        <Fragment key={group}>
          <Header as="h1" inverted>
            {group}
          </Header>
          {categories.map((category) => (
            <CategoryListItem
              key={category.id}
              category={category}
              games={category.gameIds
                .map((id) => gameRegistry.get(id))
                .filter((game) => game !== undefined)}
            />
          ))}
        </Fragment>
      ))}
    </>
  );
});
