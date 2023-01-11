import React, { useState } from 'react';
import dayjs from 'dayjs';
import VPNtimeFilter from './VPNtimeFilter';
import BarrackSelector from './BarrackSelector';
import DownloadCSVreact from './DownloadCSVreact';

type vpnUserType = {
    vpnUser: string,
    lastAccess: string,
};

type Props = {
    usersList: vpnUserType[],
    selectedBarrack: string,
    setSelectedBarrackHelper: (OMcode: string) => Promise<void>
}

function UsersList(props: Props) {
    const { usersList, selectedBarrack, setSelectedBarrackHelper } = props;

    const [timeFilter, setTimeFilter] = useState('0');

    const selectHandle = (event: React.ChangeEvent<HTMLSelectElement>):void => {
        setTimeFilter(event.target.value); // change
    }

    const vpnUsersFiltered = usersList.filter((user) => {
        if (timeFilter === '0') {
            return true;
        } else if (timeFilter === '-1') {
            return user.lastAccess === '[SEM LOG]';
        } else {
            const lastAccess = dayjs(user.lastAccess);
            return dayjs().subtract(Number(timeFilter), 'day').isBefore(lastAccess);
        }
    });

    const renderedUsersList = vpnUsersFiltered.map((user, index) => {
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

    return (
        <div className='container_userList'>
            <div className='container_filters'>
                <DownloadCSVreact vpnUsers={vpnUsersFiltered} />
                <BarrackSelector selectedBarrack={selectedBarrack} setSelectedBarrackHelper={setSelectedBarrackHelper} />
                <VPNtimeFilter timeFilter={timeFilter} selectHandle={selectHandle} />
            </div>
            <div>
                {renderedUsersList}
            </div>
        </div>
    );
}

export default UsersList;