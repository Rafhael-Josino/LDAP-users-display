import csv from 'csv-parser';
import fs from 'fs';
import { join } from 'path';

// Type according to the csv table read
type csvLogLine = {
    '###History VPN Logins-1###': string,
    _1: string, // user
    _2: string, // [other data]
    _3: string, // loging date
    _4: string, // [other data]
    _5: string, // [other data]
};

const VPNLogReader =  async (fileName: string): Promise<any> => {
    // The object return will have the usernames as keys and his login date as its respective value
    const results = {};
    const filePath = join(__dirname, '..', '..', 'logs', fileName);
    
    let end = new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data: csvLogLine) => {
                results[data._1] = data._3
            })
            .on('end', () => {
                resolve(results);
            })
            .on('error', reject);
    });

    return await end;
}

export default VPNLogReader