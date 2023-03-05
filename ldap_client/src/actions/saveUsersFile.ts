import { createObjectCsvWriter } from "csv-writer";
import { join } from 'path'

type VPNusersType = {
    vpnUser: string,
    OM: string,
    lastAccess: string,
}

async function SaveUsersFile (VPNusers: VPNusersType[]): Promise<any> {
    const fileName = join(__dirname, '..', '..', 'logs', 'out.csv');
    
    const csvWriter = createObjectCsvWriter({
        path: fileName,
        header: [
            {id: 'vpnUser', title: 'Nome'},
            {id: 'OM', title: 'OM'},
            {id: 'lastAccess', title: 'Último acesso'},
        ]
    });

    await csvWriter.writeRecords(VPNusers);
}

export { SaveUsersFile }