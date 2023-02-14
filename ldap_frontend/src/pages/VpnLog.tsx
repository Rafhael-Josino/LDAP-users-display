import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSavedLog } from "../actions";
import Spinner from '../components/Spinner';

function VPNLog() {
    const [log, setLog] = useState<{
        username: string,
        loginDate:string,
    }[]>([]);
    const [windowSize, setWindowSize] = useState<number>(10);
    const [windowIndex, setWindowIndex] = useState(1);

    useEffect(() => {
        const getSavedLogHelper = async () => {
            const res =  await getSavedLog();
            
            const savedLog = Object.keys(res.data.vpnLogs).map(username => { 
                return {username, loginDate: res.data.vpnLogs[username]} 
            });

            setLog(savedLog);
        }

        getSavedLogHelper();
    }, []);

    useEffect(() => {
        setWindowIndex(1);
    }, [windowSize])

    const renderedLog = [<div className='vpnUser menu vpnHeader' key={-1}>
        <span>Nome</span>
        <span>Último acesso</span>
    </div>];

    for (let i=windowIndex; i<Math.min(log.length, windowIndex+windowSize); i++) {
        const tableRowColor = i % 2 ? 'contrast' : '';

        renderedLog.push(<div className={`vpnUser menu ${tableRowColor}`} key={i}>
            <span>{log[i].username}</span>       
            <span>{log[i].loginDate}</span>
        </div>);
    }

    const nextUsersPage = () => {
        const newWindowsIndex = windowIndex + windowSize;
        if (newWindowsIndex <= log.length) setWindowIndex(newWindowsIndex);
    }

    const previousUsersPage = () => {
        const newWindowsIndex = windowIndex - windowSize;
        if (newWindowsIndex > 0) setWindowIndex(newWindowsIndex); 
    }

    const setWindowSizeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setWindowSize(Number(event.target.value));
    }

    const loadedPage = <div>
        {renderedLog}
        <div className='vpnUser menu vpnHeader'>
            Page {Math.floor(windowIndex/windowSize)+1}/{Math.ceil(log.length/windowSize)}
        </div>
    </div>

    return <main>
        <nav>
            <Link to='/'>Return</Link>
            <div className='nav2'>
                <span>Usuários por página:</span>
                <select onChange={(e) => setWindowSizeHandler(e)}>
                    <option value={10}>10</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
                <button onClick={previousUsersPage}>{'<'}</button>
                <button onClick={nextUsersPage}>{'>'}</button>
            </div>
        </nav>

        <section>
            {log.length ? loadedPage : <Spinner />}
        </section>
    </main>
}

export default VPNLog;