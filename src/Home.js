import {Container, Row, Col} from 'reactstrap'
import billing from './billing.jpg'
import style from './style.module.css'

const Home = (props)=>{
    return (
        <div>
            
            <Container>
            <h1  id={style.billing} className={style.themed}> Billing - WebApp</h1>
                <Row style={{marginTop:"30px"}}>
                    <Col sm="7">
                        <img src={billing} className={style.billing} />
                    </Col>
                    <Col sm="5" >
                       <h1 style={{color:"forestgreen",fontStyle:"italic",marginTop:"90px"}}>This project is about creating bills !</h1>
                       <p style={{marginTop:"30px",color:"slateblue"}}>User can create account by registering first and login in with the email and password.
                           After creation of the account and logging in he/she can add customers, products, price, quantity.
                           Now he/she can create the bills based on the information provided. The bills can be downloaded 
                           as pdf.</p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Home