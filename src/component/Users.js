import React, { useEffect, useState } from "react";
import { getAllPokemonList } from "../api/pokemon";

const Users = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [mode, setMode] = useState("online");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllPokemonList();
        setPokemonData(data?.results);
        localStorage.setItem("users", JSON.stringify(data?.results));
      } catch (error) {
        // Handle the error as needed
        console.error("Error in fetching data:", error);
        let collection = localStorage.getItem("users");
        setPokemonData(JSON.parse(collection));
        setMode("offline");
      }
    }

    if (!navigator.offline) {
      console.log("Api call.....");
      fetchData();
    }
  }, []);
  return (
    <>
 <div>
    {
        mode==='offline'?<div>You are offline mode</div>:null
    }
 </div>
   
    <div
      style={{
        marginTop: "40px",
        justifyContent: "space-around",
        display: "flex",
        flexWrap: "wrap",
        width: "90%",
        margin: "auto",
      }}
    >
      {pokemonData?.map((poke, i) => {
        return (
          <div
            style={{
              width: "400px",
              height: "330px",
              border: "2px solid #000000",
              margin: "30px 10px",
            }}
          >
            <div style={{ padding: "5px 10px" }}>
              <p style={{ fontWeight: "bold", textTransform: "capitalize" }}>
                {" "}
                {poke.name}
              </p>
            </div>
            <img
              style={{ height: "300px", width: "300px" }}
              alt="pokemon"
              src={`https://img.pokemondb.net/artwork/large/${poke.name}.jpg`}
            />
          </div>
        );
      })}
      <div></div>
    </div>
    </>
  );
};

export default Users;
