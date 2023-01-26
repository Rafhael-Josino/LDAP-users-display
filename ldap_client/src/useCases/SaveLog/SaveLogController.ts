import { Request, Response } from 'express';
import SaveLogUseCase from './SaveLogUseCase';

async function SaveLogController(req: Request, res: Response): Promise<Response> {
    const formData = req.file;

    await SaveLogUseCase(formData);

    return res.send();
}

export default SaveLogController;
