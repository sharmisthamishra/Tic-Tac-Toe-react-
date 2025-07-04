import { useEffect, useState } from "react";
import Board from "./Board";
import EndGame from "./EndGame";
import { gameStatus } from "../constants/GameStatus";
import Reset from "./Reset";

const player_X = "X";
const player_O = "O";

const winningCombinations = [
    //Rows
    {
        combo: [0,1,2],
        strikeClass: "strike-row-1" 
    },
    {
        combo: [3,4,5],
        strikeClass: "strike-row-2"
    },
    {
        combo: [6,7,8],
        strikeClass: "strike-row-3"
    },
    //columns
    {
        combo: [0,3,6],
        strikeClass: "strike-column-1" 
    },
    {
        combo: [1,4,7],
        strikeClass: "strike-column-2"
    },
    {
        combo: [2,5,8],
        strikeClass: "strike-column-3"
    },
    //Diagonals
    {
        combo: [0,4,8],
        strikeClass: "strike-diagonal-1" 
    },
    {
        combo: [2,4,6],
        strikeClass: "strike-diagonal-2"
    },
];

function checkWinner(tiles, setStrikeClass, setGameState) {
    for(const {combo, strikeClass} of winningCombinations){
        const tilesValues1 = tiles[combo[0]];
        const tilesValues2 = tiles[combo[1]];
        const tilesValues3 = tiles[combo[2]];

        if(tilesValues1 !== null && tilesValues1 === tilesValues2 && tilesValues1 === tilesValues3){
            setStrikeClass(strikeClass);
            if(tilesValues1 === player_O){
                setGameState(gameStatus.playerOWins);
            }
            else{
                
                setGameState(gameStatus.playerXWins);
            }
            return;
        }
        
    }
    const areAllTilesFilled = tiles.every((tile) => tile !== null);
    if(areAllTilesFilled){
        setGameState(gameStatus.draw);
    }
}

function TicTacToe(){

    const [tiles,setTiles] = useState(Array(9).fill(null));
    const [player, setPlayer] = useState(player_X);
    const [strikeClass, setStrikeClass] = useState();
    const [gameState, setGameState] = useState(gameStatus.inProgress);

    useEffect(()=>{
        checkWinner(tiles, setStrikeClass, setGameState);
    }
    ,[tiles])

    const handleTileClick = (idx) =>{
        if(gameState !== gameStatus.inProgress){
            return;
        }
        if(tiles[idx] !==null){
            return;
        }
        
        const newTilesClicked = [...tiles];
        newTilesClicked[idx] = player;
        setTiles(newTilesClicked);
        if (player === player_X) {
            setPlayer(player_O);
        }
        else {
            setPlayer(player_X);
        }

    };

    const handleReset = () =>{
        setGameState(gameStatus.inProgress);
        setPlayer(player_X);
        setStrikeClass(null);
        setTiles(Array(9).fill(null));
    }

    return (
    <div>
        <h1>Tic Tac Toe</h1>
        <Board strikeClass ={strikeClass} playerTurn = {player} tiles={tiles} onTileClick = {handleTileClick}/>
        <EndGame gameState={gameState}/>
        <Reset gameState={gameState} onReset = {handleReset}/>
    </div>
    )
}

export default TicTacToe;