import { createContext, useState, Dispatch, SetStateAction } from "react";

type Level = {
  level: number;
  leveldata: string;
  isPlaying: boolean;
  currentPlay: string | null;
}



export const LevelContext = createContext<{
  level: Level;
  setLevel: Dispatch<SetStateAction<Level>>;
}>({
  level: {
    level: 0,
    leveldata: "",
    isPlaying: false,
    currentPlay: null,
  },
  setLevel: () => {},
});

export const LevelProvider = ({ children }: { children: React.ReactNode }) => {
  const [level, setLevel] = useState<Level>({
    level: 0,
    leveldata: "",
    isPlaying: false,
    currentPlay: null,
  });

  return (
    <LevelContext.Provider value={{ level, setLevel }}>
      {children}
    </LevelContext.Provider>
  );
};
