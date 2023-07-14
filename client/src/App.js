import React,{useContext,useState,createContext,useReducer,useEffect} from 'react';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Signin from './components/pages/Signin';
import Profile from './components/pages/Profile';
import Signup from './components/pages/Signup';
import Welcome from './components/pages/Welcome';
import {reducer,initialState} from './reducers/userReducer';
import {BrowserRouter,Route,Routes,useNavigate} from 'react-router-dom';
import "./App.css"

export const UserContext = createContext()


const Routing=()=>{
    const navigate = useNavigate()
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem(user))
        if (user){
            navigate('/home')
        }
        else{
            navigate('/')
        }
    },[]) 
    return(
        <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/home" element={<Home />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/signup" element={<Signup />} />
        </Routes>
    )
}
function App() {
    const [state,dispatch] =useReducer(reducer,initialState)
    return (
        <UserContext.Provider value={{state,dispatch}}>
        <BrowserRouter>
            <Navbar />
            <Routing />
        </BrowserRouter>
        </UserContext.Provider>
    );
  }
  
  export default App;