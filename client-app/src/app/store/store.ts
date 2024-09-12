import { createContext, useContext } from "react";
import GameStore from "./gameStore";

interface Store {
    gameStore: GameStore
}

export const store: Store = {
    gameStore: new GameStore()
}

const GameContext = createContext(store);

export function useStore() {
    return useContext(GameContext)
}