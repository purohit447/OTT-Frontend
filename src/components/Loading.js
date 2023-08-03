import React, { useContext } from 'react'
import Loader from 'react-spinner-loader';
import LoadingContext from '../context/LoadingContext'
import "./Loading.css"
const Loading = () => {
    const [loading , setLoading] = useContext(LoadingContext);
    const st = {
        display : loading ? "flex" : "none"
    }
  return (
    <div className="loading-container glass" style={st}>
        <div className="loading-container2 glass2" style={{padding:"10px"}}>
        <Loader show = {true} style={{marginTop:"10px",marginLeft:"15px"}}>Processing</Loader>
            <p id="pro">Processing</p>
        </div>
    </div>
  )
}

export default Loading