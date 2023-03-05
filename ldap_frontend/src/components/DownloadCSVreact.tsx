import { CSVLink } from 'react-csv';

type vpnUserType = {
    vpnUser: string,
    lastAccess: string,
};

type Props = {
    vpnUsers: vpnUserType[],
}

function DownloadCSVreact(props: Props) {
    const { vpnUsers } = props;

    return (
        <div className='container_filter_submenu'>
            <CSVLink data={vpnUsers} className="filter_submenu_element">Download CSV file</CSVLink>
        </div>
    )
}

export default DownloadCSVreact;