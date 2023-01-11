import { Request, Response } from 'express';
import GetVPNusersUseCase from './GetVPNusersUseCase';

type LastAccessType = {
    vpnUser: string,
    lastAccess: string,
}

async function GetVPNusersController(req: Request, res: Response): Promise<Response> {
    const { barrackCode, fileName } = req.params;

    const VPNusers: LastAccessType[] = await GetVPNusersUseCase(barrackCode, fileName);
    
    return res.json({ VPNusers });
}

export default GetVPNusersController;