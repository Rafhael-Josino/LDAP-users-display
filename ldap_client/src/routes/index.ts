import { Router } from "express";
import multer from 'multer';
import GetVPNusersController from "../useCases/GetVPNuser/GetVPNUserController";
import SaveLogController from "../useCases/SaveLog/SaveLogController";
import GetSavedCSVLogController from "../useCases/GetSavedCSVLog/GetSavedCSVLogController";
import dotenv from 'dotenv';
dotenv.config();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './tmp/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, process.env.LOG_FILE_NAME);
    }
})

const upload = multer({ storage });
const router = Router();

router.get('/vpnUsers/:barrackCode', GetVPNusersController);
router.post('/vpnLog', upload.single('log'), SaveLogController);
router.get('/vpnLog', GetSavedCSVLogController);

export default router;