import {useState} from "react";
import prefillSlice from "../features/prefill/prefillSlice";
import {useDispatch } from 'react-redux'
import globalData from "../globalData";
import useGetConnectedNodes from "../hooks/flowDataHelpers"
import { useGetFlowDataQuery } from "../features/flow/flowAPI";
import { insert } from "../features/prefill/prefillSlice";

function SetPrefillModal({onClose, nodeId, selectedProperty}) {
    const {data, error, isLoading} = useGetFlowDataQuery()
    const connectedNodes = useGetConnectedNodes(nodeId);
    const dispatch = useDispatch()
    const [showLists, setShowLists] = useState({})
    const [search, setSearch] = useState("")

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
            properties: Object.keys(formData.properties).filter((property) => property.toLowerCase().includes(search)),
          }));
        
          console.log("formattedData:", formattedData);
        
    
        console.log(formattedData)
    }

    return(
      <div>
        {isLoading && <div>Loading... </div>}
        {!isLoading && error && <div>Something went wrong retrieving data</div>}
        {!isLoading && data && <div className="modal-overlay">
          <div className="modal-content">
            <p className="heading">Select data element to map</p>
            Available Data
            <br/>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
            <ul>
              {formattedData.map((formData) => (
                <li className="prefill-list-item" key={formData.name}>
                  <span className={(!showLists[formData.name] && "arrow-right") || (showLists[formData.name] && "arrow-down")}></span>
                  <span style={{paddingLeft: 3}} className="clickable" onClick={()=>setShowLists({...showLists, [formData.name]: !showLists[formData.name]})}>{formData.name}</span>
                  {showLists[formData.name] && <ul>
                    {formData.properties && formData.properties.map((property) => (
                      <li className="prefill-list-item" key={property}>
                        <span className="clickable" onClick={()=>{dispatch(insert({source: nodeId, property: selectedProperty, value: {source: formData.name, property: property}})); onClose()}}>{property}</span>
                      </li>
                    ))}
                  </ul>}
                </li>
              ))}
            </ul>
            <button onClick={onClose} className="cancel-button">CANCEL</button>
          </div>
        </div>}
      </div>
    )
}
  
export default SetPrefillModal;