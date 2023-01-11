import { Blocks } from "react-loader-spinner";

function Spinner() {
    return <div className="spinner-block">
        <Blocks 
            height="80"
            width="80"
            color="green"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
        />
    </div>
    
}

export default Spinner;