import * as Yup from 'yup'
import { useFormik } from 'formik'
import {UserOutlined,DollarOutlined,MailOutlined } from '@ant-design/icons'
import { Button } from 'reactstrap'
import axios from 'axios'
import { message } from 'antd'
import style from './style.module.css'


const ProEditForm = (props)=>{
    
    const {proData, headers, id, editToggle} = props
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("name required !")
                .min(3,"atleast min of 3 characters required!")
                .max(15,"limited till 12 characters!"),
        price: Yup.number().required("price is required !").positive("it should be positive")
                .integer("it should be interger")
                .min(1,"atleast min of 1 required!")
                
    })

    const initialValues = {
        name:'',
        price:''
      }

      const onSubmit = values=>{
        console.log('updated product ', values)
        const customerData = {
            name: formik.values.name,
            price: formik.values.price
        }
        axios.put(`http://dct-billing-app.herokuapp.com/api/products/${id}`,customerData,headers)
         .then((response)=>{
             const result = response.data
             console.log(result)
             proData(result)
             message.success("successfully updated !")
         })
         .catch((err)=>{
             message.error(err.message)
         })
         
         editToggle(false)
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
            <label><DollarOutlined /></label>
                <input type="text" className={style.form} 
                    name="price" 
                    placeholder="price..." 
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    /><br/><br/>
                {formik.touched.price && formik.errors.price ? 
                <div className={style.errors}>{formik.errors.price}</div> : null}
            <Button outline color="primary" type="submit" style={{marginLeft:"25px"}} >Save</Button>
            <Button outline color="danger" style={{marginLeft:"10px"}} onClick={editToggle}>Cancel</Button>
            </form>
 </div>)
}
export default ProEditForm