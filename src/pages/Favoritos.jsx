import React, { useEffect, useState, useRef } from "react";
import '../styles/favoritosStyle.css';
import Like from "../components/like";
import BotaoInfo from '../components/botaoInfo'

function Favoritos() {
  const [listaFavo, setListaFavo] = useState([]);
  const [favoritos, setFavoritosState] = useState([]);
  const carregados = useRef(new Set()); // Para evitar carregamentos duplicados



  useEffect(() => {
    const favs = getFavoritos();
    setFavoritosState(favs);
    favs.forEach((id) => getPokemonFavo(id));
  }, []);

  async function getPokemonFavo(id) {
    if (carregados.current.has(id)) return;
    carregados.current.add(id);

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      setListaFavo((prev) => [...prev, data]);
    } catch (error) {
      console.error(`Erro ao buscar Pokémon com id ${id}:`, error);
    }
  }

  function getFavoritos() {
    const favs = localStorage.getItem("favoritos");
    return favs ? JSON.parse(favs) : [];
  }

  function salvarFavoritos(lista) {
    setFavoritosState(lista);
    localStorage.setItem("favoritos", JSON.stringify(lista));
  }

  function toggleFavorito(id) {
    const novos = favoritos.includes(id)
      ? favoritos.filter((favId) => favId !== id)
      : [...favoritos, id];

    salvarFavoritos(novos);

    if (!favoritos.includes(id)) {
      getPokemonFavo(id);
    } else {
      setListaFavo((prev) => prev.filter((p) => p.id !== id));
      carregados.current.delete(id); // Permite adicionar novamente no futuro
    }
  }

  function isFavorito(id) {
    return favoritos.includes(id);
  }

  return (
    <>
      <h1 className="title-home">Favoritos</h1>
      <p className="text-home">Esses Pokémons são seus escolhidos</p>
      
      <ul className="listaFav">
        {listaFavo.map((pokemon) => (
          <li className="poke-fav" key={pokemon.id}>
            <div className="box-id-poke">
              <p>ID #{pokemon.id}</p>
            </div>
            <div className="box-img-poke">
              <img
                className="img-poke"
                src={
                  pokemon.sprites?.versions?.["generation-v"]?.["black-white"]
                    ?.animated?.front_default || pokemon.sprites?.front_default
                }
                alt={pokemon.name}
              />
            </div>
            <div className="box-nome-poke">{pokemon.name}</div>
            <Like
              id={`like-${pokemon.id}`}
              checked={isFavorito(pokemon.id)}
              callback={() => toggleFavorito(pokemon.id)}
            />
          </li>
        ))}
      </ul>  
    </>
  );
}

export default Favoritos;
