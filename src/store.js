import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'


let cart = createSlice({
    name : 'cart',
    initialState : [
    ],
    reducers : {
        addCount(state, action){
            let 번호 = state.findIndex((a)=>{ return a.id === action.payload })
            state[번호].count++
          },
        sbtCount(state, action){
            let 번호 = state.findIndex((a)=>{ return a.id === action.payload })
            if(state[번호].count==1){
              alert("장바구니의 품목을 삭제합니다")
              state.splice(번호,1)
            } else {
              state[번호].count--
            }
          },
        addItem(state, action){        
            state.push(action.payload)       
        }
        }
    
  })

  export let {addCount,addItem,sbtCount} = cart.actions;  
  
  export default configureStore({
    reducer: {
      user : user.reducer,
      cart : cart.reducer
    }
  }) 