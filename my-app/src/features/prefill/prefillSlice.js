import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const prefillSlice = createSlice({
  name: 'prefill',
  initialState,
  reducers: {
    insert: (state, action) => {
        const {source, property, value} = action.payload;
        if(!state[source]){
            state[source] = {}
        }
        state[source][property] = value;
    },
    remove: (state, action) => {
        const {source, property} = action.payload;
        if(state[source] && state[source][property]){
            delete state[source][property]
        }
    }
  },
})

export const { insert, remove } = prefillSlice.actions

export default prefillSlice.reducer