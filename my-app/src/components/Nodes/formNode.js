import { Handle, Position } from '@xyflow/react';
import './node.css'
 
//const handleStyle = { left: 10 };
 
function FormNode({ data, isConnectable }) {
 
  return (
    <div className="form-node">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div className='icon' hidden>
        {/*Got below from https://lucide.dev/icons/table*/}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table-icon lucide-table"><path d="M12 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/></svg>
      </div>
      <div>        
        <p className="type">Form</p>
        <p>{data.name}</p>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  );
}
 
export default FormNode;