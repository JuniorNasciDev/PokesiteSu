import React from "react";
import './style.css'




function BotaoFiltro({funcao,texto}){

    const traduzirTipo = (texto) => {
        const mapa = {
            "todos": "all",
            "normal": "normal",
            "fogo": "fire",
            "agua": "water",
            "grama": "grass",
            "eletrico": "electric",
            "gelo": "ice",
            "lutador": "fighting",
            "venenoso": "poison",
            "terrestre": "ground",
            "voador": "flying",
            "psiquico": "psychic",
            "inseto": "bug",
            "pedra": "rock",
            "fantasma": "ghost",
            "dragao": "dragon",
            "sombrio": "dark",
            "aco": "steel",
            "fada": "fairy"
        };
      
        return mapa[texto] || texto.toLowerCase();
      };

    const teste = ()=>{
        const tipo = traduzirTipo(texto);
        funcao(tipo)
    }
    
    return(
        <button onClick={teste} 
        className="btn-filtro">{texto}</button>
    )
}

export default BotaoFiltro;