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
            {id: 'vpnUser', title: 'Name'},
            {id: 'OM', title: 'Barrack'},
            {id: 'lastAccess', title: 'Last Access'},
        ]
    });

    await csvWriter.writeRecords(VPNusers);
}

export default SaveUsersFile;