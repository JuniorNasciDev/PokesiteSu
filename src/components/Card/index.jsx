import React from "react";
import './style.css'
import Like from "../like";
import BotaoInfo from "../botaoInfo";

function Card(props){

    return (
        <div className={`box-card ${props.tipo}`}>
          <div className={`box-tipo ${props.tipo}`}></div>
          <img
            className="poke-img"
            src={props.img}
            alt="pokemon"
          />
          <div className="box-card-dentro">
            <p className="poke-id">{props.cod}</p>
            <div className="box-nome">
              <p className="poke-nome">{props.nome}</p>
              <Like id={props.cod}/>
            </div>
            <BotaoInfo 
            id={props.cod}
            funcaoInfo={props.infoPoke}/>
          </div>
        </div>
    );
}

export default Card;