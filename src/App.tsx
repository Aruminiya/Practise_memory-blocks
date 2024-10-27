import { useContext, useEffect } from "react";
import styled from "styled-components";
import { LevelContext } from "./context/LeaverProvider";
import BlockGroup from "./components/BlockGroup";

const TitleStyle = styled.div({
  position: "absolute", 
  left: "40px",
  top: "40px",
  color: "#fff",
  zIndex: 100,
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

  '@media (max-width: 768px)': {
    top: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    h1: {
      fontSize: "36px",
      marginTop: 0,
      marginBottom: 0,
      letterSpacing: "1px",
    },
    "h2, h3": {
      lineHeight: "0",
    },
  }
});

const StatusTextStyle = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "10px",
  color: "#fff",
  zIndex: 100,
  "h4": {
    color: "#FF5353",
  }
});

const StyledButton = styled.button`
  background-color: transparent;
  border: solid 1px #FF5353;
  color: #FF5353;
  padding: 10px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 0px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #FF5353;
    color: #fff;
  }
`;

const StyledSelect = styled.select`
  width: auto;
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

const statusMessages = {
  RightAnswer: "正確!",
  WrongAnswer: "錯誤!",
  gamePlaying: "輪到你了",
  gameListening: "請仔細聆聽",
  gameEnd: "恭喜通關！"
};

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
        <div className="title">
          <h2>記憶方塊</h2>
          <h1>Memory</h1>
          <h1>Blocks</h1>
        </div>
        <br />
        {(gameMode === "gameReady") && (
          <div className="gameOption">
            <StyledSelect value={gameDifficulty} onChange={(e) => setGameDifficulty(parseInt(e.target.value))}>
              <option value={1}>簡單</option>
              <option value={2}>普通</option>
              <option value={3}>困難</option>
              <option value={4}>極難</option>
              <option value={5}>瘋狂</option>
            </StyledSelect>
            <br />
            <StyledButton onClick={() => handleStartGame()}>Start Game</StyledButton> 
          </div>
        )}

        {/* 資料 */}
        {/* <p>{JSON.stringify(gameMode)}</p>
        <p>{JSON.stringify(levelData)}</p> */}
      </TitleStyle>

      <BlockGroup />
        <StatusTextStyle>
          <h4>{levelData.level >= 0 ? `status - Level ${levelData.level + 1}` : "Game ready !"}</h4>
          <h4>
            {statusMessages[gameMode as keyof typeof statusMessages] || ""}
          </h4>
        </StatusTextStyle>
    </>
  )
}

export default App
