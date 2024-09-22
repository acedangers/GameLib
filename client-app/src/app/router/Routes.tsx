import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../layout/App";
import GameDashboard from "../../features/games/dashboard/GameDashboard";
import GameDetails from "../../features/games/details/GameDetails";
import TagDashboard from "../../features/tags/dashboard/TagDashboard";
import TagDetails from "../../features/tags/details/TagDetails";
// import ActivityForm from "../../features/activities/form/ActivityForm";
// import ActivityDetails from "../../features/activities/details/ActivityDetails";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {path: 'games', element: <GameDashboard />},
            {path: 'games/:id', element: <GameDetails />},
            // {path: 'createActivity', element: <ActivityForm key={'Create'} />},
            // {path: 'editActivity/:id', element: <ActivityForm key={'Edit'} />},
            {path: 'tags', element: <TagDashboard />},
            {path: 'tags/:id', element: <TagDetails />},
        ]
    },
]

export const router = createBrowserRouter(routes);