import { useGetFlowDataQuery } from "../features/flow/flowAPI";
import PrefillRow from "./PrefillRow";

function PrefillPanel({nodeId, onClose}) {
    console.log(nodeId)
    const {data, error, isLoading} = useGetFlowDataQuery()

    //Get form properties from nodeId
    let currentNode;
    let form;
    let propertiesList;

    if(nodeId){
      currentNode = data?.nodes?.find((node) => node.id===nodeId)
      form = data?.forms?.find((form) => form.id === currentNode.data.component_id)
      propertiesList = Object.keys(form.field_schema.properties).map((property) => {return <PrefillRow formId={form.id} property={property}/>})
    }
  
    return (
      <div>
        {isLoading && <div>Loading... </div>}
        {!isLoading && nodeId && <div> 
            <p>{currentNode.data.name}</p>
            {propertiesList}
            <button onClick={() => onClose()}>Close</button>
          </div>}
      </div>
    );
  }
  
  export default PrefillPanel;