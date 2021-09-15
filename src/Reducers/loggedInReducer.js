const loggedIn = localStorage.getItem('LoggedIn')

const loggedInReducer = (state=loggedIn, action)=>{
    switch(action.type){
        case 'TOGGLE': {
            return state = action.payload
        }
        default : 
          return state
    }
   
}
export default loggedInReducer