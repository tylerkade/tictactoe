export interface WinnerInfo {
  winner: string | null;
  combo: number[] | null;
}

export interface TicTacToeProps {
  currWins: { X: number; O: number };
  setCurrWins: React.Dispatch<React.SetStateAction<{ X: number; O: number }>>;
  vsComputer: boolean;
}

export interface StartMenuProps {
  setShowGame: (value: boolean) => void;
  setVsComputer: (value: boolean) => void;
  setOnlinePlay: (value: boolean) => void;
}

export interface BackButtonProps {
  setShowGame: (value: boolean) => void;
  setCurrWins: React.Dispatch<React.SetStateAction<{ X: number; O: number }>>;
  setOnlinePlay: (value: boolean) => void;
}
