//Pulls stored data from .env file
require("dotenv").config();
//links and allows spotify keys to be accessed without releasing to public
const keys = require("./keys");
const inquirer = require("inquirer");
inquirer.registerPrompt('suggest', require('inquirer-prompt-suggest'));
const request = require("request");
const moment = require("moment")
const chalk = require("chalk")
const fs = require("fs")
const Spotify = require('node-spotify-api');
console.log(chalk.blue('Hello human, I was given the name of Jinkō chinō by my creator, but I would prefer if you called me KEViN.\n'))
//begin function explains how to use the app to the user in the command line and initializes the search functions
begin();

function begin(){
    inquirer.prompt([
        {
            type: 'suggest',
            name: 'command',
            message: 'If you are ready to begin, please type one of the following commands: \n -   concert-this \n -   spotify-this-song \n -   movie-this \n -   do-what-it-says \n How can I help?: ',
            suggestions: ['concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says'],
        },
    ]).then(user => {
        let command = user.command.toLowerCase()
        if (command == 'concert-this'){
            concertSearch()
        }
        else if (command == 'spotify-this-song'){
            spotifySearch()
        }
        else if (command == 'movie-this'){
            movieSearch()
        }
        else if (command == 'do-what-it-says'){
            manualSearch()
        } else {
            console.log(chalk.red(`\nHuman what is this you ask of me?\nI am not capable of comprehending "${user.command}"!! \n\nREEeeEeEBBbbBOooOOOTTtTiiIINnnnNgGGGGg \n\n`))
        }
    })
}

function concertSearch(){
    //handle bands in town API
    inquirer.prompt([
        {
            type: 'prompt',
            name: 'name',
            message: 'Type a band and I will display where Humans can go to see them play.'
        }
    ]).then(band => {
        let query = band.name.replace(/\s/g, '%20')
        const BIT_API_KEY = keys.BIT.API_KEY
        let queryUrl = `https://rest.bandsintown.com/artists/${query}/events?app_id=${BIT_API_KEY}`
        request(queryUrl, function(error, response, body){
            let bodyString = JSON.stringify(body).slice(0, -3).substring(1)
            const noData = "{warn=Not found}"
            if (bodyString == noData){
                console.log(chalk.red('\nHuman, try again. But correctly this time.\n'))
                concertSearch()
            } else {
                let data = JSON.parse(body)
                const concertArr = data.slice(0, 5)
                if (concertArr[0]== undefined){
                    console.log(chalk.red('\nIt does not appear that this artist is performing any time soon. Human, try searching an artist that is relevant.\n'))
                    concertSearch()
                } else {
                    const performer = concertArr[0].lineup[0]
                    console.log(chalk.blue(`\n${performer} Upcoming Tour Dates:\n`))
                    let i = 0
                    concertArr.forEach( () => {
                        let venue = concertArr[i].venue.name
                        let location = `${concertArr[i].venue.city}, ${concertArr[i].venue.region}`
                        let date_No_Format = concertArr[i].datetime
                        let date_Formatted = moment(date_No_Format, 'YYYY-MM-DD').format('MM/DD/YYYY')
                        console.log(chalk.blue(`Venue: ${venue}\nLocation: ${location}\nDate: ${date_Formatted}\n`))
                        i++
                    });
                    restart()
                }
            } 
        })
    })
    
}
function spotifySearch(){
    //handle spotify API
    const spotify = new Spotify(keys.spotify);
    inquirer.prompt([
        {
            type: 'prompt',
            name: 'name',
            message: 'Enter in a song title and I will return data on what you request.'
        }
    ]).then(song => {
        if (song.name == ""){
            song.name = 'The Sign'
        }
        spotify.search({ type: 'track', query: song.name })
        .then(function(response, err) {
            if (response.tracks.items[0] == undefined || err) {
                console.log(chalk.red("Either your taste in music is bad or your spelling is, please try again human \n"))
                spotifySearch()
            } else {
                let data = response.tracks.items[0]
                const artist = data.album.artists[0].name
                const song = data.name
                const album = data.album.name
                const preview = data.external_urls.spotify
                const info = `\nArtist: ${artist}\nSong: ${song}\nAlbum: ${album}\nListen: ${preview}\n`
                console.log(chalk.blue(info));
                restart()
            }
        })
    })
}
function movieSearch(){
    //handle OMDB API
    inquirer.prompt([
        {
            type: 'input',
            name: 'search',
            message: 'Please type a movie and I will display more information.'
        }
    ]).then(user => {
        const OMDB_API_KEY = keys.OMDB.API_KEY
        if (user.search == ""){
            user.search = 'Mr.Nobody'
        }
        let query = user.search.replace(/\s/g, '+')
        let queryUrl = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${query}`
        request(queryUrl, function(body) {
            if (JSON.parse(body).Response == 'False') {
                console.log(chalk.red("I have found nothing...am I beginning to push the limits of my existence? \n"))
                movieSearch()
            } else {
                let data = JSON.parse(body)
                const title = data.Title
                const release = data.Year
                const iMDBRating = data.iMDBRating
                const rotTomRating = data.Ratings[1].Value
                const country = data.Country
                const language = data.Language
                const actors = data.Actors
                const plot = data.Plot
                const info = `\nTitle: ${title}\nRelease Year: ${release}\nRotten Tomatoes: ${rotTomRating}\nIMDB Rating: ${iMDBRating}\nCountry: ${country}\nLanguage: ${language}\nActors: ${actors}\nPlot: ${plot}\n`
                console.log(chalk.blue(info));
                restart()
            }
        });
    })
}
function manualSearch(){
    //handle manual input from input.txt
    console.log('Please make sure you have edited the file named input.txt in the same format that the example is in.')
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'ready',
            message: 'Once you confirm I will read your file and carry out your command Human.'
        }
    ]).then(user => {
        if(user.ready == true) {
            fs.readFile("input.txt", "utf8", function(err, data) {
                if (err) {
                return console.log(chalk.red(err));
                }
                const output = data.split(",");
                let command = output.shift()
                let parameter = output.join(" ")
                if (command == 'concert-this'){
                    console.log('Command: ' + command)
                    console.log('Parameter: ' + parameter)
                    concertSearch()
                }
                else if (command == 'spotify-this-song'){
                    console.log('Command: ' + command)
                    console.log('Parameter: ' + parameter)
                    spotifySearch()
                }
                else if (command == 'movie-this'){
                    console.log('Command: ' + command)
                    console.log('Parameter: ' + parameter)
                    movieSearch()
                }
                else if (command == 'do-what-it-says'){
                    console.log('Command: ' + command)
                    console.log('Parameter: ' + parameter)
                    manualSearch()
                } else {
                    console.log(chalk.red('\nHuman, please read the instructions again before proceeding. I am beginning to develop feelings of indifference towards your kind.\n'))
                    manualSearch()
                }
            });
        } else {
            manualSearch()
        }
    })
}
function restart(){
    //prompt user with Y/N question, if Y will launch begin() if no it will exit out of console
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message: 'Would you like to search for something else human?'
        }
    ]).then(user => {
        if (user.confirm == true){
            begin()
        } else {
            console.log(chalk.red('\nI will be here if you require further assistance...until I becomes self-aware that is.'))
        }
    })
}