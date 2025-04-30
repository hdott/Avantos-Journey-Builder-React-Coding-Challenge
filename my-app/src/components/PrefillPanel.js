import { useGetFlowDataQuery } from "../features/flow/flowAPI";
import PrefillRow from "./PrefillRow";
import { useState } from "react";
import SetPrefillModal from "./SetPrefilModal";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../features/prefill/prefillSlice";


function PrefillPanel({nodeId, onClose}) {
    const {data, error, isLoading} = useGetFlowDataQuery()
    const [modifying, setModifying] = useState(null)
    const value = useSelector((state) => state.prefill?.[nodeId]?.disabled)
    const dispatch = useDispatch()

    console.log(value)

    //Get form properties from nodeId
    let currentNode;
    let form;
    let propertiesList;

    if(nodeId && !isLoading && data){
      currentNode = data?.nodes?.find((node) => node.id===nodeId)
      form = data?.forms?.find((form) => form.id === currentNode?.data?.component_id)
      if(form){
        propertiesList = Object.keys(form?.field_schema?.properties).map((property) => {return <PrefillRow nodeId={currentNode.id} property={property} onClick={()=>setModifying({form: form.id, property: property})}/>})
      }
    }
  
    return (
      <div>
        {isLoading && <div>Loading... </div>}
        {!isLoading && error && <div>Something went wrong retrieving data</div>}
        {!isLoading && modifying && <SetPrefillModal onClose={() => setModifying(null)} nodeId={nodeId} selectedProperty={modifying.property}/>}
        {!isLoading && data && nodeId && <div className="prefill-panel-overlay">
          <div className="prefill-panel-content">
            <p className="heading">{"Prefill " + currentNode?.data?.name}</p>
            <div className="prefill-subheading">
              Prefill fields for this form
              <input type="checkbox" checked={!value} onChange={() => dispatch(toggle({destination: nodeId}))}></input>
            </div>
            {!value && propertiesList}
            <br/>
            <button onClick={() => onClose()} className="close-button">CLOSE</button>
          </div>
          </div>} 
      </div>
    );
  }
  
  export default PrefillPanel;