import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import VPNtimeFilter from '../components/VPNtimeFilterPT';
import BarrackSelector from '../components/BarrackSelector';
import DownloadCSVreact from '../components/DownloadCSVreact';
import OMselector from '../components/OMselector';
import { requestVPNusers } from '../actions';
import Spinner from '../components/Spinner';
import ListNavigator from '../components/ListNavigator';

type vpnUserType = {
    vpnUser: string,
    lastAccess: string,
};


function UsersList() {
    const [usersList, setUsersList] = useState<vpnUserType[]>([]);
    const [selectedBarrack, setSelectedBarrack] = useState('0');
    const [loadingState, setLoadingState] = useState(true);
    const [timeFilter, setTimeFilter] = useState('0');
    const [windowSize, setWindowSize] = useState<number>(10);
    const [windowIndex, setWindowIndex] = useState(0);


    useEffect(() => {
        setLoadingState(!loadingState);
    }, [selectedBarrack, usersList])

    useEffect(() => {
        const setUsersListHandler = async () => {
            const res = await requestVPNusers(selectedBarrack);

            if (res === 'error') {
                console.log('Error!')
            } else {
                setUsersList(res);
            }
        }

        if (selectedBarrack !== '0') setUsersListHandler();
    }, [selectedBarrack]);

    useEffect(() => {
        setWindowIndex(0);
    }, [windowSize, usersList]);

    useEffect(() => {
        setWindowSize(10)
    }, [usersList]);

    const selectHandle = (event: React.ChangeEvent<HTMLSelectElement>):void => {
        setTimeFilter(event.target.value); // change
    }
    
    const setSelectedBarrackHandler = async (barrackCode: string): Promise<void> => {
        setSelectedBarrack(barrackCode);
    }


    const vpnUsersFiltered = usersList.filter((user: vpnUserType) => {
        if (timeFilter === '0') {
            return true;
        } else if (timeFilter === '-1') {
            return user.lastAccess === '[NO LOG]';
        } else {
            const lastAccess = dayjs(user.lastAccess);
            return dayjs().subtract(Number(timeFilter), 'day').isBefore(lastAccess);
        }
    });

    const renderedUsersList = [<div className='vpnUser menu vpnHeader' key={-1}>
        <span>Nome</span>
        <span>Último acesso</span>
    </div>];

    for (let i=windowIndex; i<Math.min(vpnUsersFiltered.length, windowIndex+windowSize); i++) {
        const background_contrast = i % 2 ? '' : 'contrast';
        let error_css_class: string = '';

        if (vpnUsersFiltered[i].vpnUser.includes('perfil')) error_css_class = 'error';
        renderedUsersList.push(
            <div className={`vpnUser ${background_contrast} ${error_css_class}`} key={i}>
            <span>{vpnUsersFiltered[i].vpnUser}</span>
            <span>{vpnUsersFiltered[i].lastAccess}</span>
        </div>
        );
    }

    const nextUsersPage = () => {
        const newWindowsIndex = windowIndex + windowSize;
        if (newWindowsIndex <= vpnUsersFiltered.length) setWindowIndex(newWindowsIndex);
    }

    const previousUsersPage = () => {
        const newWindowsIndex = windowIndex - windowSize;
        if (newWindowsIndex >= 0) setWindowIndex(newWindowsIndex); 
    }

    const setWindowSizeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setWindowSize(Number(event.target.value));
    }


    return loadingState ? 
        <Spinner /> 
    : 
        <section className='container_userList'>
             <ListNavigator
                setWindowSizeHandler={setWindowSizeHandler}
                previousPage={previousUsersPage}
                nextPage={nextUsersPage}
                page={1+(windowIndex/windowSize)}
                lastPage={Math.ceil(vpnUsersFiltered.length/windowSize)}
            />

            <div className='container_filters'>
                <DownloadCSVreact vpnUsers={vpnUsersFiltered} />
                <OMselector selectedBarrack={selectedBarrack} setSelectedBarrackHandler={setSelectedBarrackHandler} vpnUsers={vpnUsersFiltered} />
                <VPNtimeFilter timeFilter={timeFilter} selectHandle={selectHandle} />
            </div>

            <div>
                {renderedUsersList}
            </div>
        </section>
}

export default UsersList;