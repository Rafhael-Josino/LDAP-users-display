import { useState } from 'react';
import { Link } from 'react-router-dom';
import { saveLogCSV } from '../actions';

function Home() {
    const [file, setFile] = useState<File>();

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('test new archive')

        const files = event.target.files as FileList;
        setFile(files[0]);
    }

    const handleOnSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('wholeList', file as File);

        const res = await saveLogCSV(formData);

        console.log(res);
    }

    return <section className='container-home'>
        <div className='item'>
            <Link to='vpnUsers'>Load VPN log of LDAP users</Link>
            <Link to='VPNLog'>Load VPN server's data</Link>
        </div>

        <br/>

        <form className="item">
            <button 
                className='form-item'
                onClick={event => handleOnSubmit(event)}
            >
                Carregar nova planilha de log
            </button>
            
            <input 
                className='form-item'
                type='file'
                accept='.csv'
                name='log' 
                onChange={event => handleOnChange(event)}
            />
        </form>
    </section>
}

export default Home;