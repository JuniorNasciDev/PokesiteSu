import React from "react";
import './style.css'

function Pesquisa(props){
    return(
        <input className="pesquisa" type="text" placeholder={props.placeholder} />
    )
}

export default Pesquisa