import { createContext, useContext } from "react";
import GameStore from "./gameStore";
import TagStore from "./tagStore";
import CategoryStore from "./categoryStore";

interface Store {
    gameStore: GameStore,
    tagStore: TagStore,
    categoryStore: CategoryStore
}

export const store: Store = {
    gameStore: new GameStore(),
    tagStore: new TagStore(),
    categoryStore: new CategoryStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext)
}