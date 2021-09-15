import { Container } from "reactstrap"
import axios from "axios"
import { useEffect, useState } from "react"
import { message } from "antd"
import style from './style.module.css'
import moment from "moment"

const Account = ()=>{
    const [adminInfo, setAdminInfo] = useState({})
    const headers = {
        headers : {
            'Authorization' : "Bearer "+localStorage.getItem('token')
        }
    }
    useEffect(()=>{
        axios.get('http://dct-billing-app.herokuapp.com/api/users/account',headers)
         .then((response)=>{
             const result = response.data 
             console.log(result)
             setAdminInfo(result)
         })
         .catch((err)=>{
             message.error(err.message)
         })
    },[])
    return (<div>
        <Container className={style.themed}>
                <h2 style={{color:'forestgreen',fontSize:'60px',marginTop:'50px',marginBottom:'40px'}}>Account</h2>
                
                <h3 style={{color:'darkslateblue',fontSize:'30px',marginBottom:'20px'}}>Username : {adminInfo.username}</h3>  
                <h3 style={{color:'darkslateblue',fontSize:'30px',marginBottom:'20px'}}>Email : {adminInfo.email}</h3> 
                <h3 style={{color:'darkslateblue',fontSize:'30px',marginBottom:'20px'}}>Address : {adminInfo.address}</h3>
                <h3 style={{color:'darkslateblue',fontSize:'30px',marginBottom:'20px'}}>BusinessName : {adminInfo.businessName}</h3>
                <h3 style={{color:'darkslateblue',fontSize:'30px',marginBottom:'20px'}}>CreatedAt : {moment(adminInfo.createdAt).format('l')}</h3>
        </Container>
        </div>
        

    )
}
export default Account