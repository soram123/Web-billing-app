import {Container, Button} from 'reactstrap'
import { Link } from 'react-router-dom'
import { UserOutlined,MailOutlined, LockOutlined, RobotFilled, HomeOutlined, ArrowLeftOutlined} from '@ant-design/icons'
import { message } from 'antd'
import 'antd/dist/antd.css'
import style from './style.module.css'
import * as Yup from 'yup'
import {  useFormik } from 'formik'
import axios from 'axios'

const Register = ()=>{

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("name required!")
              .min(3,"atleast min of 3 characters required!")
              .max(12,"limited till 12 characters!"),
        email: Yup.string().required("email required!")
                .email("Email is not valid! Enter correct one!"),
        password: Yup.string().required("password required!")
                  .min(8,"atleast 8 charaters required!")
                  .max(15,"limited till 15 characters!"),
        businessName: Yup.string().required("business name required!")
                    .min(4,"atleast min of 4 characters required!")
                    .max(15,"limited till 15 characters!"),
        address: Yup.string().required("address required!")
                .min(8,"atleast min of 8 characters required!")
                .max(50,"limited till 50 characters!")
      })
    
      const initialValues = {
        username:'',
        email:'',
        password:'',
        businessName:'',
        address:''
      }

      const onSubmit = values=>{
        console.log('register data', values)
        const formData = {
               username: formik.values.username,
               email: formik.values.email,
               password: formik.values.password,
               businessName: formik.values.businessName,
               address: formik.values.address
        }
        axios.post(' http://dct-billing-app.herokuapp.com/api/users/register',formData)
         .then((response)=>{
                const result = response.data 
                console.log(result)
                if(result.errors){
                     message.error("register again properly !")
                     
                 }
                else {
                     message.success("successfully registered !")
                     formik.handleReset()
                }
                
         })
         .catch((err)=>{
                message.error(err.message)
         })
      }

      const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
       })
      //console.log('form values', formik.values)
    return(
        <div>
            <Container className={style.themed} >
            <h1  id={style.billing}> Billing - WebApp</h1>
            <h2 id={style.login}>Register</h2>

            <form onSubmit={formik.handleSubmit}>
                <label  ><UserOutlined /></label>
                <input type="text" className={style.form} 
                       placeholder="name..."
                       name="username" 
                       value={formik.values.username}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}                
                       />
                {formik.touched.username && formik.errors.username ? <div className={style.errors}>{formik.errors.username}</div> : null}
                       <br/><br/>

                <label><MailOutlined /></label>
                <input type="text" className={style.form} 
                       placeholder="email..." 
                       name="email"
                       value={formik.values.email}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}/>
                {formik.touched.email && formik.errors.email ? <div className={style.errors}>{formik.errors.email}</div> : null}
                       <br/><br/>

                <label><LockOutlined /></label>
                <input type="text" className={style.form} 
                        placeholder="password..."
                        name="password"
                        value={formik.values.password} 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}/>
                {formik.touched.password && formik.errors.password ? 
                     <div className={style.errors}>{formik.errors.password}</div> : null}
                        <br/><br/>

                <label><RobotFilled /></label>
                <input type="text" className={style.form} 
                       placeholder="businessName..."
                       name="businessName"
                       value={formik.values.businessName} 
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}/>
                {formik.touched.businessName && formik.errors.businessName ? 
                     <div className={style.errors}>{formik.errors.businessName}</div> : null}
                       <br/><br/>
                
                <HomeOutlined />
                <textarea  className={style.form} 
                            placeholder="address..." 
                            name="address"  
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            cols="24"/>
                {formik.touched.address && formik.errors.address ? 
                     <div className={style.errors}>{formik.errors.address}</div> : null}
                            <br/><br/>
                <Button color="success" type="submit" value="Register" >Submit</Button>
               </form>
            </Container><br/><br/>
            
            <Link style={{color:"darksteelblue",marginLeft:"20px"}} to="/Login"><ArrowLeftOutlined />  Back to Login </Link><br/><br/>
        </div>
    )
}

export default Register