import React from "react";
import './style.css'

function Botao(props){
    return(
        <a href={props.rota} className="botao">
            {props.texto}
        </a>
            
    )
}

export default Botao;