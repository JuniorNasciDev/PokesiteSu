import React from "react";
import './style.css'

function Links(props){
    return(
        <div className="box-link">
            <a className="link-txt" href={props.href}>{props.texto}</a>
            <img className="link-img" src={props.img} alt="imagem do link" />
        </div>
    )
}

export default Links;