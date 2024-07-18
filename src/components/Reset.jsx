import { gameStatus } from "../constants/GameStatus";

function Reset({gameState, onReset}) {
    if(gameState ===gameStatus.inProgress){
        return;
    }
    else{
        return (
            <button onClick={onReset} className="reset-button">Play Again?</button>
        )
    }
        
}

export default Reset;