import React from "react";
import { StartMenuProps } from "@/lib/definititions";

const StartMenu: React.FC<StartMenuProps> = ({
  setShowGame,
  setVsComputer,
  // setOnlinePlay,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        className="mt-4 bg-blue-500 text-white w-40 py-2 rounded-md hover:bg-blue-400"
        onClick={() => {
          setVsComputer(true);
          setShowGame(true);
        }}
      >
        Solo
      </button>
      <button
        className="mt-4 bg-blue-500 text-white w-40 py-2 rounded-md hover:bg-blue-400"
        onClick={() => {
          setVsComputer(false);
          setShowGame(true);
        }}
      >
        2 Players (hotseat)
      </button>
      {/* <button
        className="mt-4 bg-blue-500 text-white w-40 py-2 rounded-md hover:bg-blue-400"
        onClick={() => {
          setVsComputer(false);
          setShowGame(false);
          setOnlinePlay(true);
        }}
      >
        Online play
      </button> */}
    </div>
  );
};

export default StartMenu;
