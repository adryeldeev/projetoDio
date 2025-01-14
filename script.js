const pokemonUl = document.getElementById('pokemons');
const loadMoreButton = document.getElementById('loadMoreButton');
const limit = 10;
let offset = 0;
let maxRecords = 151

function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((data =[]) => {
    const newList = data.map((pokemon) => `
      <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
          <ul class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
          </ul>
          <img src="${pokemon.photo}" alt="${pokemon.name}" />
        </div>
      </li>
    `).join('');

    pokemonUl.innerHTML += newList;
  });
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', () => {
  offset += limit;
  const qtdRecord = offset + limit
  
  if(qtdRecord >= maxRecords){
    const newLimit =  maxRecords - offset;
    loadPokemonItems(offset, newLimit);
    
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  }else {
    loadPokemonItems(offset, limit);

  }
});
