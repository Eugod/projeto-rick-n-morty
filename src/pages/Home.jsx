/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./home.css";

const APIPersonagens = "https://rickandmortyapi.com/api/character";
const APIPesquisarPersonagem = "https://rickandmortyapi.com/api/character/?name="; //colocar o nome do personagem pesquisado



export default function Home() {
    const [personagens, setPersonagens] = useState([]);
    const numPages = 42

    const buscarPersonagens = async () => {
        let todosOsDados = [];

        for (let i = 1; i < numPages; i++) {
            await axios.get(`${APIPersonagens}?page=${i}`)
                .then(({ data }) => {
                    todosOsDados = [...todosOsDados, ...data.results]
                }, err => {
                    console.error("Personagens não encontrados", err);
                });
        }

        setPersonagens(todosOsDados);
    }

    useEffect(() => {
        buscarPersonagens();
    }, []);

    return (
        <div className="container">
            <h1 className="titulo">Lista de Personagens</h1>

            {
                personagens && personagens.length > 0 && (
                    <ul className="lista-de-personagens">
                        {
                            personagens.map((personagem, i) => {
                                return (
                                    <li key={i}>
                                        <Link className="personagem">
                                            <img src={personagem.image} className="foto" />

                                            <p className="nome">{personagem.name}</p>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                )
            }

        </div>
    )
}