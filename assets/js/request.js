const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

const requestPokemon = async (pokemonId) => {
  try {
    const response = await fetch(
      `${BASE_URL}${pokemonId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Hubo un error en la peticion: ${error}`);
  }
};
