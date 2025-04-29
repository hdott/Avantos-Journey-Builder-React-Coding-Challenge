import {useState} from "react";
import prefillSlice from "../features/prefill/prefillSlice";
import { useSelector } from 'react-redux'
import globalData from "../globalData";
import useGetConnectedNodes from "../hooks/flowDataHelpers"
import { useGetFlowDataQuery } from "../features/flow/flowAPI";


function SetPrefillModal({onClose, nodeId}) {
    const {data, error, isLoading} = useGetFlowDataQuery()
    const connectedNodes = useGetConnectedNodes(nodeId);

    let availableData = {...globalData}
    console.log ("connectd nodes", connectedNodes)
    let formattedData;

    if(!isLoading){
        for(let connectedNode of connectedNodes){
            let currentNode = data?.nodes?.find((node) => node.id===connectedNode)
            let form = data?.forms?.find((form) => form.id === currentNode.data.component_id)

            availableData[currentNode.id] = {name: currentNode.data.name}
            availableData[currentNode.id].properties = form.field_schema.properties
        }
        console.log("AVAILALBE DATA", availableData)
        
        formattedData = Object.values(availableData).map((formData) => ({
            name: formData.name,
            properties: Object.keys(formData.properties),
          }));
        
          console.log("formattedData:", formattedData);
        
    
        console.log(formattedData)
    }

    return(
        <div>
            <ul>
        {formattedData.map((formData) => (
          <li className="prefill-list-item" key={formData.name}>
            <p>{formData.name}</p>
            <ul>
              {formData.properties && formData.properties.map((property) => (
                <li className="prefill-list-item" key={property}>{property}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
            <button onClick={onClose}>Close</button>
        </div>
    )
}
  
export default SetPrefillModal;