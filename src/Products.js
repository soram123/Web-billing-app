import * as Yup from 'yup'
import { useFormik } from 'formik'
import {UserOutlined, CameraOutlined , EditOutlined, DeleteOutlined, DollarOutlined} from '@ant-design/icons'
import { Row, Col,Button, Table} from 'reactstrap'
import {  useDispatch } from 'react-redux'
import style from './style.module.css'
import axios from 'axios'
import ReactPaginate from "react-paginate"
import { message, Modal } from 'antd'
import { AddProduct, EditProduct, RemoveProduct } from './Actions/productAction'
import { useEffect, useState } from 'react'
import ProEditForm from './ProEditForm'

const Products = ()=>{
    const dispatch = useDispatch()
    const [modal, setModal] = useState(false)
    const [EditToggle, setEditToggle] = useState(false)
    const [editId, setEditId] = useState()
    const toggle = () => setModal(!modal)
    const [proToggle, setProToggle] = useState(false)
    const [products, setProducts] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [read, setRead] = useState([])
    const [pageNumber, setPageNumber] = useState(0)

    const productsPerPage = 5
    const pagesVisited = pageNumber * productsPerPage

    const pageCount = Math.ceil(products.length / productsPerPage)

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
        axios.get('http://dct-billing-app.herokuapp.com/api/products',headers)
         .then((response)=>{
             const result = response.data 
             console.log(result)
             setProducts(result)
         })
         .catch((err)=>{
             message.error(err.message)
         })
    },[proToggle])

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
        console.log('product ', values)
        const productData = {
            name: formik.values.name,
            price: formik.values.price
        }
        axios.post('http://dct-billing-app.herokuapp.com/api/products',productData,headers)
         .then((response)=>{
             const result = response.data
             console.log(result)
             dispatch(AddProduct(result))
             setProToggle(!proToggle)
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
        axios.get(`http://dct-billing-app.herokuapp.com/api/products/${id}`,headers)
        .then((response)=>{
            const result = response.data 
            setIsModalVisible(true)
            setRead(result)
          
        })
        .catch((err)=>{
            message.error("not able to fetch data !")
        })
    }

    const handleDelete = (id)=>{
        axios.delete(`http://dct-billing-app.herokuapp.com/api/products/${id}`,headers)
         .then((response)=>{
             const result = response.data 
             console.log(result)
             dispatch(RemoveProduct(id))
             setProToggle(!proToggle)
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
   
      
    const proData = (proInfo)=>{
        dispatch(EditProduct(proInfo))
        setProToggle(!proToggle)
    }

    return (
        <div>

              <Row style={{marginLeft:"20px",marginTop:"30px"}}>
                    <Col sm="9" >
                        <Table striped >
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>View</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                { products.slice(pagesVisited, pagesVisited + productsPerPage).map((ele)=>{
                                    return (<tr index={ele._id}>
                                               <td>{ele.name}</td>
                                               <td>{ele.price}</td>
                                               <td><CameraOutlined  onClick={()=>{
                                                   handleRead(ele._id)}}/>
                                                   <Modal title="Product's Details " visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                                    <p> Product Name : {read.name}</p>
                                                    <p> Price : {read.price} </p>
                                                    </Modal></td>
                                                   
                                               <td>{editId==ele._id ? 
                                                     <ProEditForm  proData={proData} 
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
                        Add Products</h2>
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
                    previousLinkClassName={style.previousBttn}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={style.paginationActive}
                />
           
            
        </div>
    )
}
export default Products