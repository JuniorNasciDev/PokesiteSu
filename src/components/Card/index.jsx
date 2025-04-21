import React, { useState, useEffect } from "react";
import './style.css';
import Like from "../like";
import BotaoInfo from "../botaoInfo";

// Função para pegar os favoritos do localStorage
function getFavoritos() {
  const favs = localStorage.getItem("favoritos");
  return favs ? JSON.parse(favs) : [];
}

// Função para salvar os favoritos no localStorage
function setFavoritos(favoritos) {
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

function Card(props) {
  const [isCheck, setIsCheck] = useState(false); // Estado do checkbox de favorito

  // useEffect para verificar se o Pokémon está nos favoritos ao carregar o card
  useEffect(() => {
    const favoritos = getFavoritos();
    setIsCheck(favoritos.includes(props.cod)); // props.cod = ID do Pokémon
  }, [props.cod]);

  // Função chamada ao clicar no botão de favorito
  const Favoritar = () => {
    const favoritos = getFavoritos();

    if (favoritos.includes(props.cod)) {
      // Se já estiver nos favoritos, remove
      const novos = favoritos.filter(id => id !== props.cod);
      setFavoritos(novos);
      setIsCheck(false);
    } else {
      // Se não estiver, adiciona
      const novos = [...favoritos, props.cod];
      setFavoritos(novos);
      setIsCheck(true);
    }

    console.log(props.nome + ' favorito: ' + !isCheck);
    console.log(favoritos)
  };

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
          <Like 
            id={props.cod}
            checked={isCheck}
            callback={Favoritar}
          />
        </div>
        <BotaoInfo 
          id={props.cod}
          funcaoInfo={props.infoPoke}
        />
      </div>
    </div>
  );
}

export default Card;
