import { useGetFlowDataQuery } from "../features/flow/flowAPI";
import PrefillRow from "./PrefillRow";
import { useState, useMemo } from "react";
import SetPrefillModal from "./SetPrefilModal";

function PrefillPanel({nodeId, onClose}) {
    const {data, error, isLoading} = useGetFlowDataQuery()
    const [modifying, setModifying] = useState(null)

    console.log(modifying)


    //Get form properties from nodeId
    let currentNode;
    let form;
    let propertiesList;

    if(nodeId){
      currentNode = data?.nodes?.find((node) => node.id===nodeId)
      form = data?.forms?.find((form) => form.id === currentNode.data.component_id)
      propertiesList = Object.keys(form.field_schema.properties).map((property) => {return <PrefillRow nodeId={currentNode.id} property={property} onClick={()=>setModifying({form: form.id, property: property})}/>})
    }
  
    return (
      <div>
        {isLoading && <div>Loading... </div>}
        {!isLoading && nodeId && <div className="modal"> 
            <p>{currentNode.data.name}</p>
            {propertiesList}
            <button onClick={() => onClose()}>Close</button>
          </div>} 
        {!isLoading && modifying && <SetPrefillModal onClose={() => setModifying(null)} nodeId={nodeId} selectedProperty={modifying.property}/>}
      </div>
    );
  }
  
  export default PrefillPanel;