/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API = "https://rickandmortyapi.com/api/character/"; // id do personagem

export default function Personagem() {
    const { id, nomePersonagem } = useParams();
    const [personagem, setPersonagem] = useState([]);
    const [linkEpisodios, setLinkEpisodios] = useState([]);
    const [episodios, setEpisodios] = useState([]);

    const buscarPersonagem = async () => {
        await axios.get(API + id)
            .then(({ data }) => {
                setPersonagem(data);
                setLinkEpisodios(data.episode);
            }), err => {
                console.error("Personagem não encontrado", err);
            }
    }

    useEffect(() => {
        buscarPersonagem();
    }, []);

    const buscarEpisodios = async () => {
        let dados = [];

        if (linkEpisodios.length > 0) {
            linkEpisodios.forEach(async (episodio) => {
                await axios.get(episodio)
                    .then(({ data }) => {
                        dados.push(data);
                    }), err => {
                        console.error("Episódios não encontrados", err);
                    }
            });

            setEpisodios(dados);
        }
    }

    useEffect(() => {
        buscarEpisodios();
        console.log(episodios);
    }, [linkEpisodios]);

    return (
        <div>
            <h1>{nomePersonagem}</h1>

            {
                personagem && (
                    <div>
                        <img src={personagem.image} />

                        <p>Status: {personagem.status}</p>

                        <p>Espécie: {personagem.species}</p>
                    </div>
                )
            }

            <div>
                <h2>Episódios</h2>

                {
                    episodios && (
                        <ul>
                            {
                                episodios.map((episodio, i) => {
                                    return (
                                        <li key={i}>
                                            <p>Título: {episodio.name}</p>

                                            <p>Temporada: {episodio.episode}</p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    )
                }
            </div>
        </div>
    )
}