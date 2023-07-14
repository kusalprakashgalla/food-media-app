import React,{useState,useContext} from "react";
import M from 'materialize-css';
import { UserContext } from "../../App";
import {useNavigate,Link} from 'react-router-dom'
function Signup (){
    const {state,dispatch} = useContext(UserContext)
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const Postdata =()=>{
        
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })

            }).then(res=>res.json())
            .then(data=>{
                console.log(data)
                if (data.error){
                    M.toast({html: data.error,classes:"#e53935 red darken-1"})
                }
                
                else{
                    M.toast({html: data.message,classes:"#388e3c green darken-2"})
                    navigate('/signin')
                   
                }
            }).catch(err=>{
                console.log(err)
        })
    }
    return(
        <div className="Sign">
            <div className="card center">
            <h3>SIGN-UP</h3>
            <input type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button class="btn waves-effect waves-light" type="submit" name="action"
            onClick={()=>Postdata()}>Sign Up
            </button>
        </div>
        </div>       
    );
}

export default Signup;