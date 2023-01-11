import SaveUsersFile from "../../actions/SaveVPNUsersFile";

type VPNusersType = {
    vpnUser: string,
    OM: string,
    lastAccess: string,
}

async function SaveVPNusersUseCase(VPNusers: VPNusersType[]): Promise<void> {
    await SaveUsersFile(VPNusers);
}

export default SaveVPNusersUseCase;