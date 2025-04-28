import {useState} from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { useGetFlowDataQuery } from './features/flow/flowAPI';
import { ReactFlow, Background, Controls} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import FormNode from './components/Nodes/formNode';
import PrefillPanel from './components/PrefillPanel';


function App() {
  let nodeTypes = {form: FormNode}

  const {data, error, isLoading} = useGetFlowDataQuery()
  const [selectedNode, setSelectedNode] = useState(null)

  console.log(isLoading)
  console.log(data)
  console.log(data?.nodes)
  console.log(data?.edges)
  console.log(error)

  //let edges = data?.edges.map((edge) => edge = {...edge, id: edge.source + edge.target})
  let edges = data?.edges

  return (
    <div className="App">
      {isLoading && <div>Loading... </div>}
      {!isLoading && <div style={{height: '100%'}}>
        <PrefillPanel hidden={!selectedNode} nodeId={selectedNode} onClose={() => setSelectedNode(null)}/>
        <ReactFlow nodes={data.nodes} nodeTypes={nodeTypes} edges={edges} onNodeClick={(event, node) => setSelectedNode(node.id)}>
          <Background/>
          <Controls/>
        </ReactFlow>
      </div>}
    </div>
  );
}

export default App;
