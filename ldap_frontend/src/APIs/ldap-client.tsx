import axios from 'axios';

export default axios.create({
    baseURL: 'http://10.122.7.234:8000/' // change onto a env variable
    //baseURL: 'ldap_client:8000/'
});