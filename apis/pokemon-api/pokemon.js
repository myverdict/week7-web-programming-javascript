// API documentation: https://pokeapi.co/

let pokemonListUrl = 'https://pokeapi.co/api/v2/pokemon/'


let pokemonListEl = document.querySelector('#pokemon-list')
let nextButton = document.querySelector('#next')


getPokemon();   // initial call


nextButton.addEventListener('click', function () {
    getPokemon()
})


function getPokemon() {
    pokemonListEl.innerHTML = ''                  // clear any previous data 

    if (pokemonListUrl) {
        fetch(pokemonListUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data)               // debug

                pokemonListUrl = data.next      // store link to 'next' set of results 
                console.log(pokemonListUrl)     // debug

                let list = data.results         // an array
                console.log(list)               // debug

                list.forEach(pokemon => {
                    let li = document.createElement('li')   // create an li element
                    li.innerHTML = pokemon.name
                    pokemonListEl.appendChild(li)   // add the li to the ul element
                })
            })
            .catch(err => {
                console.log(err)
                alert("Sorry, can't fetch pokemon.")
            })
    } 
    else {
        alert('No more Pokemon!')
    }
}

