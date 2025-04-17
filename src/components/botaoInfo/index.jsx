import React from "react";
import './style.css'

function BotaoInfo(props){
    
    return(
        <button id={props.id} onClick={props.funcaoInfo} className="botaoInfo">
            mais informações
        </button>
    )
}

export default BotaoInfo;