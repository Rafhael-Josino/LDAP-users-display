import React, { useState } from 'react';
import dayjs from 'dayjs';
import VPNtimeFilter from '../components/VPNtimeFilterPT';
import BarrackSelector from '../components/BarrackSelector';
import DownloadCSVreact from '../components/DownloadCSVreact';
import OMselector from '../components/OMselector';

type vpnUserType = {
    vpnUser: string,
    lastAccess: string,
};


function UsersList() {
    const [usersList, setUsersList] = useState([]);
    const [selectedBarrack, setSelectedBarrack] = useState('0');
    const [loadingState, setLoadingState] = useState(false);
    const [timeFilter, setTimeFilter] = useState('0');    

    const selectHandle = (event: React.ChangeEvent<HTMLSelectElement>):void => {
        setTimeFilter(event.target.value); // change
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

    const renderedUsersList = vpnUsersFiltered.map((user: vpnUserType, index) => {
        const background_contrast = index % 2 ? '' : 'contrast';
        let error_css_class: string = '';

        if (user.vpnUser.includes('perfil')) error_css_class = 'error';

        return (
            <div className={`vpnUser ${background_contrast} ${error_css_class}`} key={index}>
                <span>{user.vpnUser}</span>
                <span>{user.lastAccess}</span>
            </div>
        )
    });

    const menuUserList = <div className='vpnUser menu' key={-1}>
        <span>Nome</span>
        <span>Último acesso</span>
    </div>

    renderedUsersList.unshift(menuUserList);

    const setSelectedBarrackHelper = async (barrackCode: string): Promise<void> => {
        setSelectedBarrack(barrackCode);
    }

    return (
        <div className='container_userList'>
            <div className='container_filters'>
                <DownloadCSVreact vpnUsers={vpnUsersFiltered} />
                <OMselector selectedBarrack={selectedBarrack} setSelectedBarrackHelper={setSelectedBarrackHelper} vpnUsers={vpnUsersFiltered} />
                <VPNtimeFilter timeFilter={timeFilter} selectHandle={selectHandle} />
            </div>
            <div>
                {renderedUsersList}
            </div>
        </div>
    );
}

export default UsersList;