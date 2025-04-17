import React from "react";
import './style.css'

 function BotaoTroca(props){
    return(
        <button onClick={props.funcao} className={props.direcao}>troca</button>
    )
 }

 export default BotaoTroca;