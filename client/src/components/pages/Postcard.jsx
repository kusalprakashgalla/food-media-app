import React,{useState,useEffect} from "react";
import Comments from "./Comments";
function Postcard (props){

    return(
        <div class="card pic">
            <h6 style={{marginLeft:"10px"}}>{props.username}</h6>
            <div class="card-image" style={{marginLeft:"10px",marginRight:"10px"}}>
                <img src={props.image}/> 
            </div>
            
            <div class="card-content" style={{textAlign:"left"}}>
                <span class="card-title" style={{color:"#2568FB"}}>{props.title}</span>
                <p>{props.body}
                </p>
                
            </div>
            <div style={{display:"flex",flexDirection:"space-between",margin:"10px 20px"}}>
                <i class="material-icons" style={{fontSize:"1.5rem",marginTop:"9px",marginRight:"4px",color:"#FECD45"}}>favorite_border</i>
                <h6 >{props.likes}Likes</h6>
            </div>
            <div class="card-action">
                <Comments />
            </div>
        </div>    
    );
}

export default Postcard;