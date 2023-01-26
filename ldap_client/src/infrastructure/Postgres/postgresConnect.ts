import { Pool } from 'pg';
import dotenv from 'dotenv';
import AppError from '../../errors/AppErrors';
dotenv.config();

//const host = process.env.NODE_ENV === 'nodocker' ? 'localhost' : process.env.DB_HOST;
const host = process.env.NODE_ENV ?? 'localhost'; // TEST THIS

const pool = new Pool({
    user: process.env.DB_USER,
    host,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

const PGconnector = {
    query: async (text: string, params: string[]): Promise<any> => {
        return pool.connect().then(async client => {
            return client.query(text, params).then(res => {
                client.release();
                
                return res;
            }).catch(err => {
                //client.release();

                throw new AppError(`Error connecting to database\n:${err.message}`, 500);
            });
        });
    }
}

export default PGconnector;