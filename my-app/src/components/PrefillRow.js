import prefillSlice from "../features/prefill/prefillSlice";
import { useDispatch, useSelector } from 'react-redux'
import { remove } from "../features/prefill/prefillSlice";

function PrefillRow({nodeId, property, onClick}) {
    const value = useSelector((state) => state.prefill?.[nodeId]?.[property])    
    const value2 = useSelector((state)=>state.prefill)
    const dispatch = useDispatch()


    console.log(value2)
    
    return (
      <div>
        {!value && <div onClick={onClick} className="prefill-empty">{property}</div>}
        {value && <div>
          {property + ": " + value.source + "." +value.property}
          <button onClick={() => dispatch(remove({source: nodeId, property: property}))}>X</button>
          </div>}
      </div>
    );
  }
  
  export default PrefillRow;