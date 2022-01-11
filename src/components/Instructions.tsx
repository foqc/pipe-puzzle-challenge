const Instructions = () => <div className='col'>
    <h2>Pipes Puzzle</h2>
    <h2>Instructions</h2>
    <p>
        The <strong>pipe map</strong> is obtained from the server, however when a tile is rotated this interaction
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
            First press <strong>"Start First Level"</strong> button to initialize a level.
        </li>
        <li>
            Click a tile in map
        </li>
        <li>
            If the movement carried out is correct the color changes to blue instead of red.
        </li>
        <li>
            To synchronize server map and the local map, click in <strong>"Sync Server Map"</strong> button (this will send to server the list of movements).
        </li>
        <li>
            To check if is a valid solution, click in <strong>"Verify"</strong> button, if it is valid a <strong>Level password</strong> should be displayed.
        </li>
    </ol>
</div>

export default Instructions