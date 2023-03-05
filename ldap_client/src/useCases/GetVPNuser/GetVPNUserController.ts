import { Request, Response } from 'express';
import GetVPNusersUseCase from './GetVPNusersUseCase';

type LastAccessType = {
    vpnUser: string,
    lastAccess: string,
}

async function GetVPNusersController(req: Request, res: Response): Promise<Response> {
    const { barrackCode } = req.params;
    
    const VPNusers: LastAccessType[] = await GetVPNusersUseCase(barrackCode);
    
    return res.json({ VPNusers });
}

export default GetVPNusersController;