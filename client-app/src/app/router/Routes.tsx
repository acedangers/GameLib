import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../layout/App";
import GameDashboard from "../../features/games/dashboard/GameDashboard";
// import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
// import ActivityForm from "../../features/activities/form/ActivityForm";
// import ActivityDetails from "../../features/activities/details/ActivityDetails";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {path: 'games', element: <GameDashboard />},
            // {path: 'activities/:id', element: <ActivityDetails />},
            // {path: 'createActivity', element: <ActivityForm key={'Create'} />},
            // {path: 'editActivity/:id', element: <ActivityForm key={'Edit'} />},
        ]
    },
]

export const router = createBrowserRouter(routes);