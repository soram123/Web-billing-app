
export const AddProduct= (productData)=>{

    return {
        type: "ADD_PRODUCT",
        payload: productData
    }
}

export const RemoveProduct = (productId)=>{

    return {
        type: "REMOVE_PRODUCT",
        payload: productId
    }
}

export const EditProduct = (product)=>{
    
    return {
        type: "EDIT_PRODUCT",
        payload: product
        
    }
}

