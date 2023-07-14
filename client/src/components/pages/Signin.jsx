import React,{useState,useContext} from "react";
import { UserContext } from "../../App";
import M from 'materialize-css';
import {useNavigate,Link} from 'react-router-dom'
function Signin (){
    const {state,dispatch} = useContext(UserContext)
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    if (state) {
        M.toast({html: "Already logged in , click home",classes:"#388e3c green darken-2"}) 
        navigate("/home")
       };
      
    

    const Postdata =()=>{
        
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })

            }).then(res=>res.json())
            .then(data=>{
                console.log(data)
                if (data.error){
                    M.toast({html: data.error,classes:"#e53935 red darken-1"})
                }
                else if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
                    return M.toast({html: "invalid email",classes:"#e53935 red darken-1"})
                }
                else{
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(data.user))
                    dispatch({type:"USER", payload:data.user})
                    M.toast({html: "Succesful login",classes:"#388e3c green darken-2"})
                    navigate("/home")
                }
            }).catch(err=>{
                console.log(err)
        })
    }



    return(
        <div className="Sign">
        <div className="card center">
            <h3>LOG-IN</h3>
            <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button class="btn waves-effect waves-light" type="submit" name="action" onClick={()=>Postdata()}>Submit</button>
        </div >
        <h5 style={{textAlign:"center"}}>Not a user? <Link to="/signup">Sign Up</Link></h5>
        </div>       
    );
}

export default Signin;