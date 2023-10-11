/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./personagem.css";

const API = "https://rickandmortyapi.com/api/character/";

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
            for (const episodio of linkEpisodios) {
                try {
                    const { data } = await axios.get(episodio);
                    dados.push(data);
                } catch (err) {
                    console.error("Episódios não encontrados", err);
                }
            }

            setEpisodios(dados);
        }
    }

    useEffect(() => {
        buscarEpisodios();
    }, [linkEpisodios]);

    return (
        <div className="container-personagem">
            <h1>Detalhes do Personagem</h1>

            <div className="container-info-personagem">
                {
                    personagem && (
                        <div>
                            <img src={personagem.image} className="foto-personagem" />

                            <p className="info-personagem">Nome: {nomePersonagem}</p>

                            <p className="info-personagem">Status: {personagem.status}</p>

                            <p className="info-personagem">Espécie: {personagem.species}</p>

                            <Link to={"/"} className="btn-voltar">Voltar</Link>
                        </div>
                    )
                }

                <div>
                    <h2 className="titulo-secundario">Episódios</h2>

                    {
                        episodios && (
                            <ul className="lista-episodios">
                                {
                                    episodios.map((episodio, i) => {
                                        return (
                                            <li key={i} className="episodio">
                                                <p className="temporada">Temporada: {episodio.episode}</p>

                                                <p className="titulo-episodio">Título: {episodio.name}</p>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        )
                    }
                </div>
            </div>
        </div>
    )
}