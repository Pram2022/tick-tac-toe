import { useState } from "react";

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
        if (squares[a] && squares[a]=== squares[b]&& squares[a]===squares[c]){
            return squares[a];
        }
    }
    return null;
}
export default function Board() {
    
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXNext , setIsXNext] = useState(true);
    const winner = calculateWinner(squares);
    const isDraw = !winner && squares.every(square => square !== null);

    const resetGame = () => {
        setSquares(Array(9).fill(null));
        setIsXNext(true);
    }

    const handleClick =(index) =>{
        if (squares[index]) return;
        const newSquares =[...squares];
        newSquares[index] =isXNext ? "X" : "O";
        setSquares(newSquares);
        setIsXNext(!isXNext);
    };
    return (
        <div>
               <h2>
        {winner
          ? `Winner: ${winner}`
          : isDraw
          ? "It's a Draw!"
          : `Next Player: ${isXNext ? "X" : "O"}`}
      </h2>
            {/* <h2>
                {winner ? `Winner:${winner}` : `Next Player : ${isXNext ? "X" :"O"}`}
            </h2> */}
       
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,100px)"}}>
            {squares.map((value, index) => (
                <button key ={index}
                onClick={() => handleClick(index)}
                style ={{
                    width : "100px",
                    height: "100px ",
                    fontSize: "2rem",

                }}>
                    {value}
                    
                </button>
            ))}
 </div>
 <button
 onClick ={resetGame}
 style={{
    marginTop : "20px",
    padding:"10px,20px",
    fontSize:"1rem",
 }}
 >
Play Again
 </button>
        </div>
    );
}