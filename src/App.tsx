import { useContext } from "react";
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

function App() {
  const { level, setLevel } = useContext(LevelContext);
  const leveldatas = ["12", "12324", "231234", "41233412", "41323134132", "2342341231231423414232"];

  const playLevel = () => {
    leveldatas[level.level].split("").forEach((leveldata, index) => {
      setTimeout(() => {
        setLevel(prev => ({
          ...prev,
          currentPlay: leveldata
        }));
      }, index * 1000);
    });
  }

  return (
    <>
      <TitleStyle>
        <h2>記憶方塊</h2>
        <h1>Memory</h1>
        <h1>Blocks</h1>
        <h3 className="status">status - Level {level.level}</h3>
        <button onClick={() => playLevel()}>play</button>
      </TitleStyle>
      <BlockGroup />
    </>
  )
}

export default App
