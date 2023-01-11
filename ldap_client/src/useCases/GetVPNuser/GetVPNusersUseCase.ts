import LDAP from '../../infrastructure/LDAPconnect';
import { searchUsersByGroupAndBarrack } from '../../actions/LDAPsearch';
import VPNLogsReader from '../../actions/VPNLogReader';

type LastAccessType = {
    vpnUser: string,
    lastAccess: string,
}

async function GetVPNusersUseCase(barrackCode: string, fileName: string): Promise<LastAccessType[]> {
    // Getting log information from CSV file
    const vpnLogs = await VPNLogsReader(fileName);

    // Getting VPN users registered on LDAPconnect server
    const vpnUsers = await LDAP.query(searchUsersByGroupAndBarrack, { group: 'vpn', barrackCode });

    // valid users must have the format [name].[name]
    const userNameRegex = /\w+\.\w+/;

    const lastAccessLog = vpnUsers.map((vpnUser) => {
        // Will only retrieve data from valid users
        const userName = userNameRegex.exec(vpnUser.dn);
        if (userName) {
            return vpnLogs[userName[0]] ?
            { 
                vpnUser: userName[0],
                lastAccess: vpnLogs[userName[0]],
            } :
            // If the user has no entry in the VPN log,
            // it will be inserted in this field the string [NO LOG]
            {
                vpnUser: userName[0],
                lastAccess: "[NO LOG]",
            }
        } else {
            return {
                vpnUser: '',
                lastAccess: null,
            }
        }
    });

    return lastAccessLog.filter((logEntry: LastAccessType) => logEntry.vpnUser !== '');
}

export default GetVPNusersUseCase;