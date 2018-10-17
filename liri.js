//Pulls stored data from .env file
require("dotenv").config();
//links and allows spotify keys to be accessed without releasing to public
const key = require("./keys");
const inquirer = require("inquirer");
//allows tab to cycle through suggestions or manual typing
inquirer.registerPrompt('suggest', require('inquirer-prompt-suggest'));
const spotify = key.spotify
userName = []
//tutorial function explains how to use the app to the user in the command line and initializes the search functions
tutorial();

function tutorial(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Hello human, I was given the name of Jinkō chinō by my creator, but I would prefer if you called me Kevin. Please may I have your name?"
        },
        {
            type: 'suggest',
            name: 'command',
            message: 'It pleases me to make your acquaintance. If you are ready to begin, please type one of the following commands: \n -   concert-this \n -   spotify-this-song \n -   movie-this \n -   do-what-it-says \n How can I help?: ',
            suggestions: ['concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says'],
        },
    ]).then(user => {
        userName.push(user.name)
        let command = user.command.toLowerCase()
        if (command == 'concert-this'){
            console.log(command)
            concertSearch()
        }
        else if (command == 'spotify-this-song'){
            console.log(command)
            spotifySearch()
        }
        else if (command == 'movie-this'){
            console.log(command)
            movieSearch()
        }
        else if (command == 'do-what-it-says'){
            console.log(command)
            manualSearch()
        } else {
            console.log(`Human what is this you ask of me? I am not capable of comprehending "${user.command}" ${userName[0]}!! \nREEeeEeEBBbbBOooOOOTTtTiiIINnnnNgGGGGg \n\n`)
            tutorial()
        }
    })
}

function concertSearch(){
    //handle bands in town API
}
function spotifySearch(){
    //handle spotify API
}
function movieSearch(){
    //handle TMDB API
}
function manualSearch(){
    //handle manual input from input.txt
}