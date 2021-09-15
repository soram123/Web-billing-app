import { useEffect, useState } from 'react'
import {Row,Col,Container,Button} from 'reactstrap'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { Menu, Dropdown, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import moment from 'moment'
import axios from 'axios'
import Cart from './Cart';


const Bills = ()=>{
    const [date, setDate] = useState()
    const [visible, setVisible] = useState()
    const [customers, setCustomers] = useState([])
    const [products, setProducts] = useState([])
    const [proOption, setProOption] = useState([])
    const [Qty, setQty] = useState([])
    const [custToggle, setCustToggle] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [customerId, setCustomerId] = useState()
    const [lineItems, setLineItems] = useState([])

    const headers = {
        headers : {
            'Authorization' : "Bearer "+localStorage.getItem('token')
        }
    }
    useEffect(()=>{
        axios.get('http://dct-billing-app.herokuapp.com/api/customers',headers)
        .then((response)=>{
            const result = response.data
            setCustomers(result)
        })
        .catch((err)=>{
            message.error(err.message)
        })
    },[toggle])

    useEffect(()=>{
        axios.get('http://dct-billing-app.herokuapp.com/api/products',headers)
         .then((response)=>{
             const result = response.data 
             //console.log(result)
             setProducts(result)
         })
         .catch((err)=>{
             message.error(err.message)
         })
    },[])
    
    for(let x of products){
        if(Qty.length<products.length ){
            Qty.push(1)
         }
     }
     for(let p of products){
         if(proOption.length<products.length){
             proOption.push(false)
         }
     }
    //console.log("quantity",Qty)
    //console.log("proOption",proOption)
       
    const handleVisibleChange = ()=> {
        setVisible(!visible);
    }

    const menu = (
        <Menu >
            <Menu.Item key="0">
                <Calendar value={date}  onChange={setDate} />
            </Menu.Item>
        </Menu>
    )

    const handleProOption = (e)=>{
       
        for(let i of products){
            if(e.target.value==i._id){
                
              // console.log("index passed",e.target.name)
                proOption.splice(e.target.name,1,!custToggle)
                setCustToggle(!custToggle)
                setToggle(!toggle)
            }
        }
     }

    const handleIncDecClick = (e)=>{
        //console.log("index",e.target.value)
        if(e.target.name=="minus"){
            if(Qty[e.target.value]<=1){
                message.error("cannot decrement !")
            }
            else {
                const res = Qty[e.target.value]-1
                //console.log("result minus",res)
                Qty.splice(e.target.value,1,res)
                setToggle(!toggle)
                }
            
           
        }
        else if(e.target.name=="plus"){
            const res = Qty[e.target.value]+1
           // console.log("result plus",res)
            Qty.splice(e.target.value,1,res)
            setToggle(!toggle)
        }
    }

    const handleSelect = (e)=>{
        //console.log(e.target.value)
        setCustomerId(e.target.value)
    }
    
    const handleFormSubmit = (e)=>{
        e.preventDefault()
        let productData = {}
        products.map((ele,index)=>{
            if(proOption[index]==true){
                productData ={
                    "product": ele._id,
                    "quantity": Qty[index]
                }
                lineItems.push(productData)
                //console.log("lineItems", lineItems)
                setToggle(!toggle)

            }
        })
    }

    const handleRemove = (productId)=>{
        const result = lineItems.filter((item)=>{
            return item.product!==productId
        })
        setLineItems(result)
    }

    const handleAdd = (index)=>{
        //console.log("index from cart",index)
        const result = Qty[index]+1
        Qty.splice(index,1,result)
        setToggle(!toggle)
    }

    const handleMinus = (index)=>{
        if(Qty[index]<=1){
            message.error("cannot decrement !")
        }
        else{
            const result = Qty[index]-1 
            Qty.splice(index,1,result)
            setToggle(!toggle)
        }
       
    }

    const handleLineItem = ()=>{
        lineItems = []
        setLineItems(lineItems)
    }

    //console.log(Qty)
    return (
        <div>
            <h1 style={{textAlign:"center",color:"forestgreen"}}>Create Bills</h1>
            <Container>
            <Row>
                <Col sm="6">
                    <form onSubmit={handleFormSubmit}>
                        <Dropdown overlay={menu} onClick={handleVisibleChange} visible={visible}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        Select date <DownOutlined />
                        </a>
                        </Dropdown><br/><br/>
                        
                        <label>name</label>
                        <select onChange={handleSelect}>
                            <option >---select customer---</option>
                            {
                                customers.map((cust)=>{
                                    return <option key={cust._id} value={cust._id}>{cust.name}</option>
                                })
                            }
                        </select><br/><br/>
                        <label>product</label><br/><br/>
                        
                        {
                            products.map((prod,index)=>{
                               
                           return ( <div>
                                <input type="checkbox" checked={proOption[index]}
                                value={prod._id}
                                name={index}
                                style={{marginRight:"10px"}} 
                                onChange={handleProOption}/>

                                {prod.name}

                                <Button outline color="warning" 
                                style={{marginLeft:"10px",fontSize:"5px"}}
                                name="minus"
                                value={index}
                                onClick={handleIncDecClick}
                                >-</Button>

                                {Qty[index]}

                                <Button outline color="success" 
                                style={{marginLeft:"10px",fontSize:"5px"}}
                                name="plus"
                                value={index}
                                onClick={handleIncDecClick}
                                >+</Button>
                           </div>
                           )
                           })}<br/>
                        <Button color="success" type="submit">Add to cart</Button>
                    </form>
                </Col>
                
               
                <Col sm="6">
                {lineItems.length>0 && <Cart date={date} 
                                        customerId={customerId} 
                                        lineItems={lineItems}
                                        products = {products}
                                        Qty={Qty}
                                        handleRemove = {handleRemove}
                                        handleAdd = {handleAdd}
                                        handleMinus = {handleMinus}
                                        
                                        />}
                </Col>
            </Row>
            </Container>
            
        </div>
    )
}
export default Bills