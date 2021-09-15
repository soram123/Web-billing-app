
export const AddCustomer = (customerData)=>{

    return {
        type: "ADD_CUSTOMER",
        payload: customerData
    }
}

export const RemoveCustomer = (customerId)=>{

    return {
        type: "REMOVE_CUSTOMER",
        payload: customerId
    }
}

export const EditCustomer = (customer)=>{
    
    return {
        type: "EDIT_CUSTOMER",
        payload: customer
        
    }
}