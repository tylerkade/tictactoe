"use client";
import { useState } from "react";
import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import Lobby from "@/components/Lobby";
import StartMenu from "@/components/StartMenu";
import TicTacToe from "@/components/TicTacToe";

export default function Home() {
  const [showGame, setShowGame] = useState(false);
  const [vsComputer, setVsComputer] = useState(false);
  const [currWins, setCurrWins] = useState({ X: 0, O: 0 });
  const [onlinePlay, setOnlinePlay] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Header />
      <div className="absolute top-4 left-4">
        {showGame || onlinePlay ? (
          <BackButton
            setShowGame={setShowGame}
            setCurrWins={setCurrWins}
            setOnlinePlay={setOnlinePlay}
          />
        ) : (
          ""
        )}
      </div>
      {onlinePlay ? (
        <Lobby />
      ) : showGame ? (
        <TicTacToe
          currWins={currWins}
          setCurrWins={setCurrWins}
          vsComputer={vsComputer}
        />
      ) : (
        <StartMenu
          setShowGame={setShowGame}
          setVsComputer={setVsComputer}
          setOnlinePlay={setOnlinePlay}
        />
      )}
    </div>
  );
}
