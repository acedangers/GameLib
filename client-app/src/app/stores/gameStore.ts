import { makeAutoObservable, runInAction } from "mobx";
import { Game } from "../models/game";
import agent from "../api/agent";

export default class GameStore {
  games: Game[] = [];
  gameRegistry = new Map<string, Game>();
  selectedGame: Game | undefined = undefined;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  private setGame = (game: Game) => {
    this.gameRegistry.set(game.id, game);
  };

  get gamesByCategory() {
    return Array.from(this.gameRegistry.values()).sort((a, b) =>
      a.category.localeCompare(b.category)
    );
  }

  get groupedGames() {
    return Object.entries(
      this.gamesByCategory.reduce((games, game) => {
        const category = game.category;
        games[category] = games[category] ? [...games[category], game] : [game];
        return games;
      }, {} as { [key: string]: Game[] })
    );
  }

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

  private getGame = (id: string) => {
    return this.gameRegistry.get(id);
  };

  loadGame = async (id: string) => {
    let game = this.getGame(id);

    if (game) {
      console.log(
        `Setting game from cache: ${game.name}, ${game.category}, ${game.description}`
      );

      runInAction(() => {
        this.selectedGame = game; // Use cached game if complete
      });

      return game;
    } else {
      console.log(
        `Setting game from api.`
      );

      this.setLoadingInitial(true);
      try {
        game = await agent.Games.details(id);

        runInAction(() => {
          this.setGame(game!); // Cache the new game
          this.selectedGame = game; // Set the newly fetched game
        });
        this.setLoadingInitial(false); // Done loading
        return game;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };
}
