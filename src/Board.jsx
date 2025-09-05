import { useState, useEffect } from "react";

function calculateWinner(squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for (let [a,b,c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [player1, setPlayer1] = useState("Player 1");
  const [player2, setPlayer2] = useState("Player 2");

  const [score, setScore] = useState({ X: 0, O: 0, Draws: 0 });


  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(square => square !== null);

  const handleClick = (index) => {
    if (squares[index] || winner) return;
    const newSquares = [...squares];
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  // Update score when someone wins
useEffect(() => {
  if (winner) {
    setScore((prev) => ({
      ...prev,
      [winner]: prev[winner] + 1,
    }));
  } else if (isDraw) {
    setScore((prev) => ({
      ...prev,
      Draws: prev.Draws + 1,
    }));
  }
}, [winner, isDraw]);

const resetGame = () => {
  setSquares(Array(9).fill(null));
  setIsXNext(true);
};

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Player name inputs */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
          placeholder="Enter Player 1 Name"
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="text"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
          placeholder="Enter Player 2 Name"
          style={{ padding: "5px" }}
        />
      </div>

      {/* Scoreboard */}
   <div style={{ marginBottom: "20px" }}>
  <strong>Scoreboard:</strong><br />
  {player1} (X): {score.X} wins<br />
  {player2} (O): {score.O} wins<br />
  Draws: {score.Draws}
</div>


      {/* Game status */}
       <h2 className={winner ? "winner-text" : ""}>
      {winner
        ? `Winner: ${winner === "X" ? player1 : player2}`
        : isDraw
        ? "It's a Draw!"
        : `Next Player: ${isXNext ? player1 : player2}`}
    </h2>

      {/* Board */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,100px)" }}>
        {squares.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            style={{
              width: "100px",
              height: "100px",
              fontSize: "2rem",
              border: "2px solid black"
              
            }}
          >
            {value}
          </button>
        ))}
      </div>

      {/* Reset Button */}
      <button
        onClick={resetGame}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "1rem",
        }}
      >
        Play Again
      </button>
    </div>
  );
}
