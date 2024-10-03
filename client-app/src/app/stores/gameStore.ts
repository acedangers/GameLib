import { makeAutoObservable, runInAction } from "mobx";
import { Game } from "../models/game";
import agent from "../api/agent";

export default class GameStore {
  gameRegistry = new Map<string, Game>();
  selectedGame: Game | undefined = undefined;
  selectedGames: Game[] | undefined = undefined;

  loadingInitial = false;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  // Sets loading initial to specified state.
  // Required if you don't want to use runInAction to change initial.
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  // Adds specified game to the gameRegistry.
  private setGame = (game: Game) => {
    this.gameRegistry.set(game.id, game);
  };

  // Returns specified game from the gameRegistry.
  private getGame = (id: string) => {
    return this.gameRegistry.get(id);
  };

  // Returns array of games sorted by category name in alphabetical order.
  get gamesByCategory() {
    return Array.from(this.gameRegistry.values()).sort((a, b) =>
      a.categoryName.localeCompare(b.categoryName)
    );
  }

  // Returns object of games grouped by category. Key - category name, values - game array.
  get groupedGames() {
    return Object.entries(
      this.gamesByCategory.reduce((games, game) => {
        const category = game.categoryName;
        games[category] = games[category] ? [...games[category], game] : [game];
        return games;
      }, {} as { [key: string]: Game[] })
    );
  }

  // Loads all the games from api and adds them to gameRegistry.
  loadGames = async () => {
    this.setLoadingInitial(true);
    try {
      const games = await agent.Games.list();
      games.forEach((game) => {
        this.setGame(game);
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoadingInitial(false);
    }
  };

  // Loads game with specified id. Can load from cached gameRegistry and from api.
  loadGame = async (id: string) => {
    let game = this.getGame(id);

    if (game) {
      console.log(
        `Setting game from cache: ${game.name}, ${game.categoryName}, ${game.description}`
      );

      runInAction(() => {
        this.selectedGame = game; // Use cached game if complete.
      });

      return game;
    } else {
      console.log(`Setting game from api.`);

      this.setLoadingInitial(true);
      try {
        game = await agent.Games.details(id);

        runInAction(() => {
          this.setGame(game!); // Cache the new game.
          this.selectedGame = game; // Set the newly fetched game.
        });
        return game;
      } catch (error) {
        console.log(error);
      } finally {
        this.setLoadingInitial(false);
      }
    }
  };

  // Loads games with specified array of ids. Can load from cached gameRegistry and from api.
  loadGamesByIds = async (gameIds: string[]) => {
    try {
      const games: Game[] = [];

      // Iterate over the gameIds and fetch or retrieve from cache
      for (const id of gameIds) {
        let game = this.getGame(id); // Check if game exists in cache

        if (game) {
          // If game is in the cache, use it
          console.log(`Fetching game from cache: ${game.name}`);
          games.push(game);
        } else {
          this.setLoadingInitial(true);
          // If game is not in the cache, fetch it from the API
          const fetchedGame = await agent.Games.details(id);
          console.log(`Fetched game from API: ${fetchedGame.name}`);

          runInAction(() => {
            if (fetchedGame) {
              this.setGame(fetchedGame); // Cache the fetched game
              games.push(fetchedGame);
            }
          });
        }
      }

      // After fetching all games, update selectedGames
      runInAction(() => {
        this.selectedGames = games;
      });

      return games;
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoadingInitial(false); // End loading state
    }
  };

  createGame = async (game: Game) => {
    this.loading = true;
    try {
      await agent.Games.create(game);
      runInAction(() => {
        this.gameRegistry.set(game.id, game);
        this.selectedGame = game;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateGame = async (game: Game) => {
    this.loading = true;
    try {
      await agent.Games.update(game);
      runInAction(() => {
        this.gameRegistry.set(game.id, game);
        this.selectedGame = game;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteGame = async (id: string) => {
    this.loading = true;
    try {
      await agent.Games.delete(id);
      runInAction(() => {
        this.gameRegistry.delete(id);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
