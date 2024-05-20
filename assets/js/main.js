const form = document.getElementById("form");
const pokemonInput = document.querySelector(".search-input");
const cardContainer = document.querySelector(".card-container");
const searchMsg = document.querySelector(".search-msg");

const roundNumber = (number) => Math.round(number);

const getPokemonData = (pokemonData) => {
  return {
    pokemonName: pokemonData.name,
    image: pokemonData.sprites.other.dream_world.front_default,
    pokemonType: pokemonData.types[0].type.name,
    pokemonHeight: (pokemonData.height / 10),
    pokemonWeight: (pokemonData.weight/ 10),
  };
};


const createPokemonTemplateHTML = (pokemonData) => {
  const {
    pokemonName,
    image,
    pokemonType,
    pokemonHeight,
    pokemonWeight,
  } = getPokemonData(pokemonData);

  return `
        <div class="pokemon-card animate">
          <div class="pokemon-img-container">
            <img src="${image}" alt="pokemon image" />
          </div>
          <div class="pokemon-info-container">
            <h2 class="pokemon-title">${pokemonName}</h2>
            <p class="pokemon-type">${pokemonType}</p>
            <div class="pokemon-info-container">
              <span class="pokemon-height">${pokemonHeight} metros</span>
              <span class="pokemon-weight">${pokemonWeight} kgs</span>
            </div>
          </div>
        </div>
  `;
};


const renderPokemonCard = (pokemonData) => {
  cardContainer.innerHTML = createPokemonTemplateHTML(pokemonData);
};


const changeSearchMsg = (pokemonData) => {
  const { pokemonName } = getPokemonData(pokemonData);

  searchMsg.textContent = `Tu pokemon es ${pokemonName}, Queres buscar otro?`
};

const searchPokemon = async (e) => {
  e.preventDefault();
  const searchedPokemon = pokemonInput.value.trim();

  if (searchedPokemon === "") {
    searchMsg.textContent = 'Por favor, ingresa un numero'
    return;
  }

  const fetchedPokemon = await requestPokemon(searchedPokemon);

  if (!fetchedPokemon) {
    searchMsg.textContent = `El pokemon ${searchedPokemon} no existe`;
    cardContainer.innerHTML = ''
    form.reset();
    return;
  }

  renderPokemonCard(fetchedPokemon);
  changeSearchMsg(fetchedPokemon)
  form.reset()
};

const init = () => {
  form.addEventListener("submit", searchPokemon);
};

init();
