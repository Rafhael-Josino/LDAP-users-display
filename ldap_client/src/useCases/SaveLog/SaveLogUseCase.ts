import { SaveLogPG } from "../../infrastructure/Postgres/repository";

async function SaveLogUseCase(formData: Express.Multer.File): Promise<void> {
    //await SaveLogPG(firstLog, lastLog);

    console.log(formData)
}

export default SaveLogUseCase;