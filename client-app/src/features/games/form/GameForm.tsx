import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useStore } from "app/stores/store";
import { Link, useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from "uuid";

import { Button, DropdownProps, Form, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "app/layout/LoadingComponent";
import { Game } from "app/models/game";

interface Params {
  setDisplay?: (value: boolean) => void;
}

const GameForm = ({ setDisplay }: Params) => {
  const { gameStore, categoryStore, tagStore } = useStore();
  const { createGame, updateGame, loading, loadGame, loadingInitial: gamesLI } = gameStore;

  const { loadCategories, categoryRegistry, loadingInitial: categoriesLI } = categoryStore;
  const { loadTags, tagRegistry, loadingInitial: tagsLI } = tagStore;

  const { id } = useParams();
  const navigate = useNavigate();

  const [action, setAction] = useState<string>();
  const [game, setGame] = useState<Game>({
    id: "",
    name: "",
    description: "",
    categoryName: "",
    tagNames: [],
  });

  useEffect(() => {
    if (categoryRegistry.size < 6) loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    if (tagRegistry.size < 16) loadTags();
  }, [loadTags]);

  useEffect(() => {
    if (id) {
      loadGame(id).then((game) => setGame(game!));
      setAction("Edit");
    } else {
      setAction("Create");
    }
  }, [id, loadGame]);

  const handleSubmit = () => {
    if (!game.id) {
      game.id = uuid();
      createGame(game).then(() => navigate(`/games/${game.id}`));
    } else {
      updateGame(game).then(() => navigate(`/games/${game.id}`));
    }
    if (setDisplay) setDisplay(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setGame({ ...game, [name]: value });
  };

  const handleInputChangeDlist = (
    _event: SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    const { name, value } = data;
    setGame({ ...game, [name]: value });
  };

  if (gamesLI || categoriesLI || tagsLI) return <LoadingComponent content="Loading app" />;

  const categoryOptions = Array.from(categoryRegistry.values()).map((c) => ({
    text: c.name,
    value: c.name,
  }));

  const tagOptions = Array.from(tagRegistry.values()).map((t) => ({
    text: t.name,
    value: t.name,
  }));

  return (
    <Segment style={{ marginTop: "36.2px" }} clearing>
      <Header>{action} Game</Header>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input placeholder="Name" value={game.name} name="name" onChange={handleInputChange} />
        <Form.TextArea
          placeholder="Description"
          value={game.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Dropdown
          placeholder="Category"
          options={categoryOptions}
          defaultValue={game.categoryName}
          name="categoryName"
          onChange={handleInputChangeDlist}
          selection
          scrolling
        />
        <Form.Dropdown
          placeholder="Tags"
          options={tagOptions}
          defaultValue={game.tagNames}
          name="tagNames"
          onChange={handleInputChangeDlist}
          multiple
          selection
          scrolling
        />

        <Button.Group widths="2">
          <Button as={Link} to={`/games/${game.id}`} negative type="button" content="Cancel" />
          <Button.Or />
          <Button loading={loading} positive type="submit" content="Submit" />
        </Button.Group>
      </Form>
    </Segment>
  );
};

export default observer(GameForm);
