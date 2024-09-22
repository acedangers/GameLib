import { createContext, useContext } from "react";
import GameStore from "./gameStore";
import TagStore from "./tagStore";

interface Store {
    gameStore: GameStore,
    tagStore: TagStore
}

export const store: Store = {
    gameStore: new GameStore(),
    tagStore: new TagStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext)
}