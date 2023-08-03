import React,{useState,useEffect} from "react";
import Createpost from "./Createpost";
import Comments from "./Comments";
import Postcard from "./Postcard";
function Home (){

    const [data,setData] = useState([]);
    
    useEffect(()=>{
        fetch('/allpost',{
            headers: {
                "Authorization": "Bearer " +localStorage.getItem("jwt")
            }

        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setData(result.post)
        })
    },[])
    return(
        <div className="Home">
            <Createpost />
            <div className="Postcard">
            {
                 data && data.reverse().map(e=>{
                    return( 
                    <Postcard key={e._id} username={e.postedBy.name} image={e.photo} title ={e.title} body={e.body}/>  
                    )
                    })
               }      
            </div>
        </div>       
    );
}

export default Home;