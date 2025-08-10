// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    for(let i = 0; i < games.length; i++){
        let new_div = document.createElement('div');
        new_div.classList.add('game-card');
        
        let new_div_content = `

            <img src = '${games[i].img}' height = 150px width = 250px>

            <h2>${games[i].name}</h2>
            <p>${games[i].description}</p>
        `;

        new_div.innerHTML = new_div_content;

        document.getElementById('games-container').append(new_div);

    }



}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
let totalContributors = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;
}, 0);



function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfundedGames = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    });

    // console.log(unfundedGames.length);
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
    listItems = document.querySelectorAll(".game-card");

}   


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal

    let fundedGames = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal;
    });
    // use the function we previously created to add unfunded games to the DOM
    
    // console.log(fundedGames.length);

    addGamesToPage(fundedGames);
    listItems = document.querySelectorAll(".game-card");
}


// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
    listItems = document.querySelectorAll(".game-card");
}




// OPTIONAL FEATURE: SEARCH
const search = document.getElementById("search");
let listItems = document.querySelectorAll(".game-card");


search.addEventListener("input", function() {
  const query = this.value.toLowerCase();
  listItems.forEach(item => {

    let gameTitle = item.querySelector('h2');
    
    // will display a gamecard if the query is in any part of the title of the game
    item.style.display = gameTitle.textContent.toLowerCase().includes(query) ? "" : "none";
  });
});

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click', showAllGames);