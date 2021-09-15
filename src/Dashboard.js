import React, { useEffect } from 'react';
import { Button, message } from 'antd';
import bill from './bill.png'
import style from './style.module.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Chart from "react-google-charts"
import axios from 'axios';
import { Row, Col } from 'reactstrap'
import { Card } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  FileTextOutlined,
  ToolOutlined ,
  FormOutlined 
} from '@ant-design/icons';



const Dashboard = (props)=>{
  const {handleLoggedIn } = props
    const [ collapsed, setCollapsed] = useState(false)
    const [customers, setCustomers] = useState([])
    const [products, setProducts] = useState([])
    const [bills, setBills] = useState([])
    const { Header, Sider, Content } = Layout;
    
    
    const toggle = () => {
        setCollapsed(!collapsed)
        }

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
    },[])

    useEffect(()=>{
      axios.get('http://dct-billing-app.herokuapp.com/api/products',headers)
       .then((response)=>{
          const result = response.data 
          setProducts(result)
       })
       .catch((err)=>{
         message.error(err.message)
       })
    },[])

    useEffect(()=>{
      axios.get('http://dct-billing-app.herokuapp.com/api/bills',headers)
       .then((response)=>{
          const result = response.data 
          setBills(result)
       })
       .catch((err)=>{
         message.error(err.message)
       })
    },[])
      
    return (
        <div>
            
            <Layout style={{ minHeight: '100vh' , minWidth: '90vw'}} className={style.layout}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
           
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']} >
              <Menu.Item key="0" icon={<img src={bill} className={style.logo} />}>
                Dashboard
              </Menu.Item>
              <Menu.Item key="1" icon={<FormOutlined />}>
                <Link to="/Account" >Account</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<UserOutlined />}>
                <Link to="/Customers" >Customers</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<VideoCameraOutlined />}>
                <Link to="/Products">Products</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<ToolOutlined />}>
                <Link to="/Bills" >Create Bills</Link>
              </Menu.Item>
              <Menu.Item key="5" icon={<FileTextOutlined />}>
               <Link to="/ShowBills" >Show Bills</Link>
              </Menu.Item>
              <Menu.Item key="6" icon={<UploadOutlined />}>
                <Link  onClick={handleLoggedIn} to="/Login" >Logout</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          
         
          <Layout className={style.site_layout} >
            <Header className={style.site_layout_background} style={{ padding: 0 }}>
              <Button className={style.trigger} onClick={toggle} >
                  {collapsed ? <MenuUnfoldOutlined />: <MenuFoldOutlined/>}</Button>
              <h2 style={{color:'forestgreen',textAlign:'center'}}>Welcome to dashboard</h2>
            </Header>
            <Content
              className={style.site_layout_background}
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
              }}
            >
              <Row>
                <Col sm="4">
                <Card title="Customers"  style={{ width: 300 }}>
                  <p>{customers.length}</p>
                </Card>
                </Col>
                <Col sm="4">
                <Card title="Products"  style={{ width: 300 }}>
                  <p>{products.length}</p>
                </Card>
                </Col>
                <Col sm="4">
                <Card title="Bills"  style={{ width: 300 }}>
                  <p>{bills.length}</p>
                </Card>
                </Col>
              </Row>
              <br/><br/>
              <Chart  
                      width={'500px'}
                      height={'300px'}
                      chartType="PieChart"
                      loader={<div>Loading Chart</div>}
                      data={[
                        ['Numbers', 'Quantity '],
                        ['Customers', customers.length],
                        ['Products', products.length],
                        ['Bills', bills.length]
                        
                      ]}
                      options={{
                        title: 'App Details',
                      }}
                      rootProps={{ 'data-testid': '1' }}
                    />
            </Content>
            </Layout>
          </Layout>

                    
        </div>
    )
}
export default Dashboard