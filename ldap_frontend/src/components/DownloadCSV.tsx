import { useState } from 'react';
import { saveVPNusersCSV } from '../actions';

type vpnUserType = {
    vpnUser: string,
    OM: string,
    lastAccess: string,
};

type Props = {
    vpnUsers: vpnUserType[],
}

function DownloadCSV(props: Props) {
    const { vpnUsers } = props;
    const [loading, setLoading] = useState(false);

    const downloadHandle = async (): Promise<void> => {
        setLoading(true);
        await saveVPNusersCSV(vpnUsers);
        setLoading(false);
    }

    const buttonLabel = loading ? "Loading" : "Download CSV file";

    return (
        <div className='container_filter_submenu'>
            <div className="filter_submenu_element">{vpnUsers.length} users found</div>
            <button onClick={() => { if (!loading) downloadHandle()}} className="filter_submenu_element">{buttonLabel}</button>
        </div>
    )
}

export default DownloadCSV;