import { Router } from "express";
import GetVPNusersController from "../useCases/GetVPNuser/GetVPNUserController";
import SaveVPNusersController from "../useCases/SaveVPNusers/SaveVPNusersController";

const router = Router();

router.get('/vpnUsers/:OMcode/:fileName', GetVPNusersController);
router.post('/vpnUsers', SaveVPNusersController);

export default router;