import React from "react";
import Signin from "./Signin";
function Welcome (){

    return(
        <div className="Welcome">
            <h1 style={{color:"black",textAlign:"center"}}>Welcome to mYeat</h1>
            <Signin />
        </div>       
    );
}

export default Welcome;