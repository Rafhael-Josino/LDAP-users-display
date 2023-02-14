import axios from "axios";
import ldapClient from "../APIs/ldap-client";

async function requestVPNusers(barrackCode: string, logFileName: string) {
    try {
        const res = await ldapClient.get(`vpnUsers/${barrackCode}/${logFileName}`);

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

async function saveLogCSV(formData: FormData) {
    try {
        const res = await axios.post("http://localhost:8000/vpnLog", formData, {});

        return res;
    } catch(err: any) { 
        console.log('error:\n', err);
        //return err.response.data.message;
        return err;
    }
}

async function getSavedLog() {
    try {
        return await ldapClient.get('vpnLog');
    } catch(err: any) {
        console.log('error:\n', err);
        //return err.response.data.message;
        return err;
    }
    
}

export { requestVPNusers, saveVPNusersCSV, saveLogCSV, getSavedLog };