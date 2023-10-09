/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const APIPersonagens = "https://rickandmortyapi.com/api/character";
const APIPesquisarPersonagem = "https://rickandmortyapi.com/api/character/?name="; //colocar o nome do personagem pesquisado



export default function Home() {
    const [personagens, setPersonagens] = useState([]);
    const [numPages] = useState(42);

    const buscarPersonagens = async () => {
        let todosOsDados = [];

        for (let i = 0; i < numPages; i++) {
            await axios.get(`${APIPersonagens}?page=${i}`)
                .then(({ data }) => {
                    setPersonagens(prevState => {
                        return { ...prevState, data };
                    });
                }, err => {
                    console.error("Personagens não encontrados", err);
                });
        }
    }

    useEffect(() => {
        buscarPersonagens();
        console.log(personagens);
    }, []);

    return (
        <div>
            <h1>Lista de Personagens</h1>

            {
                personagens && (
                    <ul>

                    </ul>
                )
            }

        </div>
    )
}