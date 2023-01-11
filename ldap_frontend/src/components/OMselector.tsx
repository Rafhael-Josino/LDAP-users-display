type Props = {
    selectedBarrack: string,
    setSelectedOMHelper: (OMcode: string) => Promise<void>
}

function OMselector(props: Props) {
    const { selectedBarrack, setSelectedOMHelper } = props;

    return (
        <div className="container_filter_submenu">
            <select 
                className="filter_submenu_element" 
                onChange={(event) => setSelectedOMHelper(event.target.value)}
                value={selectedBarrack}
            >
                <option value={0}>Selecione a OM</option>
                <option value={10009}>21º CT</option>
                <option value={10001}>10º BIL</option>
                <option value={10019}>Cmdo 4ª RM</option>
                <option value={10020}>55ºBI</option>
                <option value={10023}>CIJF</option>
                <option value={10024}>CMJF</option>
                <option value={10026}>ESA</option>
                <option value={10003}>PRM</option>
                <option value={10004}>12º BIL</option>
                <option value={10005}>12º CSM</option>
                <option value={10006}>13º CSM</option>
                <option value={10007}>14º GAC</option>
                <option value={10015}>4º DSup</option>
                <option value={10047}>4º GACL</option>
                <option value={10028}>HGeJF</option>
                <option value={10012}>4º BECmb</option>
                <option value={10014}>4º Cia PE</option>
                <option value={10017}>4º GAAAe</option>
                <option value={10018}>4ª CGCFEx</option>
                <option value={10002}>11º BIMth</option>
                <option value={10008}>17º BLog</option>
                <option value={10010}>35º Pel PE</option>
                <option value={10022}>4ª Cia Cmd</option>
                <option value={10029}>SFPC 4ª RM</option>
                <option value={10013}>4ªCia Com L</option>
                <option value={10016}>4ºEsqd C Mec</option>
                <option value={10025}>CPOR / CMBH</option>
                <option value={10027}>Posto Méd BH</option>
                <option value={10021}>Cia Cmd 4ª Bda</option>
                <option value={10043}>Cmdo 4ª Bda</option>
            </select>
        </div>
    )
}

export default OMselector;