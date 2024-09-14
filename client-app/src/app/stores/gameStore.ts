import { makeAutoObservable, runInAction } from "mobx";
import { Game } from "../models/game";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';

export default class GameStore {
    games: Game[] = [];
    gameRegistry = new Map<string, Game>();
    selectedGame: Game | undefined = undefined;
    loading = false;
    loadingInitial = false;
    
    constructor() {
        makeAutoObservable(this)
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    private setActivity = (game: Game) => {
        this.gameRegistry.set(game.id, game);
    }

    get gamesByCategory() {
        return Array.from(this.gameRegistry.values()).sort((a, b) => a.category.localeCompare(b.category));
    }

    get groupedGames() {
        return Object.entries(
            this.gamesByCategory.reduce((games, game) => {
                const category = game.category;
                games[category] = games[category] ? [...games[category], game] : [game];
                return games;
            }, {} as {[key: string]: Game[]})
        )
    }

    loadGames = async () => {
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Games.list();
            activities.forEach(game => {
                this.setActivity(game);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
}
