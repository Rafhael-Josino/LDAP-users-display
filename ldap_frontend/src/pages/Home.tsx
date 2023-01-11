import { useState, useEffect } from 'react';
import { requestVPNusers } from '../actions';
import UsersList from '../components/UsersList';
import Spinner from '../components/Spinner';

function Home() {
    const [usersList, setUsersList] = useState([]);
    const [selectedBarrack, setSelectedBarrack] = useState('0');
    const [loadingState, setLoadingState] = useState(true);

    useEffect(() => {
        setLoadingState(true);
    }, [selectedBarrack]);

    useEffect(() => {
        const requestVPNusersAction = async () => {
            const res = await requestVPNusers(selectedBarrack);

            if (typeof res === 'string') {
                console.log('Error getting user list');
                setUsersList([]);
            } else {
                setUsersList(res);
            }
        }

        requestVPNusersAction();
    }, [loadingState])

    useEffect(() => {
        setLoadingState(false);
    }, [usersList])

    const setSelectedBarrackHelper = async (OMcode: string): Promise<void> => {
        setSelectedBarrack(OMcode);
    }

    return loadingState ? 
        <Spinner /> : 
        <UsersList 
            usersList={usersList} 
            selectedBarrack={selectedBarrack} 
            setSelectedBarrackHelper={setSelectedBarrackHelper}
        />
}

export default Home;