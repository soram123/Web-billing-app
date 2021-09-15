import {Navbar , Nav , NavItem, NavLink} from 'reactstrap'
import { Link } from 'react-router-dom'
import style from './style.module.css'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const InNavBar = ()=>{
       
        const loggedIn = useSelector((state)=>{
          return state.loggedIn
        })
        
       // console.log("from navv",loggedIn)
  

    return (<div>
        <Navbar color="dark" >
        <Nav  >
          <NavItem>
          <NavLink ><Link className={style.navigation} style={{textDecoration:"none"}} to="/Home">Home</Link></NavLink>
          </NavItem>
         <NavItem>
         <NavLink ><Link className={style.navigation} style={{textDecoration:"none"}} to="/Register">Register</Link></NavLink>
         </NavItem>
         {loggedIn ? <NavItem>
          <NavLink ><Link className={style.navigation} style={{textDecoration:"none"}} to="/Dashboard">Dashboard</Link></NavLink>
          </NavItem> : 
          <NavItem>
          <NavLink ><Link className={style.navigation} style={{textDecoration:"none"}} to="/Login">Login</Link></NavLink>
          </NavItem>
          }
          
         </Nav>
       </Navbar>
    </div>)
}
export default InNavBar