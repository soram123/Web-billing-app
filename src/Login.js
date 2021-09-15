import { useState } from 'react'
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import {message} from 'antd'
import 'antd/dist/antd.css'
import {Container, Button, Form} from 'reactstrap'
import { Link, Route } from 'react-router-dom'
import style from './style.module.css'
import Register from './Register'
import * as Yup from 'yup'
import axios from 'axios'
import { useFormik } from 'formik'
import Dashboard from './Dashboard'
import {useDispatch } from 'react-redux'
import { ToggleLoggedIn } from './Actions/loggedInAction'

const Login = (props)=>{
  const [LoggedIn, setLoggedIn] = useState(localStorage.getItem('LoggedIn'))
  const dispatch = useDispatch()
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("email required!")
            .email("Email is not valid! Enter correct one!"),
    password: Yup.string().required("password required!")
              .min(8,"atleast 8 charaters required!")
              .max(15,"limited till 15 characters!")
  })
  //console.log(localStorage.getItem('LoggedIn'))
  //console.log(LoggedIn)
  const initialValues = {
    email:'',
    password:''
  }

  const onSubmit = values=>{
      //console.log('form data', values)
      //console.log('email', formik.values.email)
       const formData = {
         email: formik.values.email,
         password: formik.values.password
       }
      axios.post(' http://dct-billing-app.herokuapp.com/api/users/login',formData)
       .then((response)=>{
         const result = response.data
         //console.log(result)
         if(result.errors){
           message.error('Login not successful ! ')
             }
         else {
          localStorage.setItem('token',result.token)
          message.success("successfully login !");
          handleLoggedIn()
          localStorage.setItem('LoggedIn', true)
         }
        
        
       })
       .catch((err)=>{
         alert(err.message)
       })
       
       formik.handleReset() 
      
    }
  

    const formik = useFormik({
     initialValues,
     onSubmit,
     validationSchema
    })

   // console.log('form values', formik.values)
    //console.log('form errors', formik.errors)
   
    const handleLoggedIn = ()=>{
     
     setLoggedIn(!LoggedIn)
     
     let loggedIn = !LoggedIn
      dispatch(ToggleLoggedIn(loggedIn))
     if(loggedIn==false){
      localStorage.removeItem('LoggedIn')
      message.success("successfully logged out !")
     }
    }
    
    
    return (
      <div >
          
        { LoggedIn ? <Dashboard handleLoggedIn={handleLoggedIn} /> : (<div>
                        <Container className={style.themed}  >
                        <h1  id={style.billing}> Billing - WebApp</h1>
                       <h2  id={style.login}>Login</h2>
        
                       <form  onSubmit={formik.handleSubmit}> 
                        <label><UserOutlined /> </label>
                        <input type="text" value={formik.values.email} 
                                name="email" 
                               className={style.form} 
                               placeholder="email" 
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               />
                          {formik.touched.email && formik.errors.email ? 
                          <div className={style.errors}>{formik.errors.email}</div> : null}
                          <br/><br/>
                        <label><LockOutlined /> </label>
                        <input type="text" value={formik.values.password} 
                                name="password" 
                               className={style.form} 
                               placeholder="password" 
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               />
                          {formik.touched.password && formik.errors.password ? 
                          <div className={style.errors}>{formik.errors.password}</div> : null}<br/><br/>
              
                        <Button  type="submit" color="info"  
                                 className={style.button} value="Login" >Login</Button> 
                        <Button  color="warning" className={style.button} 
                                onClick={()=>{props.history.push('/Register')}}>SignUp </Button>
                      </form>
                      </Container>
                  </div>)    
        } 
       
        
        </div>
     
      
    )
  }

export default Login