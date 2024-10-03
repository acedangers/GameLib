import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../layout/App";
import GameDashboard from "../../features/games/dashboard/GameDashboard";
import GameDetails from "../../features/games/details/GameDetails";
import TagDashboard from "../../features/tags/dashboard/TagDashboard";
import TagDetails from "../../features/tags/details/TagDetails";
import CategoryDashboard from "../../features/categories/dashboard/CategoryDashboard";
import CategoryDetails from "../../features/categories/details/CategoryDetails";
// import ActivityForm from "../../features/activities/form/ActivityForm";
// import ActivityDetails from "../../features/activities/details/ActivityDetails";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            //Games routes.
            {path: 'games', element: <GameDashboard />},
            {path: 'games/:id', element: <GameDetails />},

            //Tags routes.
            {path: 'tags', element: <TagDashboard />},
            {path: 'tags/:name', element: <TagDetails />},
            
            //Categories routes.
            {path: 'categories', element: <CategoryDashboard />},
            {path: 'categories/:name', element: <CategoryDetails />},
        ]
    },
]

export const router = createBrowserRouter(routes);