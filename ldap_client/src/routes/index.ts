import { Router } from "express";
import multer from 'multer';
import GetVPNusersController from "../useCases/GetVPNuser/GetVPNUserController";
import SaveVPNusersController from "../useCases/SaveVPNusers/SaveVPNusersController";
import SaveLogController from "../useCases/SaveLog/SaveLogController";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './tmp/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, 'logVPN.csv');
    }
})

const upload = multer({ storage });
const router = Router();

router.get('/vpnUsers/:barrackCode/:fileName', GetVPNusersController);
router.post('/vpnUsers', SaveVPNusersController);
router.post('/vpnLog', upload.single('log'), SaveLogController);

export default router;