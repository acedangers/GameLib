import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/Routes'
import { store, StoreContext } from './app/stores/store'

createRoot(document.getElementById('root')!).render(
    <StoreContext.Provider value={store}>
        <RouterProvider router={router} />
    </StoreContext.Provider>
)
