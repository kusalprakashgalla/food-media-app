import React,{useState,useEffect} from "react";
import {Link,useNavigate} from "react-router-dom"
import Postcard from "./Postcard";
function Profile (props){;
    const navigate = useNavigate();
    const [data,setData] = useState([]);
    const [name,setName] = useState("");
    const [profilename,setProfileName] = useState("");
    useEffect(()=>{

        if(localStorage != null){
            fetch('/myfeed',{
                headers: {
                    "Authorization": "Bearer " +localStorage.getItem("jwt")
                }
    
            }).then(res=>res.json())
            .then(result=>{
                if (result.post.length > 0) {
                    console.log(result.post[0].postedBy.name);
                    setName(result.post[0].postedBy.name);
                    setData(result.post);
               }
            })
            .catch(err=>{
                console.log(err)
                navigate('/')
            })
            // setProfileName(localStorage.getItem()
        }
        else{
            navigate('/')
        }


        
    },[])


    
    
    
    
    const src = 'https://www.payal.co.uk/wp-content/uploads/image_carousel_thumbs/Dummy-profile-picture-nx3mkaougs1i6vxuvb4p5i72go7eap7qkoqrv1pd8k.png' 
    return(


        
        <div className="Profile" style={{maxWidth:"100%",margin:"0px 100px"}}>
            <div style={{display: "flex",justifyContent: "center",margin: "20px",borderBottom:"4px solid #FECD45",boxShadow:"0px 3px #2568FB"}}>
                <div style={{marginRight:"50px"}}>
                    <img style={{width:"150px",height:"140px",borderRadius:"50%",border:"3px solid #FECD45"}} src={src}/>
                </div>
                
                <div>
                    <h5 style={{color:"#2568FB"}} >{name}</h5>
                    <div style={{display: "flex",justifyContent: "space-between",width:"118%",margin: "20px 0px"}}>
                        <h6>80 Yeats</h6>
                        <h6>200 fans</h6>
                        <h6>100 following</h6>
                    </div>
                    <div  style={{width:"270px",overflowWrap: "break-word",margin:"20px 0px"}}>
                    <p>
                        Discription.......asddddddddddddddddddddddddddddddddddddd
                    </p> 
                    <Link>sitename.com</Link>           
                    </div>
                </div>
                <div style={{marginTop:"22px"}}>
                    <button class="btn waves-effect waves-light follow" type="submit" name="action" style={{backgroundColor:"#FECD45",color:"2568FB"}}>Follow</button>
                </div>
            </div>
            <div className="gallary" style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}>
            {
                 data && data.map(e=>{
                    return( 
                    <Postcard key={e._id} username={e.postedBy.name} image={e.photo} title ={e.title} body={e.body}/>  
                    )
                    })
               }
            </div>
        </div>       
    );
}

export default Profile;