import * as Yup from 'yup'
import { useFormik } from 'formik'
import {UserOutlined,PhoneOutlined,MailOutlined, CameraOutlined , EditOutlined, DeleteOutlined  } from '@ant-design/icons'
import {Container, Row, Col,Button, Table} from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import style from './style.module.css'
import axios from 'axios'
import { message, Modal } from 'antd'
import ReactPaginate from "react-paginate"
import { AddCustomer, EditCustomer, RemoveCustomer } from './Actions/customerAction'
import { useEffect, useState } from 'react'
import EditForm from './EditForm'


const Customers = ()=>{
    const dispatch = useDispatch()
    const [modal, setModal] = useState(false)
    const [EditToggle, setEditToggle] = useState(false)
    const toggle = () => setModal(!modal)
    const [custToggle, setCustToggle] = useState(false)
    const [customers, setCustomers] = useState([])
    const [editId, setEditId] = useState()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [read, setRead] = useState([])
    const [pageNumber, setPageNumber] = useState(0)

    const customersPerPage = 5
    const pagesVisited = pageNumber * customersPerPage

    const pageCount = Math.ceil(customers.length / customersPerPage)

    const changePage = ({ selected }) => {
        setPageNumber(selected);
      }

    const headers = {
        headers : {
            'Authorization' : "Bearer "+localStorage.getItem('token')
        }
    }

    const handleOk = () => {
        setIsModalVisible(false);
      }
    
      const handleCancel = () => {
        setIsModalVisible(false);
      }

    useEffect(()=>{
        axios.get('http://dct-billing-app.herokuapp.com/api/customers',headers)
         .then((response)=>{
             const result = response.data 
             console.log(result)
             setCustomers(result)
         })
         .catch((err)=>{
             message.error(err.message)
         })
    },[custToggle])

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
        console.log('customer ', values)
        const customerData = {
            name: formik.values.name,
            mobile: formik.values.mobile,
            email: formik.values.email
        }
        axios.post('http://dct-billing-app.herokuapp.com/api/customers',customerData,headers)
         .then((response)=>{
             const result = response.data
             console.log(result)
             dispatch(AddCustomer(result))
             setCustToggle(!custToggle)
             message.success("successfully added !")
         })
         .catch((err)=>{
             message.error(err.message)
         })
         formik.handleReset()
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    const handleRead = (id)=>{
        axios.get(`http://dct-billing-app.herokuapp.com/api/customers/${id}`,headers)
        .then((response)=>{
            const result = response.data 
           setRead(result)
          setIsModalVisible(true);
        })
        
        .catch((err)=>{
            message.error("not able to fetch data !")
        })
    }

    const handleDelete = (id)=>{
        axios.delete(`http://dct-billing-app.herokuapp.com/api/customers/${id}`,headers)
         .then((response)=>{
             const result = response.data 
             console.log(result)
             dispatch(RemoveCustomer(id))
             setCustToggle(!custToggle)
             message.success("successfully deleted !")
         })
         .catch((err)=>{
            message.error("not able to fetch data !")
        })
    }
    const editToggle = (id)=>{
        if(id){
            setEditId(id)
           // setProToggle(!proToggle)
        }
        else{
            setEditId(false)
        }
    }
   
      
    const custData = (custInfo)=>{
        dispatch(EditCustomer(custInfo))
        setCustToggle(!custToggle)
    }

    return (
        <div>

              <Row style={{marginLeft:"20px",marginTop:"30px"}}>
                    <Col sm="9" >
                        <Table striped >
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Mobile</th>
                                    <th>Email</th>
                                    <th>View</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                { customers.slice(pagesVisited, pagesVisited + customersPerPage).map((ele)=>{
                                    return (<tr index={ele._id}>
                                               <td>{ele.name}</td>
                                               <td>{ele.mobile}</td>
                                               <td>{ele.email}</td>
                                               <td><CameraOutlined  onClick={()=>{
                                                   handleRead(ele._id)}}/>
                                                   <Modal title="Customer's Details " visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                                        <p> Name : {read.name}</p>
                                                        <p> Mobile : {read.mobile}</p>
                                                        <p> Email : {read.email} </p>
                                                
                                                    </Modal></td>
                                                
                                               <td>{editId==ele._id ? 
                                                     <EditForm  custData={custData} 
                                                     headers={headers} id={ele._id} 
                                                     editToggle={editToggle}/>
                                                     :
                                                   <EditOutlined onClick={()=>{
                                                    editToggle(ele._id)}}/>}</td>
                                               <td><DeleteOutlined onClick={()=>{
                                                   handleDelete(ele._id)}}/></td>
                                        </tr>
                                            )
                                })}
                            </tbody>

                        </Table>
                    </Col>
                    <Col sm="3" >
                    <h2 style={{fontSize:"35px",color:"darkslateblue",marginBottom:"20px"}}>
                        Add Customers</h2>
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
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                /><br/><br/>
                                {formik.touched.email && formik.errors.email ? 
                         <div className={style.errors}>{formik.errors.email}</div> : null}
                        <Button outline color="primary" type="submit" style={{marginLeft:"25px"}} >Add</Button>
                    </form>
                    </Col>
                </Row>
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={style.paginationBttns}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={style.paginationActive}
                />
           
            
        </div>
    )
}
export default Customers