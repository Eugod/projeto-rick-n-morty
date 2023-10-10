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
    const [todosOsPersonagens, setTodosOsPersonagens] = useState([]);
    const numPages = 42;

    const [txtPesquisa, setTxtPesquisa] = useState("");

    const [statusSelecionado, setStatusSelecionado] = useState("");

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
        setTodosOsPersonagens(todosOsDados);
    }

    useEffect(() => {
        buscarPersonagens();
    }, []);

    const buscarPersonagemPesquisado = async () => {
        await axios.get(APIPesquisarPersonagem + txtPesquisa)
            .then(({ data }) => {
                setPersonagens(data.results);
            }, err => {
                console.error("Personagem não encontrado", err);
            });
    }

    useEffect(() => {
        if (txtPesquisa === "") {
            buscarPersonagens();
        }
    }, [txtPesquisa]);

    const selecaoStatus = (e) => {
        setStatusSelecionado(e.target.value);
    }

    const filtrarPeloStatus = () => {
        switch (statusSelecionado) {
            case "todos":
                buscarPersonagens();
                break;
            case "vivo":
                setPersonagens(todosOsPersonagens.filter((personagem) => {
                    return personagem.status.toLowerCase() === "alive";
                }));
                break;
            case "morto":
                setPersonagens(todosOsPersonagens.filter((personagem) => {
                    return personagem.status.toLowerCase() === "dead";
                }));
                break;
            case "desconhecido":
                setPersonagens(todosOsPersonagens.filter((personagem) => {
                    return personagem.status.toLowerCase() === "unknown";
                }));
                break;
        }
    }

    useEffect(() => {
        filtrarPeloStatus();
    }, [statusSelecionado]);

    return (
        <div className="container">
            <h1 className="titulo">Lista de Personagens</h1>

            <div>
                <div>
                    <input type="text" name="pesquisa" id="pesquisa" placeholder="Nome do Personagem" value={txtPesquisa} onChange={(e) => setTxtPesquisa(e.target.value)} />

                    <input type="button" value="Pesquisar" onClick={buscarPersonagemPesquisado} />
                </div>

                <select name="statusDoPersonagem" id="statusDoPersonagem" onChange={selecaoStatus}>
                    <option disabled selected value="stauts-personagem">Status do Personagem</option>
                    <option value="todos">Todos</option>
                    <option value="vivo">Vivo</option>
                    <option value="morto">Morto</option>
                    <option value="desconhecido">Desconhecido</option>
                </select>
            </div>

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