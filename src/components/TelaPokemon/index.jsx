import React, { useEffect } from "react";
import "./style.css";

function TelaPokemon(props) {

 

  
  function closeTela(){
    document.querySelector('.box-tela').style = 'display:none'
  }
  
  function BarraStats (classe,qtd){
    let porcento = 0
    
    if(classe == 'hp-bar'){
      porcento = (qtd/255)*100
    }else if(classe == 'atk-bar'){
      porcento = (qtd/190)*100
    }else if(classe == 'def-bar'){
      porcento = (qtd/230)*100
    }else if(classe == 'spd-bar'){
      porcento = (qtd/200)*100
    }else if(classe == 'exp-bar'){
      porcento = (qtd/608)*100
    }

    document.querySelector(`.${classe}`).style.width = `${porcento}%`
  }

  useEffect(()=>{

    BarraStats('hp-bar',props.hp)
    BarraStats('atk-bar',props.atk)
    BarraStats('def-bar',props.def)
    BarraStats('spd-bar',props.spd)
    BarraStats('exp-bar',props.exp)
  

  },[props.hp])


  return (
    <div className={`box-tela ${props.habita}`}>
      <div className="box-3dmodel">
        <p className="title-cardin-game">Tcg Cardin Game</p>
        <div className="box-card-3d">
          <img className="img-card-poke" src={`${props.cardGame}`} alt="" />
        </div>
      </div>

      <div className="box-infoPoke">
        <div className="box-titulo">
          <p className="nome-poke">{props.nome}</p>
          <div className="box-tipos">
            <div className={`tipo principal ${props.tipoP}`}>
              <p className="nome-tipo-principal">{props.tipoP}</p>
            </div>
            <div className={`tipo secundario ${props.tipoS}`}>
            <p className="nome-tipo-secundario">{props.tipoS}</p>
            
            </div>
          </div>
        </div>
        <p className="desc-poke">{props.desc}</p>

        <div className="box-evolution">
          <p className="title-evolution">Evoluções</p>
          <div className="box-btn-evolution">
            <div onClick={props.funcEvolutionP} className="box-btn-evolution-w box-btn-1">
              <button className={`btn-evolution f-${props.tipoP}`}>
                <img className="img-btn-evolution evo-1" src={`${props.evolutionOneIMG}`} alt="" />
              </button>
              <p className="title-btn-evolution">{props.evolutionOne}</p>
            </div>
            <div onClick={props.funcEvolutionS} className="box-btn-evolution-w box-btn-2">
              <button className={`btn-evolution f-${props.tipoP}`}>
              <img className="img-btn-evolution evo-2" src={`${props.evolutionTwoIMG}`} alt="" />
              </button>
              <p className="title-btn-evolution">{props.evolutionTwo}</p>
            </div>
          </div>
        </div>

        <div className="box-stats">
          <p className="title-stats">Base Stats</p>

          <div className="stats-bar">
            <p className="title-bar" >Hp</p>
            <div className="base-bar">
              <div className={`info-bar hp-bar`}>
                <p className="info-bar-text">{props.hp}/255</p>
              </div>
            </div>
          </div>
          <div className="stats-bar">
            <p className="title-bar" >Atk</p>
            <div className="base-bar">
              <div className="info-bar atk-bar">
                <p className="info-bar-text">{props.atk}/190</p>
              </div>
            </div>
          </div>
          <div className="stats-bar">
            <p className="title-bar">Def</p>
            <div className="base-bar">
              <div className="info-bar def-bar">
                <p className="info-bar-text">{props.def}/230</p>
              </div>
            </div>
          </div>
          <div className="stats-bar">
            <p  className="title-bar">Spd</p>
            <div className="base-bar">
              <div className="info-bar spd-bar">
                <p className="info-bar-text">{props.spd}/200</p>
              </div>
            </div>
          </div>
          <div className="stats-bar">
            <p  className="title-bar">Exp</p>
            <div className="base-bar">
              <div className="info-bar exp-bar">
                <p className="info-bar-text">{props.exp}/608</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      <img className="img-poke-p" src ={`${props.img}`} alt="" />

      <div className="box-info-peso-alt">
        <div>
          <p>{props.peso/10} Kg</p>
          <p>peso</p>
        </div>
        <div>
          <p>{props.altura/10}M</p>
          <p>altura</p>
        </div>
      </div>

      <div className={`fundo f-${props.tipoP} tela-1`}>
      </div>
      <div className={`fundo f-${props.tipoP} tela-2`}>

      </div>

      <button onClick={closeTela} className="close-tela">
        
      </button>
    </div>
  );
}

export default TelaPokemon;
