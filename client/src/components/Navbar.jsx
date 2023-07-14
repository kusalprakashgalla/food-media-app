import React,{useContext} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import { UserContext } from '../App';
import Signin from './pages/Signin';
const Navbar = () => {
    const navigate = useNavigate()
    const {state,dispatch} = useContext(UserContext)
    const reload=()=>{
        localStorage.clear();
        navigate('/')
        window.location.reload()
    }
    const Reload=()=>{
        window.location.reload()
    }
    const renderList1=()=>{
        if(state){
            return[
                <Link to="/" className="brand-logo" >mYeat</Link>
            ]
        }
        else{
            return[
                <Link to="/home" className="brand-logo">mYeat</Link>
            ]
        }
    }
    const renderList2=()=>{
        if(state){
            return[
                <li onClick={reload}><Link to="/signin" >Sign Out</Link></li>,
                <li><Link to="/profile"><i class="large material-icons">account_circle</i></Link></li>
            ]
        }
        else if(localStorage){
            return[
            <li onClick={reload}><Link to="/signin" >Sign Out</Link></li>,
            <li><Link to="/profile"><i class="large material-icons">account_circle</i></Link></li>
        ]
        }
        else{
            return[
                <li><Link to="/signin" >Sign In</Link></li>,
            ]
        }

    }
    return (
        <nav>
            <div className="nav-wrapper">
                {renderList1()}
                
                <ul id="nav-mobile" className="right">
                    {renderList2()}
                    
                </ul>
            </div>
        </nav>
    );
}
export default Navbar;