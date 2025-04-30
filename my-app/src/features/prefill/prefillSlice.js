import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

/*Structure is =
{
  destination1: {             node.id

    disabled: bool

    properties{

      property1: {

        name: str

        value: any

      },

      ...

    }

  },

  ...
}
  */

export const prefillSlice = createSlice({
  name: 'prefill',
  initialState,
  reducers: {
    insert: (state, action) => {
        const {destination, property, value} = action.payload;
        if(!state[destination]){
            state[destination] = {disabled: false, properties: {}}
        }
        state[destination].properties[property] = value;
    },
    remove: (state, action) => {
        const {destination, property} = action.payload;
        if(state[destination] && state[destination].properties[property]){
            delete state[destination].properties[property]
        }
    },
    toggle: (state, action) => {
        const {destination} = action.payload
        if(!state[destination]){
          state[destination] = {disabled: true, properties: {}}
        }
        else{
          state[destination].disabled = !state[destination].disabled
        }
        console.log(state[destination].disabled)
        console.log(!state[destination].disabled)

    }
  },
})

export const { insert, remove, toggle} = prefillSlice.actions

export default prefillSlice.reducer