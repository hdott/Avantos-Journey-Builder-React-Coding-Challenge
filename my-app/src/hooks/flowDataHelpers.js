import { useGetFlowDataQuery } from "../features/flow/flowAPI";
import { useMemo } from "react";

const useGetConnectedNodes = (nodeId) => {
  const { data, isLoading, error } = useGetFlowDataQuery();

    if (!data || isLoading || error){
        return null;
    } 

    const edges = data.edges;
    const seen = {};
    const nodesToSee = [nodeId];

    while (nodesToSee.length > 0) {
        const current = nodesToSee.pop();
        const connected = edges.filter(edge => edge.target === current);

        for(let edge of connected){
            if (!seen[edge.source]) {
                seen[edge.source] = true;
                nodesToSee.push(edge.source);
            }
        };
    }

    return Object.keys(seen);

};

export default useGetConnectedNodes;
