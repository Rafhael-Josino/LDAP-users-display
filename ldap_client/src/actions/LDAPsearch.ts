import ldap from 'ldapjs';

// Get users from a group that have bad format name tags
const searchStrangeNamesByGroup = async (client: ldap.Client, group: string): Promise<any> => {
    const promise = new Promise((resolve, reject) => {
        client.search(`cn=${group},ou=groups,dc=21ct,dc=eb,dc=mil,dc=br`, {}, (err, res) => {
            console.log("Finding users saved with wrong format from the group:", group);
               
            res.on('searchEntry', (entry) => {
                // For now, the restriction is only not have capital letters
                const regexWrongUser = /uid=([A-Z]|\s)/;
        
                // If there is only one entry, perhaps the memberUid key is only a string instead of a string array
                const wrongUsers = (entry.object.memberUid as string[])
                .filter((wrongUser) => wrongUser.match(regexWrongUser));
                
                resolve(wrongUsers);
            });
        });
    });

    return await promise;
}

// Get user information by the uid
const searchUserByUid = async (client: ldap.Client, uid: string): Promise<any> => {
    const promise = new Promise((resolve, reject) => {
        client.search(uid, { attributes: ['dn', 'gidNumber'] }, (err, res) => {
            res.on('error', (resErr) => {
                resolve(null);
            });

            res.on('searchEntry', (entry) => {
                resolve(entry.object)
            });
        });
    });

    return await promise;
}

// Get users list by group
const searchUsersByGroup = async (client: ldap.Client, group: string): Promise<any> => {
    const promise = new Promise((resolve, reject) => {
        client.search(`cn=${group},ou=groups,dc=21ct,dc=eb,dc=mil,dc=br`, {}, (err, res) => {
            res.on('searchEntry', (entry) => resolve(entry.object.memberUid));
        });
    });

    return await promise;
}

type GroupAndOM = {
    group: string,
    barrackCode: string,
}

// Get users list by group and barrack
const searchUsersByGroupAndBarrack = async (client: ldap.Client, req: GroupAndOM): Promise<any> => {
    const { group, barrackCode } = req;

    const promise = new Promise((resolve, reject) => {
        client.search(`cn=${group},ou=groups,dc=21ct,dc=eb,dc=mil,dc=br`, {}, (err, res) => {
            res.on('searchEntry', async (entry) => {
                const users = [];
                await (entry.object.memberUid as string[]).reduce(
                    async (promise2, memberUid) => {
                        await promise2;
                        const user = await searchUserByUid(client, memberUid);
                        if (user) {
                            if (user.gidNumber === barrackCode) users.push(user);
                        }
                    },
                    Promise.resolve()
                );
                resolve(users);
            });
        });
    });

    return await promise;
}

export { searchStrangeNamesByGroup, searchUserByUid, searchUsersByGroup, searchUsersByGroupAndBarrack };""