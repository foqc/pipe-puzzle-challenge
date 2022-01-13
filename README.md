# Pipe Puzzle Challenge
The goal of the puzzle is to rotate the tiles on the map to make all pipes connected in a single group, with no loops and no dangling pipes. When all pipes has blue color means that the goal has been achieved.

# Level passwords
 1. JustWarmingUp
 2. DefinitelyWarm
 3. --
 4. --
 5. --
 6. --

# React set up
To set up the project [create react app](https://create-react-app.dev/) was used because I don't need to learn and configure many build tools.

This app was built using React js 17 with Typescript 4.


# Limitations of this solution
* This game only have an assitant that help you when a correct move is make.
* When level game selected is greater than 2 the UI is not working (because of the dimensions of the map, this should be fixed...).
* The app is not tracking each state in each movement.
* The game assistant can not check if the puzzle can be solved.

# Key design decisions
* This app is not using any state managment library such as Redux and MobX, because the app does not have options like, save game, restore last status game, score ...
* Canvas 2D was used to draw game board instead of buttons, because there is not need to install any library. (I have not worked a lot with this tool, see the final key decision).
* Asistance Game was developed instead of **"auto solver"**, because I realized the high complexity required to solve this and the high computation required to check each tile.
* Each rotation is tracked as a group of commands to send to the server to avoid hitting the server.
* Plain CSS was used and pretty basic UI was built, because I was more aware to build a functional game (I can improve this).
* Finally [Konva](https://konvajs.org/) with [react-konva](https://konvajs.org/docs/react/index.html) library was used to draw game board, because this tool allows me to draw easily graphics in canvas unlike vanilla canvas 2D.

# Launch the solution
1. Node js must be installed in your local machine
2. Go to the project folder in the terminal
3. Install NPM packages: ``` npm install```
4. Start the server: ```npm start``` by default **3000** port will open at [http://localhost:3000/](http://localhost:3000/).

# Optional steps
5. To run tests: ``` npm test```
6. To build project: ``` npm build```

# Demo
This app is vailable [here](https://sad-stonebraker-3c2e26.netlify.app/)