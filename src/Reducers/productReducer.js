const products = []

const productReducer = (state=products, action)=>{
    switch(action.type){
        case "ADD_PRODUCT":{
            return [...state, {...action.payload}]
        }
        case "REMOVE_PRODUCT":{
            return state.filter((product)=>{
                return product._id!==action.payload
            })
        }
        case "EDIT_PRODUCT":{
           console.log('customer reducer', action.payload)
           console.log(state)
            return state.map((prod)=>{
                if(prod._id==action.payload._id){
                    return {...prod, ...action.payload}
                }
               else {
                    return {...prod}
               }
            }) 
           
        }
        default: {
            return [...state]
        }
    }
}
export default productReducer