import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { useGetFlowDataQuery } from './features/flow/flowAPI';
import { ReactFlow, Background, Controls} from '@xyflow/react';
import '@xyflow/react/dist/style.css';


function App() {
  const {data, error, isLoading} = useGetFlowDataQuery()

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
          <ReactFlow nodes={data.nodes} edges={edges}>
            <Background/>
            <Controls/>
          </ReactFlow>
        </div>}
    </div>
  );
}

export default App;
