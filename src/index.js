const pokeForm = document.querySelector(".poke-form");
const pokeDeleteForm = document.querySelector(".poke-delete-form");
const pokeList = document.querySelector(".poke-list");

function addPokemon(pokemon) {
  const liEl = document.createElement("li");
  const imgEl = document.createElement("img");
  const h2El = document.createElement("h2");

  liEl.classList.add("pokemon");
  imgEl.src = pokemon.image;

  h2El.innerText = pokemon.name;

  liEl.append(imgEl, h2El);
  pokeList.append(liEl);

  const likeImg = document.createElement("img");
  likeImg.setAttribute('src', 'https://filmdaily.co/wp-content/uploads/2021/07/fbl-01.jpg')
  likeImg.setAttribute('class', 'like-image')

  if(pokemon.liked === true) {
    liEl.append(likeImg)
  }

  liEl.addEventListener("click", function (event) {
    if(pokemon.liked === true) {
      fetch(`http://localhost:3000/pokemons/${pokemon.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({liked: false})
      })
        .then(res =>  res.json())
        .then(pokemon => console.log(pokemon));
        likeImg.remove()  
    }
    else {
      
      fetch(`http://localhost:3000/pokemons/${pokemon.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({liked: true})
      })
        .then(res =>  res.json())
        .then(pokemon => console.log(pokemon));  
        liEl.append(likeImg)   
    }

})
}

function addPokemons(pokemons) {
  pokemons.forEach(pokemon => addPokemon(pokemon))
}

function listenToAddPokemonForm() {
  pokeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const pokemon = {
      name: pokeForm.name.value,
      image: pokeForm.image.value
    };

    // CREATE
    fetch("http://localhost:3000/pokemons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pokemon)
    })
      .then(res =>  res.json())
      .then(pokemon => addPokemon(pokemon));
    

    pokeForm.reset();
  });
}

  pokeDeleteForm.addEventListener("submit", function (event) {
    event.preventDefault();
 
    // DELETE
    fetch(`http://localhost:3000/pokemons/${pokeDeleteForm.id.value}`, {
      method: 'DELETE'})
      .then(res =>  res.json())
      .then(pokemon => console.log(pokemon));
    

    pokeDeleteForm.reset();
  });




function init() {
  listenToAddPokemonForm();
  // listenToLikePokemon();
  // READ
  fetch("http://localhost:3000/pokemons")
    .then(res => res.json())
    .then(pokemons => addPokemons(pokemons));
}

init();


