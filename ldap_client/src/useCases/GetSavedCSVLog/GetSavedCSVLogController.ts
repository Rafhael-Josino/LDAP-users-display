import { Request, Response } from 'express';
import VPNLogsReader from '../../actions/VPNLogReader';

async function GetSavedCSVLogController(req: Request, res: Response): Promise<Response> {
    try {
        const vpnLogs = await VPNLogsReader();

        return res.json({ vpnLogs });
    } catch (err) {
        return res.status(404).send('No log file found');
    }
}

export default GetSavedCSVLogController;