import React from "react";
import './style.css'
import logo from '../../assets/logo-navegacao.png'
import Botao from "../Botao";


function Nav(){
    return(
        <div className="nav-box">
            <div className="box-logo">
                <img className="logo-nav" src={logo} alt="Logo do Pokemon" />
            </div>
            <ul className="lista-nav">
                <Botao texto='Home' rota='/' />
                <Botao texto='Favoritos' rota='favoritos'/>
            </ul>
           
        </div>
    )
}

export default Nav;