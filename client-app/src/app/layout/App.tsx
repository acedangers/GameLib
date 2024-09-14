import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import HomePage from '../../features/home/HomePage';
import { Container } from 'semantic-ui-react';

function App() {
    const location = useLocation();
    return (
        <>
            {location.pathname === '/' ? <HomePage /> : (
                <>
                    <Container style={{ marginTop: '7em' }}>
                        <Outlet />
                    </Container>
                </>
            )}
        </>
    )
}

export default observer(App);
