import { useContext, useEffect } from "react";
import styled from "styled-components";
import { LevelContext } from "./context/LeaverProvider";
import BlockGroup from "./components/BlockGroup";

const TitleStyle = styled.div({
  position: "absolute", 
  left: "40px",
  top: "40px",
  color: "#fff",
  h1: {
    fontSize: "40px",
    marginTop: 0,
    marginBottom: 0,
    letterSpacing: "1px",
    lineHeight: "1.2",
  },
  h3: {
    fontWeight: 500,
    color: "#FF5353",
  },
});

const StyledButton = styled.button`
  background-color: #FF5353;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #FF5353;
  }
`;

const StyledSelect = styled.select`
  width: 100px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  color: #333;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #4CAF50;
  }

  option {
    padding: 10px;
  }
`;

function App() {
  const { levelData, gameMode, nextLevel, gameDifficulty, setGameDifficulty } = useContext(LevelContext);

  const handleStartGame = () => {
    nextLevel();
  }

  useEffect(() => {
    console.log("準備開始");
    if (gameMode === "gamePlaying") {
      console.log("輪到你了");
    }
  }, [gameMode]);

  return (
    <>
      <TitleStyle>
        <h2>記憶方塊</h2>
        <h1>Memory</h1>
        <h1>Blocks</h1>
        <h3 className="status">{levelData.level >= 0 ? `status - Level ${levelData.level + 1}` : "Game ready !"}</h3>
        <h2 className="status">{levelData.level >= 0 ? (gameMode === "RightAnswer" ? "Correct!" : gameMode === "WrongAnswer" ? "Wrong!" : "") : ""}</h2>
        <h2 style={{color: "#FFFFFF"}}>{levelData.level >= 0 ? (gameMode === "gamePlaying" ? "輪到你了" : gameMode === "gameListening" ? "請仔細聆聽" : gameMode === "gameEnd" ? "恭喜通關！" : "") : ""}</h2>
        {(gameMode === "gameReady") && (
          <div>
            <StyledSelect value={gameDifficulty} onChange={(e) => setGameDifficulty(parseInt(e.target.value))}>
              <option value={1}>Easy</option>
              <option value={2}>Normal</option>
              <option value={3}>Hard</option>
              <option value={4}>Very Hard</option>
              <option value={5}>Insane</option>
            </StyledSelect>
            <br />
            <br />
            <StyledButton onClick={() => handleStartGame()}>Start Game</StyledButton> 
          </div>
        )}

        {/* 資料 */}
        {/* <p>{JSON.stringify(gameMode)}</p>
        <p>{JSON.stringify(levelData)}</p> */}
      </TitleStyle>
      <BlockGroup />
    </>
  )
}

export default App
