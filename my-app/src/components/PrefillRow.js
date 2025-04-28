import { useGetFlowDataQuery } from "../features/flow/flowAPI";

function PrefillRow({formId, property}) {
    
    return (
      <div>
        <p>{property}</p>
      </div>
    );
  }
  
  export default PrefillRow;