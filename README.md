# LIRI-Node-App
A command line application run through Node JS that allows user to search information and will display results in the command line.

After you clone the repository, you will need to do a few things on your computer to make this work:

  1. Create a file in your pulled repo and name it '.env'
  2. Add in the following to your .env file with your personal keys:
  ```
  # Spotify API keys
  SPOTIFY_ID=your-spotify-id
  SPOTIFY_SECRET=your-spotify-secret
  
  # Bands in town API key
  BIT_API_KEY=your-API-KEY
  
  # OMDB API KEY
  OMDB_API_KEY=your-API-KEY

  ```
  3. In your terminal install the files required by the package-lock.json (npm install)

After you have gotten the app prepared on your PC you should be able to run the application.

> Hello human, I was given the name of Jinkō chinō by my creator, but I would prefer if you called me KEViN. Please may I have your name?

In this node application you can interact with my assistant Jinkō chinō or KEViN as he likes to be called, it can only respond to a few commands, but will display information based on the responses received. After you have introduced yourself to KEViN, you can enter any of the following commands (or tab through to get the choices available)

* spotify-this-song - 
   *This will request data entered by the user to the spotify API and return data onto the commandline.*
* concert-this - 
   *This will request data entered by the user to the Bands In Town API and return data onto the commandline.*
* movie-this - 
   *This will request data entered by the user to the OMDB API and return data onto the commandline.*
* do-what-it-says - 
   *This will run any of the above 3 commands based on what is written in the input.txt file.*
  
Be sure to follow the instructions provided by KEViN and don't be alarmed if he gets a bit hostile towards you as he can get aggrivated easily.

Enjoy!
