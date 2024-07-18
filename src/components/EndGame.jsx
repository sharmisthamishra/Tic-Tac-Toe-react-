import { gameStatus } from "../constants/GameStatus";

function EndGame({gameState}) {
        switch (gameState) {
            case gameStatus.inProgress:
                return <></>;
            case gameStatus.playerOWins:
                return <div className="game-over">O wins</div>;
            case gameStatus.draw:
                return <div className="game-over">Draw</div>;
            case gameStatus.playerXWins:
                return <div className="game-over">X wins</div>;
            default:
                return <></>;           
        };
}

export default EndGame;