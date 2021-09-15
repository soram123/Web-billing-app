import { message } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import { Row, Col,Button, Table, Container} from 'reactstrap'
import ReactPaginate from "react-paginate"
import { CameraOutlined ,  DeleteOutlined, FilePdfOutlined,ArrowLeftOutlined  } from '@ant-design/icons'
import { Modal } from "antd"
import moment from "moment"
import jsPDF from "jspdf"
import { Link } from "react-router-dom"
import style from "./style.module.css"

const ShowBills = ()=>{
    const [bills, setBills] = useState([])
    const [customers, setCustomers] = useState([])
    const [products, setProducts] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [detail, setDetail] = useState([])
    const [pageNumber, setPageNumber] = useState(0)

    const usersPerPage = 5
    const pagesVisited = pageNumber * usersPerPage

    const pageCount = Math.ceil(bills.length / usersPerPage)

    const changePage = ({ selected }) => {
        setPageNumber(selected);
      }

  const headers = {
        headers : {
            'Authorization' : "Bearer "+localStorage.getItem('token')
        }
    }
    useEffect(()=>{
        axios.get('http://dct-billing-app.herokuapp.com/api/bills',headers)
        .then((response)=>{
            const result = response.data 
            setBills(result)
        })
        .catch((err)=>{
            message.error(err.message)
        })
    },[refresh])

    useEffect(()=>{
        axios.get('http://dct-billing-app.herokuapp.com/api/customers',headers)
         .then((response)=>{
             const result = response.data 
             setCustomers(result)
         })
         .catch((err)=>{
             message.error(err.message)
         })
    },[])

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
    },[])
    
    
    
      const handleOk = () => {
        setIsModalVisible(false);
      }
    
      const handleCancel = () => {
        setIsModalVisible(false);
      }

    const handleView = (id)=>{
        axios.get(`http://dct-billing-app.herokuapp.com/api/bills/${id}`,headers)
         .then((response)=>{
             const result = response.data 
             //console.log(result)
             setDetail(result)
                setIsModalVisible(true);
              
                         
         })
         .catch((err)=>{
             message.error(err.message)
         })
        
    }

    const handlePdf = (id)=>{
        let inc = 80
        axios.get(`http://dct-billing-app.herokuapp.com/api/bills/${id}`,headers)
        .then((response)=>{
            const result = response.data 
            const doc = jsPDF('landscape','px','a4','false')
            customers.map((cust)=>{
                if(cust._id==result.customer){
                    doc.text(60,60,` Name  : ${cust.name}`)
                }
            })
            
            doc.text(60,80,` Date  : ${moment(result.date).format('l')}`)
            doc.line(60, inc=inc+20, 250, inc)
            products.map((prod)=>{
                
                result.lineItems.map((item)=>{
                    if(prod._id==item.product){
                        doc.text(60,inc=inc+20,` Product : ${prod.name}`)
                        doc.text(60,inc=inc+20,` price : ${item.price}`)
                        doc.text(60,inc=inc+20,` quantity : ${item.quantity}`)
                        doc.text(60,inc=inc+20,` subTotal : ${item.subTotal}`)
                        doc.line(60, inc=inc+20, 250, inc)
                      }
                
                })
            })
            doc.text(60,inc=inc+20,` Total : ${result.total}`)
            doc.save("doc.pdf")
        })
        .catch((err)=>{
            message.error(err.message)
        })
        
        
    }

    
    const handleDelete = (id)=>{
        axios.delete(`http://dct-billing-app.herokuapp.com/api/bills/${id}`,headers)
        .then((response)=>{
            const result = response.data 
            console.log(result)
            setRefresh(!refresh)
        })
        .catch((err)=>{
            message.error(err.message)
        })
    }

    return (
        <div>
            
            <Container>
                <h2 style={{color:"forestgreen",textAlign:"center",marginBottom:"30px"}}> Show Bills </h2>
            <Row>
                    <Col>
                        <Table>
                            <thead>
                                <tr>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>View</th>
                                <th>Pdf Download</th>
                                <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bills.slice(pagesVisited, pagesVisited + usersPerPage).map((bill)=>{
                                        return (<tr>
                                            {customers.map((c)=>{
                                                if(c._id==bill.customer){
                                                    return <td>{c.name}</td>
                                                }
                                            })}
                                            <td>{moment(bill.date).format('l')}</td>
                                            <td>{bill.total}</td>
                                            <td><CameraOutlined onClick={()=>{
                                                handleView(bill._id)}}/>
                                                <Modal title="Details " visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                                {customers.map((cust)=>{
                                                    if(cust._id==detail.customer){
                                                     return   <p> Name : {cust.name}</p>
                                                    }
                                                })}
                                                <p> Date : {moment(detail.date).format('l')}</p>
                                                <p> Total : {detail.total} </p>
                                                
                                              </Modal></td>
                                            <td><FilePdfOutlined onClick={()=>{
                                                handlePdf(bill._id)
                                              }} /></td>
                                            <td><DeleteOutlined onClick={()=>{
                                                handleDelete(bill._id)}}/></td>
                                            
                                        </tr>)
                                    })
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                
            </Container><br/><br/>
            
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
export default ShowBills