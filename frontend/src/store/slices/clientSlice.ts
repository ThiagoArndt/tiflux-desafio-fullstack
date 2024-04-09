import { createSlice } from '@reduxjs/toolkit'
import { ClientInterface } from '../../types/clientTypes'

interface ActionsArrayInterface{
    payload: ClientInterface[]
}

interface ActionsInterface{
    payload: ClientInterface
}

const clientsSlice = createSlice({
  name: 'clients',
  initialState: [],
  reducers: {
    clientPush(state:ClientInterface[], action:ActionsArrayInterface) {
        state.push(...action.payload)
      },
    clientPushOne(state:ClientInterface[], action:ActionsInterface) {
   
       state.push(action.payload);
      },
 
    clientAdded(state:ClientInterface[], action:ActionsInterface) {
      state.push({
        id: action.payload.id,
        name: action.payload.name,
        address: action.payload.address,
        contacts: action.payload.contacts,
        document: action.payload.document,
      })
    },
    
    clientUpdated(state:ClientInterface[], action:ActionsInterface) {
      const clientIndex = state.findIndex(client => client.id === action.payload.id)
      state[clientIndex] = action.payload;
    },
    clientDeleted(state:ClientInterface[], action:ActionsInterface) {
        const clientIndex = state.findIndex(client => client.id === action.payload.id)
        state.splice(clientIndex, 1)
      }
  }
})



export const { clientPush, clientPushOne, clientAdded,clientUpdated, clientDeleted } = clientsSlice.actions
export default clientsSlice.reducer