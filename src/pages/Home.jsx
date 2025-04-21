import React, { useState, useEffect } from "react";
import "../styles/homeStyle.css";
import BotaoFiltro from "../components/BotaoFiltro";
import Card from "../components/Card";
import BotaoTroca from "../components/BotaoTroca";
import TelaPokemon from "../components/TelaPokemon";

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [posicao, setPosicao] = useState(0);
  const [listaPoke, setListaPoke] = useState(8);
  const [nomePoke, setNomePoke] = useState("pikachu");
  const [descPoke, setDescPoke] = useState("lorem ipsum");
  const [tipoP, setTipoP] = useState("teste");
  const [tipoS, setTipoS] = useState("teste");
  const [imgPoke, setImgPoke] = useState("");
  const [evolution, setEvolution] = useState("teste");
  const [evolution2, setEvolution2] = useState("teste");
  const [cardGame, setCardGame] = useState("");
  const [habitat, setHabitat] = useState("none");
  const [evolutionIMG, setEvolutionIMG] = useState("teste");
  const [evolutionIMG2, setEvolutionIMG2] = useState("teste");
  const [hp, setHP] = useState("126");
  const [atk, setAtk] = useState("0");
  const [def, setDef] = useState("0");
  const [spd, setSped] = useState("0");
  const [exp, setExp] = useState("0");
  const [peso, setPeso] = useState("0");
  const [altura, setAltura] = useState("0");
  const listapoketeste= useState(`https://pokeapi.co/api/v2/pokemon?limit=${listaPoke}&offset=${posicao}`);
  const [tipoSelecionado, setTipoSelecionado] = useState('all');


  const proximaPagina = () => setPosicao((prev) => prev + listaPoke);
  const paginaAnterior = () => {
  if (posicao >= listaPoke) setPosicao((prev) => prev - listaPoke);
};

  useEffect(() => {
    async function fetchPokemon() {
      try {
        let listaFinal = [];
  
        if (tipoSelecionado !== 'all') {
          const response = await fetch(`https://pokeapi.co/api/v2/type/${tipoSelecionado}`);
          const data = await response.json();
  
          const pokemonsTipo = data.pokemon.slice(posicao, posicao + listaPoke);
          listaFinal = await Promise.all(
            pokemonsTipo.map(async (entry) => {
              const res = await fetch(entry.pokemon.url);
              return await res.json();
            })
          );
        } else {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${listaPoke}&offset=${posicao}`);
          const data = await response.json();
  
          listaFinal = await Promise.all(
            data.results.map(async (pokemon) => {
              const res = await fetch(pokemon.url);
              return await res.json();
            })
          );
        }
  
        setPokemons(listaFinal);
      } catch (error) {
        console.error("Erro ao buscar Pokémon:", error);
      }
    }
  
    fetchPokemon();
  }, [tipoSelecionado, posicao]);

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

    window.addEventListener("resize", atualizarTamanhoLista);
    atualizarTamanhoLista();

    return () => {
      window.removeEventListener("resize", atualizarTamanhoLista);
    };
  }, [listapoketeste]);

  const fetchDescricaoPoke = async (nome) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${nome}`
      );
      const data = await response.json();

      const descricaoEn = data.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      );

      return descricaoEn
        ? descricaoEn.flavor_text.replace(/[\n\f\r]/g, " ")
        : "Descrição não encontrada.";
    } catch (error) {
      return "Erro ao buscar descrição. " + error;
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
      const filteredEvolutions = evolutionNames.filter(
        (pokemon) => pokemon !== nome
      );

      console.log(filteredEvolutions);
      return filteredEvolutions;
    } catch (error) {
      return "error: " + error;
    }
  };

  const fetchEvolutionIMG = async (nome) => {
    if (nome == undefined) {
      console.log("não existe outra");
      return "https://cdn.pixabay.com/photo/2012/04/12/20/12/x-30465_960_720.png";
    }
    const url = `https://pokeapi.co/api/v2/pokemon/${nome}`;
    const response = await fetch(url);
    const data = await response.json();

    // Verifique se a chave "sprites" e "front_default" existem
    return data.sprites.front_default;
  };

  const fetchCardGame = async (nome) => {
    try {
      const response = await fetch(
        `https://api.pokemontcg.io/v2/cards?q=name:"${nome}"&pageSize=1`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      const pokeCard = data.data[0];

      if (pokeCard) {
        return pokeCard.images.small;
      } else {
        console.log("Card não encontrado");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const fetchHabitat = async (nome) => {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${nome}`
    );
    const data = await res.json();
    return data.habitat ? data.habitat.name : "desconhecido";
  };

  const carregarPokemonCompleto = async (nome) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);
    const pokeSelecionado = await response.json();

    setNomePoke(pokeSelecionado.name);

    const descricao = await fetchDescricaoPoke(pokeSelecionado.name);
    setDescPoke(descricao);
    setTipoP(pokeSelecionado.types[0]?.type.name || "desconhecido");
    setTipoS(pokeSelecionado.types[1]?.type.name || "");
    setImgPoke(
      pokeSelecionado.sprites.other["official-artwork"].front_default ||
        pokeSelecionado.sprites.front_default
    );
    setHP(pokeSelecionado.stats[0].base_stat);
    setAtk(pokeSelecionado.stats[1].base_stat);
    setDef(pokeSelecionado.stats[2].base_stat);
    setSped(pokeSelecionado.stats[5].base_stat);
    setExp(pokeSelecionado.base_experience);
    setPeso(pokeSelecionado.weight);
    setAltura(pokeSelecionado.height);

    const evolucoes = await fetchEvolutionChain(
      pokeSelecionado.name,
      pokeSelecionado.species.url
    );
    setEvolution(evolucoes[0] || "sem evolução");
    setEvolution2(evolucoes[1] || "sem evolução");

    const imgCard = await fetchCardGame(pokeSelecionado.name);
    setCardGame(imgCard);

    const habitat = await fetchHabitat(pokeSelecionado.name);
    setHabitat(habitat);

    const imgEvo = await fetchEvolutionIMG(evolucoes[0]);
    setEvolutionIMG(imgEvo);
    const imgEvo2 = await fetchEvolutionIMG(evolucoes[1]);
    setEvolutionIMG2(imgEvo2);
  };

  const TrocaPokeTela = async (item) => {
    let pokeDaVez;

    if (item.target.classList.contains("evo-1")) {
      if (!evolution) return;
      pokeDaVez = evolution;
    } else if (item.target.classList.contains("evo-2")) {
      if (!evolution2) return;
      pokeDaVez = evolution2;
    }

    if (pokeDaVez) {
      await carregarPokemonCompleto(pokeDaVez);
    }
  };

  const buscarPorTipo = (tipo) => {
    setTipoSelecionado(tipo);
    setPosicao(0);
  };

  useEffect(() => {
    const handleClick = async (event) => {
      const tela = document.querySelector(".box-tela");
      if (!tela || tela.style.display !== "flex") return;

      const botoes = document.querySelectorAll(".botaoInfo");
      botoes.forEach(async (botao, indice) => {
        if (event.target.id === botao.id) {
          const pokeSelecionado = pokemons[indice];
          setNomePoke(pokeSelecionado.name);

          const descricao = await fetchDescricaoPoke(pokeSelecionado.name);
          setDescPoke(descricao);
          setTipoP(pokeSelecionado.types[0]?.type.name || "desconhecido");
          setTipoS(pokeSelecionado.types[1]?.type.name || "");
          setImgPoke(
            pokeSelecionado.sprites.other["official-artwork"].front_default ||
              pokeSelecionado.sprites.front_default
          );
          setHP(pokeSelecionado.stats[0].base_stat);
          setAtk(pokeSelecionado.stats[1].base_stat);
          setDef(pokeSelecionado.stats[2].base_stat);
          setSped(pokeSelecionado.stats[5].base_stat);
          setExp(pokeSelecionado.base_experience);
          setPeso(pokeSelecionado.weight);
          setAltura(pokeSelecionado.height);
          console.log(pokeSelecionado);

          // Buscando as evoluções
          const evolucoes = await fetchEvolutionChain(
            pokeSelecionado.name,
            pokeSelecionado.species.url
          );
          setEvolution(evolucoes[0] || "sem evolução");
          setEvolution2(evolucoes[1] || "sem evolução");
          const imgCard = await fetchCardGame(pokeSelecionado.name);
          setCardGame(imgCard);
          const habitat = await fetchHabitat(pokeSelecionado.name);
          setHabitat(habitat);
          const imgEvo = await fetchEvolutionIMG(evolucoes[0]);
          setEvolutionIMG(imgEvo);
          const imgEvo2 = await fetchEvolutionIMG(evolucoes[1]);
          setEvolutionIMG2(imgEvo2);
        }
      });
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [pokemons, nomePoke, listapoketeste]);

  const abrirTela = () => {
    const tela = document.querySelector(".box-tela");
    if (tela) tela.style.display = "flex";
  };

  return (
    <>
      <h1 className="title-home">Pokedex</h1>
      <p className="text-home">Seja bem vindo Treinador Pokemon</p>
      <div className="box-home">
        <ul className="home-lista-btn">
          <li className="btn-item">
            <BotaoFiltro funcao={buscarPorTipo} texto="todos" />
          </li>
          <li className="btn-item">
            <BotaoFiltro funcao={buscarPorTipo} texto="normal" />
          </li>
          <li className="btn-item">
            <BotaoFiltro funcao={buscarPorTipo} texto="fogo" />
          </li>
          <li className="btn-item">
            <BotaoFiltro funcao={buscarPorTipo} texto="agua" />
          </li>
          <li className="btn-item">
            <BotaoFiltro funcao={buscarPorTipo} texto="grama" />
          </li>
          <li className="btn-item">
            <BotaoFiltro funcao={buscarPorTipo} texto="eletrico" />
          </li>
          <li className="btn-item">
            <BotaoFiltro funcao={buscarPorTipo} texto="gelo" />
          </li>
          <li className="btn-item">
            <BotaoFiltro funcao={buscarPorTipo} texto="lutador" />
          </li>
          <li className="btn-item">
            <BotaoFiltro funcao={buscarPorTipo} texto="venenoso" />
          </li>
          <li className="btn-item">
            <BotaoFiltro funcao={buscarPorTipo} texto="terrestre" />
          </li>
          <li className="btn-item">
            <BotaoFiltro funcao={buscarPorTipo} texto="voador" />
          </li>
          <li className="btn-item">
            <BotaoFiltro funcao={buscarPorTipo} texto="psiquico" />
          </li>
          <li className="btn-item">
            <BotaoFiltro funcao={buscarPorTipo} texto="inseto" />
          </li>
          <li className="btn-item">
            <BotaoFiltro funcao={buscarPorTipo} texto="pedra" />
          </li>
          <li className="btn-item">
            <BotaoFiltro funcao={buscarPorTipo} texto="fantasma" />
          </li>
          <li className="btn-item">
            <BotaoFiltro funcao={buscarPorTipo} texto="dragao" />
          </li>
          <li className="btn-item">
            <BotaoFiltro funcao={buscarPorTipo} texto="sombrio" />
          </li>
          <li className="btn-item">
            <BotaoFiltro funcao={buscarPorTipo} texto="aco" />
          </li>
          <li className="btn-item">
            <BotaoFiltro funcao={buscarPorTipo} texto="fada" />
          </li>
        </ul>
        <div className="box-pokemon-home-teste">
          {pokemons.map((poke, key) => (
            <Card
              key={key}
              cod={poke.id}
              nome={poke.name}
              img={
                poke.sprites.other.dream_world.front_default ||
                poke.sprites.front_default ||
                poke.sprites.other["official-artwork"].front_default ||
                poke.sprites.other["dream_world"].front_default
              }
              tipo={poke.types[0].type.name}
              infoPoke={abrirTela}
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
            evolutionOneIMG={evolutionIMG}
            evolutionTwo={evolution2}
            evolutionTwoIMG={evolutionIMG2}
            cardGame={`${cardGame}`}
            habita={habitat}
            hp={hp}
            atk={atk}
            def={def}
            spd={spd}
            exp={exp}
            peso={peso}
            altura={altura}
            funcEvolutionP={TrocaPokeTela}
            funcEvolutionS={TrocaPokeTela}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
