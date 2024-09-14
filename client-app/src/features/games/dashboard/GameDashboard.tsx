import { Grid } from "semantic-ui-react";
import GameList from "./GameList";
import {useStore} from "../../../app/stores/store"
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer(function ActivityDashboard() {
    const { gameStore } = useStore();
    const { loadGames, gameRegistry } = gameStore;

    useEffect(() => {
        if (gameRegistry.size <= 1) loadGames();
    }, [loadGames])

    if (gameStore.loadingInitial) return <LoadingComponent content='Loading app' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <GameList />
            </Grid.Column>
            <Grid.Column width='6'>
            </Grid.Column>
        </Grid>
    )
})