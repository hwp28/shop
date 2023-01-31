import { createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name : 'user',
    initialState : {name : 'kim', age : 20},
    reducers : {
      changeName(state){
        state.name = '박해원';
      },
      increase(state){
        state.age += 1;
      }
    }
  }) 


  export let { changeName,increase } = user.actions 
  export default user;