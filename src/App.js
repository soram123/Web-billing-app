import {Navbar , Nav , NavItem, NavLink} from 'reactstrap'
import { Link, Route } from 'react-router-dom'
import style from './style.module.css'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import Customers from './Customers'
import Products from './Products'
import Bills from './Bills'
import ShowBills from './ShowBills'
import Account from './Account'
import Dashboard from './Dashboard'
import InNavBar from './InNavBar'


function App() {
  
  return (<div>
      <InNavBar />
      
    <Route path="/Home" render={(props)=>{
      return <Home {...props} />
    }}/>
    <Route path="/Register" render={(props)=>{
      return <Register {...props}/>
    }}/>
    <Route path="/Login" render={(props)=>{
      return <Login {...props}/>
    }}/>
    
    <Route path="/Customers" render={(props)=>{
      return <Customers {...props}/>
    }}/>
    <Route path="/Products" render={(props)=>{
      return <Products {...props}/>
    }}/>
    <Route path="/Bills" render={(props)=>{
      return <Bills {...props}/>
    }}/>
    <Route path="/ShowBills" render={(props)=>{
      return <ShowBills {...props}/>
    }}/>
     <Route path="/Account" render={(props)=>{
      return <Account {...props}/>
    }}/>
    <Route path="/Dashboard" render={(props)=>{
      return <Dashboard {...props}/>
    }}/>
  </div>)
}

export default App;
