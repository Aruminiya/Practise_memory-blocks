import { createContext, useState } from "react";
import { difficulty, leveldatas } from "../utils/leveldatas";

type LevelData = {
  level: number;
  data: string;
}

type GameMode = "gameReady" | "gameListening" | "gamePlaying" | "gameEnd" | "RightAnswer" | "WrongAnswer";

let checkLevelDataIndex = -1;

export const LevelContext = createContext<{
  levelData: LevelData;
  gameMode: GameMode;
  switchGameMode: (gameMode: GameMode) => void;
  nextLevel: () => void;
  gameDifficulty: number;
  setGameDifficulty: (difficulty: number) => void;
  playerAnswer: (answer: string) => void;
  initGame: () => void;
}>({
  levelData: {
    level: 0,
    data: "",
  },
  gameMode: "gameReady",
  switchGameMode: () => {},
  nextLevel: () => {},
  gameDifficulty: 1,
  setGameDifficulty: () => {},
  playerAnswer: () => {},
  initGame: () => {},
});

export const LevelProvider = ({ children }: { children: React.ReactNode }) => {
  const [gameDifficulty, setGameDifficulty] = useState(1);
  const [gameMode, setGameMode] = useState<GameMode>("gameReady");
  const [levelData, setLevelData] = useState<LevelData>({
    level: -1,
    data: "",
  });
  
  const nextLevel = () => {
    if (levelData.level === leveldatas.length - 1) {
      setGameMode("gameEnd");
      return;
    }
    setLevelData(prev => {
      const newLevel = prev.level + 1;
      const newLevelData = leveldatas[newLevel];
      
      // 立即设置游戏模式为 gameListening
      setGameMode("gameListening");
      
      // 使用新的级别数据计算延迟
      const delay = (newLevelData.length) * difficulty(gameDifficulty);
      
      // 使用 setTimeout 来延迟切换游戏模式
      setTimeout(() => {
        setGameMode("gamePlaying");
      }, delay);
      
      return {
        level: newLevel,
        data: newLevelData
      };
    });
  };

  const initGame = () => {
    setGameMode("gameReady");
    setLevelData({
      level: -1,
      data: "",
    });
  }

  const switchGameMode = (gameMode: GameMode) => {
    switch (gameMode) {
      case "gameReady":
        setGameMode("gameListening");
        break;
      case "gameListening":
        setGameMode("gamePlaying");
        break;
      case "gamePlaying":
        setGameMode("gameEnd");
        break;
      case "gameEnd":
        setGameMode("gameReady");
        break;
    }
  };



  const playerAnswer = (answer: string) => {
    const levelDataPitches = levelData.data.split("");
    console.log(levelDataPitches);
    checkLevelDataIndex++;
    console.log(checkLevelDataIndex);

    if (answer === levelDataPitches[checkLevelDataIndex]) {
      
      console.log(answer, levelDataPitches[checkLevelDataIndex]);
      if (checkLevelDataIndex === levelDataPitches.length - 1) {
        setGameMode("RightAnswer");
        checkLevelDataIndex = -1;
      }
    } else if (answer !== levelDataPitches[checkLevelDataIndex]) {
      setGameMode("WrongAnswer");
      checkLevelDataIndex = -1;
    } else {
      setGameMode("gameReady");
      checkLevelDataIndex = -1;
    }
  }

  return (
    <LevelContext.Provider value={{ levelData, gameMode, switchGameMode, nextLevel, gameDifficulty, setGameDifficulty, playerAnswer, initGame }}>
      {children}
    </LevelContext.Provider>
  );
};
