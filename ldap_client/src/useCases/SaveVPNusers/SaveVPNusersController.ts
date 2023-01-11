import { Request, Response } from "express";
import SaveVPNusersUseCase from "./SaveVPNusersUseCase";

async function SaveVPNusersController(req: Request, res: Response): Promise<Response> {
    const { vpnUsers } = req.body;

    await SaveVPNusersUseCase(vpnUsers);
    
    return res.status(204).send();
}

export default SaveVPNusersController;