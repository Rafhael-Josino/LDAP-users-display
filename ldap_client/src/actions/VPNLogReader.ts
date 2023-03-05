import csv from 'csv-parser';
import fs from 'fs';
import { join } from 'path';
import AppError from '../errors/AppErrors';
import dotenv from 'dotenv';
dotenv.config();

// Type according to the csv table read
type csvLogLine = {
    '###History VPN Logins-1###': string,
    _1: string, // username
    _2: string, // [other data]
    _3: string, // logging date
    _4: string, // [other data]
    _5: string, // [other data]
};

/**
 * response = {
 *      username1: loginDate
 *      username2: loginDate
 *      ...
 *      usernameN: logindate
 * }
 */

const VPNLogReader =  async (): Promise<any> => {
    // The object return will have the usernames as keys and his login date as its respective value
    const results = {};
    const filePath = join(__dirname, '..', '..', 'tmp', 'uploads');

    if (!fs.readdirSync(filePath).includes(process.env.LOG_FILE_NAME)) {
        throw new AppError('Log file not found', 404);
    } else {
        const end = new Promise((resolve, reject) => {
            fs.createReadStream(join(filePath, process.env.LOG_FILE_NAME))
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
}

export default VPNLogReader