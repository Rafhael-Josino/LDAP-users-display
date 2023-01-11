import ldap from 'ldapjs';
import dotenv from 'dotenv';
dotenv.config();

const LDAPconnect = {
    query: async (queryCallback: (client: ldap.Client, params: any) => any, params: any): Promise<any> => {
        const client = ldap.createClient({
            url: [process.env.LDAP_URL]
        });

        client.on('error', (err) => {
            console.log('error connecting with ldap server:\n', err);
        });

        const res = await queryCallback(client, params);

        client.unbind();

        return res;
    }
}

export default LDAPconnect;