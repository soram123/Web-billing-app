import { Button } from "reactstrap"
import axios from "axios"
import { message } from "antd"

const Cart = (props)=>{
   const { products, date, customerId,lineItems,Qty,handleRemove,handleAdd,handleMinus,handleLineItem} = props
    //console.log("customer in caart", customerId)
   const headers = {
    headers : {
        'Authorization' : "Bearer "+localStorage.getItem('token')
    }
}
    const cartData = {
        date: date,
        customer: customerId,
        lineItems: lineItems
    }

    const handleGenerate = ()=>{
        axios.post('http://dct-billing-app.herokuapp.com/api/bills',cartData,headers)
         .then((response)=>{
             const res = response.data
             console.log(res)
             message.success('successfully submitted !')
            //handleLineItem()
         })
         .catch((err)=>{
             message.error(err.message)
         })
         
    }

    return(
        <div style={{marginTop:"60px"}}>
            <h3 style={{color:"slateblue"}}>MyCart</h3>
            { products.map((ele,index)=>{
               return  lineItems.map((item)=>{
                   if(item.product==ele._id){
                       return (<div>
                                <h5>{ele.name} - <Button outline color="warning" 
                                style={{marginLeft:"10px",fontSize:"5px"}}
                                onClick={()=>{handleMinus(index)}}
                                >-</Button> 
                                
                                {Qty[index]} 

                                <Button outline color="success" 
                                style={{marginLeft:"10px",fontSize:"5px"}}
                                onClick={()=>{handleAdd(index)}}
                                >+</Button> 

                                <Button outline color="danger" 
                                style={{marginLeft:"10px",fontSize:"5px"}}
                                onClick={()=>{handleRemove(item.product)}}
                                >*</Button></h5>
                              </div>
                          )
                    }
                })
            })
            
            }
            <Button color="success" onClick={handleGenerate}>Generate Bill</Button>
        </div>
    )
}
export default Cart