# Pre-interview assignment

## System description

This is an online library that consists of popular TV shows. In the library, the user wants to list all the shows with their respective title as well as cover. When the user hovers over a show, they will see the rating of the show (average vote). The user should be able to find a show given a title or language, and list the shows by the latest air date.
When the user clicks on a show, a new page with detailed information about the selected show will appear.

## Instructions

- Fork or clone this repository (click "Use this Template")
- Make an estimate on how long you think it would take you to complete this project
- Use any frontend framework
- You may use the sample data provided in this repository. Or, alternatively sign up to https://www.themoviedb.org/tv and use their API.
- Include instructions on how to run your project in this README
- Spend approximately 4-6 hours on this project

When you're done, preferably within a week of seeing this, send us a pull request with your work in this repo! Bonus points if your commits are descriptive, and what future developments of this project would look like.

Good luck! :)

## How to run Jesper Floods codetest

- Clone down this repository by pressing "Code" and choosing which option you would like to clone it down with.
- When the application is cloned, open the terminal and enter into the folder "codetest"
- Inside of the "codetest" folder run the command "npm -i"
- Run the command "code ."
- When vsCode or which ever program you're using create an .env.local file in the root of the application.
- In this file you copy and paste this: "NEXT_PUBLIC_TMDB_API_KEY=YourKeyHere" without the quotation marks, and enter your own API-key from TheMovieDatabase API where it says "YourKeyHere".
- When this is done run the command "npm run build"
- And lastly run the command "npm start" and it should be up running!
- Go to your web browser and search for http://localhost:3000/ and the app should be running.
