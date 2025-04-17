import React, { useState, useEffect } from "react";
import '../styles/homeStyle.css';
import BotaoFiltro from "../components/BotaoFiltro";
import Card from "../components/Card";
import BotaoTroca from "../components/BotaoTroca";
import TelaPokemon from "../components/TelaPokemon";


function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [posicao, setPosicao] = useState(0);
  const [listaPoke, setListaPoke] = useState(8);
  const [nomePoke, setNomePoke] = useState('pikachu');
  const [descPoke, setDescPoke] = useState('lorem ipsum');
  const [tipoP, setTipoP] = useState('teste');
  const [tipoS, setTipoS] = useState('teste');
  const [imgPoke, setImgPoke] = useState('');
  const [evolution, setEvolution] = useState('teste')
  const [evolution2, setEvolution2] = useState('teste')
  const [cardGame, setCardGame] = useState('')
  const [habitat, setHabitat] = useState('')

  const proximaPagina = () => setPosicao(prev => prev + 8);
  const paginaAnterior = () => {
    if (posicao >= 8) setPosicao(prev => prev - 8);
  };

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${listaPoke}&offset=${posicao}`);
        const data = await response.json();

        const detalhes = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return await res.json();
          })
        );

        setPokemons(detalhes);
      } catch (error) {
        console.error("Erro ao buscar Pokémon:", error);
      }
    }

    fetchPokemon();
  }, [posicao, listaPoke]);

  useEffect(() => {
    function atualizarTamanhoLista() {
      const largura = window.innerWidth;

      if (largura < 868) {
        setListaPoke(2);
      } else if (largura < 1128) {
        setListaPoke(4);
      } else if (largura < 1384) {
        setListaPoke(6);
      } else {
        setListaPoke(8);
      }
    }

    window.addEventListener('resize', atualizarTamanhoLista);
    atualizarTamanhoLista();

    return () => {
      window.removeEventListener('resize', atualizarTamanhoLista);
    };
  }, []);

  const fetchDescricaoPoke = async (nome) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${nome}`);
      const data = await response.json();

      const descricaoEn = data.flavor_text_entries.find(
        entry => entry.language.name === "en"
      );

      return descricaoEn ? descricaoEn.flavor_text.replace(/[\n\f\r]/g, ' ') : "Descrição não encontrada.";
    } catch (error) {
      return "Erro ao buscar descrição. "+ error;
    }
  };

  const fetchEvolutionChain = async (nome, url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      const evoResponse = await fetch(data.evolution_chain.url);
      const evoData = await evoResponse.json();
  
      const evolutionNames = [];
  
      const getEvolutions = (chain) => {
        if (!chain) return;
        evolutionNames.push(chain.species.name);
        if (chain.evolves_to.length > 0) {
          chain.evolves_to.forEach((evolution) => getEvolutions(evolution));
        }
      };
  
      getEvolutions(evoData.chain);
  
      // Filtra o nome atual
      const filteredEvolutions = evolutionNames.filter(pokemon => pokemon !== nome);
  
      console.log(filteredEvolutions);
      return filteredEvolutions;
    } catch (error) {
      return 'error: ' + error;
    }
  };

  const fetchCardGame = async (nome) => {
    try {
      const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:"${nome}"&pageSize=1`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
  
      const data = await response.json();
      const pokeCard = data.data[0];
  
      if (pokeCard) {
        return pokeCard.images.small;
      } else {
        console.log('Card não encontrado');
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const fetchHabitat = async (nome)=>{
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${nome}`)
    const data = await res.json()
    return data.habitat ? data.habitat.name : 'desconhecido';
  }


  useEffect(() => {
    const handleClick = async (event) => {
      const tela = document.querySelector('.box-tela');
      if (!tela || tela.style.display !== 'flex') return;
  
      const botoes = document.querySelectorAll('.botaoInfo');
      botoes.forEach(async (botao, indice) => {
        if (event.target.id === botao.id) {
          const pokeSelecionado = pokemons[indice];
          setNomePoke(pokeSelecionado.name);
  
          const descricao = await fetchDescricaoPoke(pokeSelecionado.name);
          setDescPoke(descricao);
          setTipoP(pokeSelecionado.types[0]?.type.name || 'desconhecido');
          setTipoS(pokeSelecionado.types[1]?.type.name || '');
          setImgPoke(pokeSelecionado.sprites.other['official-artwork'].front_default || pokeSelecionado.sprites.front_default);
          
          // Buscando as evoluções
          const evolucoes = await fetchEvolutionChain(pokeSelecionado.name, pokeSelecionado.species.url);
          setEvolution(evolucoes[0] || 'sem evolução');
          setEvolution2(evolucoes[1] || 'sem evolução');
          const imgCard = await fetchCardGame(pokeSelecionado.name);
          setCardGame(imgCard);
          const habitat = await fetchHabitat(pokeSelecionado.name);
          setHabitat(habitat)
        }
      });
    };
  
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [pokemons]);


  const abrirTela = () => {
    console.log(habitat)
    const tela = document.querySelector('.box-tela');
    if (tela) tela.style.display = 'flex';
  };

  return (
    <>
      <h1 className="title-home">Pokedex</h1>
      <p className="text-home">Seja bem vindo Treinador Pokemon</p>
      <div className="box-home">
        <ul className="home-lista-btn">
          <li className="btn-item">
            <BotaoFiltro texto="Todos pokemons" />
            <BotaoFiltro texto="Raio" />
            <BotaoFiltro texto="agua" />
            <BotaoFiltro texto="fogo" />
            <BotaoFiltro texto="fantasma" />
            <BotaoFiltro texto="fada" />
            <BotaoFiltro texto="venenoso" />
          </li>
        </ul>
        <div className="box-pokemon-home-teste">
          {pokemons.map((poke, key) => (
            <Card
              key={key}
              cod={poke.id}
              nome={poke.name}
              img={poke.sprites.other.dream_world.front_default ||  poke.sprites.front_default || poke.sprites.other['official-artwork'].front_default || poke.sprites.other['dream_world'].front_default}
              tipo={poke.types[0].type.name}
              infoPoke={abrirTela}
              habitat={habitat}
            />
          ))}
          <div className="box-nav">
            <BotaoTroca direcao="esquerda" funcao={paginaAnterior} />
            <BotaoTroca direcao="direita" funcao={proximaPagina} />
          </div>
          <TelaPokemon
            nome={nomePoke}
            desc={descPoke}
            tipoP={tipoP}
            tipoS={tipoS}
            img={imgPoke}
            evolutionOne={evolution}
            evolutionTwo={evolution2}
            cardGame = {`${cardGame}`}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
