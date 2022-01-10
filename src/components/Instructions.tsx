const Instructions = () => <div className='col'>
    <h2>Pipes Puzzle</h2>
    <h2>Instructions</h2>
    <p>
        There are 2 pipe maps, the <strong>first one</strong> is a map that interact directly with the server.
        It means that when user click on the tile <strong>each time</strong> a rotation command is sent to the server.
    </p>
    <p>
        The <strong>second one</strong> is a map obtained from the server, however when a tile is rotated this interaction
        occurs in local way to avoid hitting the server each time.
        This map has an assitant that helps to visualize when correct movement is carried out, changing the pipe color to blue.

    </p>
    <p>
        The goal of the puzzle is to rotate the tiles on the map to make all pipes connected in a single group, with no loops and no dangling pipes.
        When all pipes has blue color means that the goal has been achieved.
    </p>
    <h2>Steps</h2>
    <ol>
        <li>
            First press "Start First Level" button to initialize a level.
        </li>
        <li>
            Click a tile in local map instead a server map to avoid hitting the server.
        </li>
        <li>
            If the movement carried out is correct the color changes to blue instead of red.
        </li>
        <li>
            To synchronize server map and the local map, click in "Send Commands" button.
        </li>
        <li>
            To check if is a valid solution, click in "Verify" button, if it is valid a <strong>level password</strong> should be displayed.
        </li>
    </ol>
</div>

export default Instructions