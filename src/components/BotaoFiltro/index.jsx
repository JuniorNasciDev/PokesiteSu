import React from "react";
import './style.css'

function BotaoFiltro(props){
    return(
        <button className="btn-filtro">{props.texto}</button>
    )
}

export default BotaoFiltro;