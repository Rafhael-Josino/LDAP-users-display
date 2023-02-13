import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import UsersList from '../pages/UsersList';
import VPNLog from '../pages/VpnLog';

function AppRoutes () {
    return <Routes>
        <Route path='/*' element={<Home />} />
        <Route path='/VPNLog' element={<VPNLog />} />
        <Route path='/vpnUsers' element={<UsersList />} />
    </Routes>
}

export default AppRoutes;