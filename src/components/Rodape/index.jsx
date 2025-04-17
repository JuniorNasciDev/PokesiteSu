import React from "react";
import Links from "../links";
import './style.css'
import linkedin from '../../assets/ico_linkedin.png'
import github from '../../assets/ico_github.png'

function Rodape(){
    return(
        <div className="box-rodape">
            <ul className="lista-rodape">
               <li className="item-rodape">
                <Links texto='Linkedin' href='#' img={linkedin}/>
               </li>
               <li className="item-rodape">
                <a href="#">Junior Criations ©</a>
              
               </li>
               <li className="item-rodape">
                <Links texto='Github' href='#' img={github}/>
               </li>
            </ul>
            
        </div>
    )
}

export default Rodape; 