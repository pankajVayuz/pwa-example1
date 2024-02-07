import axios from "axios";

const URL = `https://pokeapi.co/api/v2/pokemon?limit=151`;


export const getAllPokemonList = async () => {
    try {
        const { data } = await axios.get(URL);
        return data;
    } catch (error) {
        alert("Error fetching Pokemon list:", error);
        throw  error;
    }
};