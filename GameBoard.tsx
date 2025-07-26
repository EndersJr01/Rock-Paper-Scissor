"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Move = "rock" | "paper" | "scissors";

const GameBoard: React.FC = () => {
  const [turn, setTurn] = useState<"player1" | "player2" | "result">("player1");
  const [playerOneMove, setPlayerOneMove] = useState<Move | null>(null);
  const [playerTwoMove, setPlayerTwoMove] = useState<Move | null>(null);
  const [score, setScore] = useState({ playerOne: 0, playerTwo: 0, ties: 0 });
  const [resultMessage, setResultMessage] = useState<string>("");

  const handleMoveSelection = (move: Move) => {
    if (turn === "player1") {
      setPlayerOneMove(move);
      setTurn("player2");
    } else if (turn === "player2") {
      setPlayerTwoMove(move);
      setTurn("result");
      computeAndSetResult(playerOneMove!, move);
    }
  };

  const computeAndSetResult = (move1: Move, move2: Move) => {
    let result = "";
    let newScore = { ...score };

    if (move1 === move2) {
      result = "It's a Tie!";
      newScore.ties += 1;
    } else if (
      (move1 === "rock" && move2 === "scissors") ||
      (move1 === "paper" && move2 === "rock") ||
      (move1 === "scissors" && move2 === "paper")
    ) {
      result = "Player 1 Wins!";
      newScore.playerOne += 1;
    } else {
      result = "Player 2 Wins!";
      newScore.playerTwo += 1;
    }

    setResultMessage(result);
    setScore(newScore);
  };

  const resetRound = () => {
    setPlayerOneMove(null);
    setPlayerTwoMove(null);
    setResultMessage("");
    setTurn("player1");
  };

  const resetGame = () => {
    setPlayerOneMove(null);
    setPlayerTwoMove(null);
    setResultMessage("");
    setTurn("player1");
    setScore({ playerOne: 0, playerTwo: 0, ties: 0 });
  };

  const getMoveEmoji = (move: Move) => {
    switch (move) {
      case "rock": return "🪨";
      case "paper": return "📄";
      case "scissors": return "✂️";
      default: return "";
    }
  };

  const renderMoveButtons = () => (
    <div className="flex justify-center gap-4 my-6">
      {(["rock", "paper", "scissors"] as Move[]).map((move) => (
        <Button 
          key={move} 
          onClick={() => handleMoveSelection(move)}
          size="lg"
          className="flex flex-col items-center gap-2 h-20 w-20 text-lg"
        >
          <span className="text-2xl">{getMoveEmoji(move)}</span>
          <span className="text-sm capitalize">{move}</span>
        </Button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-foreground">
            Rock Paper Scissors
          </CardTitle>
          <p className="text-muted-foreground mt-2">Two Player Game</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Current Turn Display */}
          {turn === "player1" && (
            <div className="text-center">
              <h2 className="text-xl font-semibold text-primary mb-2">
                Player 1's Turn
              </h2>
              <p className="text-muted-foreground mb-4">Choose your move</p>
              {renderMoveButtons()}
            </div>
          )}
          
          {turn === "player2" && (
            <div className="text-center">
              <h2 className="text-xl font-semibold text-primary mb-2">
                Player 2's Turn
              </h2>
              <p className="text-muted-foreground mb-4">Choose your move</p>
              {renderMoveButtons()}
            </div>
          )}
          
          {/* Result Display */}
          {turn === "result" && (
            <div className="text-center space-y-4">
              <div className="bg-muted rounded-lg p-6">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  {resultMessage}
                </h2>
                
                <div className="flex justify-center items-center gap-8 mb-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Player 1</p>
                    <div className="text-4xl">{getMoveEmoji(playerOneMove!)}</div>
                    <p className="text-sm capitalize mt-1">{playerOneMove}</p>
                  </div>
                  
                  <div className="text-2xl font-bold text-muted-foreground">VS</div>
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Player 2</p>
                    <div className="text-4xl">{getMoveEmoji(playerTwoMove!)}</div>
                    <p className="text-sm capitalize mt-1">{playerTwoMove}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 justify-center">
                <Button onClick={resetRound} size="lg">
                  Play Again
                </Button>
                <Button onClick={resetGame} variant="outline" size="lg">
                  Reset Game
                </Button>
              </div>
            </div>
          )}
          
          {/* Scoreboard */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-center mb-4">Scoreboard</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-muted rounded-lg p-3">
                <p className="text-2xl font-bold text-primary">{score.playerOne}</p>
                <p className="text-sm text-muted-foreground">Player 1</p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-2xl font-bold text-muted-foreground">{score.ties}</p>
                <p className="text-sm text-muted-foreground">Ties</p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-2xl font-bold text-primary">{score.playerTwo}</p>
                <p className="text-sm text-muted-foreground">Player 2</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameBoard;
