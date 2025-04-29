import prefillSlice from "../features/prefill/prefillSlice";
import { useSelector } from 'react-redux'

function PrefillRow({formId, property, onClick}) {
    const value = useSelector((state) => state.formId?.property)    
    
    return (
      <div>
        {!value && <p onClick={onClick}>{property}</p>}
        {value && <p>{property + ": " + value.source + "." +value.property}</p>}
      </div>
    );
  }
  
  export default PrefillRow;