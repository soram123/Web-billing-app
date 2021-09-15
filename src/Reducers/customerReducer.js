const customers = []

const customerReducer = (state=customers, action)=>{
    switch(action.type){
        case "ADD_CUSTOMER":{
            return [...state, {...action.payload}]
        }
        case "REMOVE_CUSTOMER":{
            return state.filter((cust)=>{
                return cust._id!==action.payload
            })
        }
        case "EDIT_CUSTOMER":{
           console.log('customer reducer', action.payload)
           console.log(state)
            return state.map((cus)=>{
                if(cus._id==action.payload._id){
                    return {...cus, ...action.payload}
                }
               else {
                    return {...cus}
               }
            }) 
           
        }
        default: {
            return [...state]
        }
    }
}
export default customerReducer