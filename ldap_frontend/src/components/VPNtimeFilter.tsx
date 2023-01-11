type Props = {
    timeFilter: string,
    selectHandle: (event: React.ChangeEvent<HTMLSelectElement>) => void,
}

function VPNtimeFilter(props: Props) {
    const { timeFilter, selectHandle } = props;

    return (
        <div className='container_filter_submenu'>
            <div className='filter_submenu_element'>
                Last access in:
            </div>
            <select className='filter_submenu_element' onChange={(event) => selectHandle(event)}>
                <option value="0" selected={'0' === timeFilter}> No filter</option>
                <option value="1" selected={'1' === timeFilter}> 24 hours</option>
                <option value="7" selected={'7' === timeFilter}>7 days</option>
                <option value="15" selected={'15' === timeFilter}>15 days</option>
                <option value="30" selected={'30' === timeFilter}>30 days</option>
                <option value="90" selected={'90' === timeFilter}>90 days</option>
                <option value="-1" selected={'-1' === timeFilter}>No log</option>
            </select>
        </div>
    )
}

export default VPNtimeFilter;