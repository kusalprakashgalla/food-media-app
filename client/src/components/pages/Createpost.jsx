import React,{useState,useEffect} from "react";
import M from 'materialize-css';
import {useNavigate,Link} from 'react-router-dom'


function Createpost (){

    const navigate = useNavigate();
    const [title,setTitle] = useState("");
    const [body,setBody] = useState("");
    const [photo,setPhoto] = useState("");
    const [url,setUrl] = useState("");
    useEffect(() =>{
        if(url){
            fetch("/createpost",{
                method:"post",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " +localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title,
                    body,
                    photo:url
                })
    
                }).then(res=>res.json())
                .then(data=>{
                    console.log(data)
                    if (data.error){
                        M.toast({html: data.error,classes:"#e53935 red darken-1"})
                    }
                    else{
                        
                        M.toast({html: "post created",classes:"#388e3c green darken-2"})
                    }
                }).catch(err=>{
                    console.log(err)
            }) 
        }
    },[url])

    const Postdetails =()=>{
        const  data = new FormData()
        data.append("file",photo)
        data.append("upload_preset","mYeat")
        data.append("cloud_name","dvlrcvfeu")
        // https://res.cloudinary.com/dvlrcvfeu/image/upload/v1673237340/sr537jtdhqhprjnq1xgn.jpg
        fetch("https://api.cloudinary.com/v1_1/dvlrcvfeu/image/upload",{
            method: "post",
            body: data

        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{console.log(err)})
       
        
    }

    return(
            <div className="card post">
                <h3 style={{textAlign:"center"}}>Create-Post</h3>
                <div style={{display:"flex"}}>
                    <h5>Title:</h5>
                    <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/> 
                </div>
                <div style={{display:"flex"}}>
                <h5>body:</h5> 
                <input type="text" value={body} onChange={(e)=>setBody(e.target.value)}/> 
                </div>
                <form action="#">
                    <div class="file-field input-field">
                        <div class="btn" style={{backgroundColor:"#2568FB",color:"black",fontWeight:"bold"}}>
                            <span>File</span>
                            <input type="file" onChange={(e)=>setPhoto(e.target.files[0])}/>
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" type="text"/>
                        </div>
                    </div>
                </form>
                <button class="btn waves-effect waves-light" type="submit" name="action" onClick={()=>Postdetails()}>Submit</button>
            </div>     
    );
}

export default Createpost;