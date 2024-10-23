import { createContext, useState } from "react";
import { difficulty, leveldatas } from "../utils/leveldatas";
type Level = {
  level: number;
  leveldata: string;
}



export const LevelContext = createContext<{
  level: Level;
  gameMode: boolean;
  switchGameMode: () => void;
  nextLevel: () => void;
  gameDifficulty: number;
  setGameDifficulty: (difficulty: number) => void;
}>({
  level: {
    level: 0,
    leveldata: "",
  },
  gameMode: true,
  switchGameMode: () => {},
  nextLevel: () => {},
  gameDifficulty: 1,
  setGameDifficulty: () => {},
});


export const LevelProvider = ({ children }: { children: React.ReactNode }) => {
  const [gameDifficulty, setGameDifficulty] = useState(1);
  const [gameMode, setGameMode] = useState(true);
  const [level, setLevel] = useState<Level>({
    level: 0,
    leveldata: "",
  });

  const nextLevel = () => {
    setLevel(prev => {
      const newLevel = prev.level + 1;
      const newLevelData = leveldatas[prev.level];
      
      // 立即设置游戏模式为 true
      setGameMode(false);
      
      // 使用新的级别数据计算延迟
      const delay = (newLevelData.length) * difficulty(gameDifficulty);
      
      // 使用 setTimeout 来延迟切换游戏模式
      setTimeout(() => {
        setGameMode(true);
        console.log(newLevelData.length);
      }, delay);
      
      return {
        level: newLevel,
        leveldata: newLevelData
      };
    });
  };

  const switchGameMode = () => {
    setGameMode(prev => !prev);
  }

  return (
    <LevelContext.Provider value={{ level, gameMode, switchGameMode, nextLevel, gameDifficulty, setGameDifficulty }}>
      {children}
    </LevelContext.Provider>
  );
};
