import { Request, Response } from "express";

async function SaveLogVPNController(req: Request, res: Response): Promise<Response> {
    console.log(req.file);

    return res.status(204).send();
}

export default SaveLogVPNController;