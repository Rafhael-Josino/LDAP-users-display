import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSavedLog } from "../actions";
import Spinner from '../components/Spinner';
import ListNavigator from '../components/ListNavigator';


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
    }, [windowSize]);

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

    return <section className='container_userList'>
       <ListNavigator 
            setWindowSizeHandler={setWindowSizeHandler}
            previousPage={previousUsersPage}
            nextPage={nextUsersPage}
            page={Math.floor(windowIndex/windowSize)+1}
            lastPage={Math.ceil(log.length/windowSize)}
         />

        <div>
            {log.length ? renderedLog : <Spinner />}
        </div>
    </section >
}

export default VPNLog;