import * as Yup from 'yup'
import { useFormik } from 'formik'
import {UserOutlined,PhoneOutlined,MailOutlined } from '@ant-design/icons'
import { Button } from 'reactstrap'
import axios from 'axios'
import { message } from 'antd'
import style from './style.module.css'


const EditForm = (props)=>{
    
    const {custData, headers, id, editToggle} = props
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("name required !")
                .min(3,"atleast min of 3 characters required!")
                .max(15,"limited till 12 characters!"),
        mobile: Yup.number().required("mobile no. required !").positive("it should be positive")
                .integer("it should be interger")
                .min(1000000000,"atleast min of 10 digits required!"),
        email: Yup.string().required("email required!")
                .email("Email is not valid! Enter correct one!")
    })

    const initialValues = {
        name:'',
        mobile:'',
        email:''
      }

      const onSubmit = values=>{
        console.log('updated customer ', values)
        const customerData = {
            name: formik.values.name,
            mobile: formik.values.mobile,
            email: formik.values.email
        }
        axios.put(`http://dct-billing-app.herokuapp.com/api/customers/${id}`,customerData,headers)
         .then((response)=>{
             const result = response.data
             console.log(result)
             custData(result)
             message.success("successfully updated !")
         })
         .catch((err)=>{
             message.error(err.message)
         })
         
         editToggle()
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

 return (<div>
        <form onSubmit={formik.handleSubmit}>
            <label><UserOutlined/></label>
                <input type="text" className={style.form} 
                    name="name" 
                    placeholder="name..." 
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    /><br/><br/>
                    {formik.touched.name && formik.errors.name ?    
                    <div className={style.errors}>{formik.errors.name}</div> : null}
            <label><PhoneOutlined /></label>
                <input type="text" className={style.form} 
                    name="mobile" 
                    placeholder="ph. number..." 
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    /><br/><br/>
                {formik.touched.mobile && formik.errors.mobile ? 
                <div className={style.errors}>{formik.errors.mobile}</div> : null}
            <label><MailOutlined/></label>
                <input type="text" className={style.form} 
                    name="email" 
                    placeholder="email.." 
                    value={formik.values.emaill}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    /><br/><br/>
                    {formik.touched.email && formik.errors.email ? 
                <div className={style.errors}>{formik.errors.email}</div> : null}
            <Button outline color="primary" type="submit" style={{marginLeft:"25px"}} >Save</Button>
            <Button outline color="danger" style={{marginLeft:"10px"}} onClick={editToggle}>Cancel</Button>
            </form>
 </div>)
}
export default EditForm