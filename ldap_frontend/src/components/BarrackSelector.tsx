type Props = {
    selectedBarrack: string,
    setSelectedBarrackHelper: (OMcode: string) => Promise<void>
}

function BarrackSelector (props: Props) {
    const { selectedBarrack, setSelectedBarrackHelper } = props;

    return (
        <div className="container_filter_submenu">
            <select 
                className="filter_submenu_element" 
                onChange={(event) => setSelectedBarrackHelper(event.target.value)}
                value={selectedBarrack}
            >
                <option value={0}>Select Barrack</option>
                <option value={1}>Barrack 1</option>
                <option value={2}>Barrack 2</option>
                <option value={3}>Barrack 3</option>
            </select>
        </div>
    );
    // The options's values above depend on the value saved in the ldap server
    // except for the first one that is just the select default option
}

export default BarrackSelector;