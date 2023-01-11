import ldapClient from "../APIs/ldap-client";

async function requestVPNusers(barrackCode: string) {
    try {
        const res = await ldapClient.get(`vpnUsers/${barrackCode}`);

        console.log(res)

        return res.data.VPNusers;
    } catch (err: any) {
        console.log('error:\n', err);
        //return err.response.data.message;
        return err;
    }
}

type vpnUserType = {
    vpnUser: string,
    OM: string,
    lastAccess: string,
};

async function saveVPNusersCSV(vpnUsers: vpnUserType[]) {
    try {
        await ldapClient.post('vpnUsers', { vpnUsers });
    } catch (err: any) {
        console.log('error:\n', err);
        //return err.response.data.message;
        return err;
    }
}

export { requestVPNusers, saveVPNusersCSV };