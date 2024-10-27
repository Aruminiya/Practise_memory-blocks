import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Block from "./Block";
import { LevelContext } from "../context/LeaverProvider";
import { difficulty } from "../utils/leveldatas";

const BlocksStyle = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  ".row": {
    display: "flex",
    gap: "20px",
  },
});

function BlockGroup() {
  const [alertLight, setAlertLight] = useState(false);

  const blockPitch1Ref = useRef<HTMLButtonElement>(null);
  const blockPitch2Ref = useRef<HTMLButtonElement>(null);
  const blockPitch3Ref = useRef<HTMLButtonElement>(null);
  const blockPitch4Ref = useRef<HTMLButtonElement>(null);

  const {
    gameMode,
    nextLevel,
    initGame,
    levelData,
    gameDifficulty,
    playerAnswer,
  } = useContext(LevelContext);

  const handleClick = (pitch: string) => {
    if (gameMode === "gamePlaying") {
      playerAnswer(pitch);
    }
  }

  useEffect(() => {
    if (gameMode === "gameListening" && levelData && levelData.level >= 0) {
      let timer: ReturnType<typeof setTimeout> | undefined = undefined;
      console.log(blockPitch1Ref);
      const leveldataPitches = levelData.data.split("");
      leveldataPitches.forEach((pitch, index) => {
        timer = setTimeout(() => {
          switch (pitch) {
            case "1": blockPitch1Ref.current?.click(); break;
            case "2": blockPitch2Ref.current?.click(); break;
            case "3": blockPitch3Ref.current?.click(); break;
            case "4": blockPitch4Ref.current?.click(); break;
          }
        }, index * difficulty(gameDifficulty));
      });
      return () => {
        clearTimeout(timer);
      }
    }

    if (gameMode === "RightAnswer") {
      const alertLightTimer = setTimeout(() => {
        setAlertLight(true);
      }, 500);
      const leavalTimer = setTimeout(() => {
        setAlertLight(false);
        nextLevel();
      }, 1500);
      return () => {
        clearTimeout(alertLightTimer);
        clearTimeout(leavalTimer);
      }
    }

    if (gameMode === "WrongAnswer") {
      const alertLightTimer = setTimeout(() => {
        setAlertLight(true);
      }, 500);
      const leavalTimer = setTimeout(() => {
        setAlertLight(false);
        initGame();
      }, 1500);
      return () => {
        clearTimeout(alertLightTimer);
        clearTimeout(leavalTimer);
      }
    }
  }, [gameMode, initGame, nextLevel, levelData, gameDifficulty]);

  return (
    <BlocksStyle>
      <div className="row">
        <Block ref={blockPitch1Ref} color="#FF5353" pitch="1" alertLight={alertLight} onClick={() => handleClick("1")} />
        <Block ref={blockPitch2Ref} color="#FFC429" pitch="2" alertLight={alertLight} onClick={() => handleClick("2")} />
      </div>
      <div className="row">
        <Block ref={blockPitch3Ref} color="#5980C1" pitch="3" alertLight={alertLight} onClick={() => handleClick("3")} />
        <Block ref={blockPitch4Ref} color="#FBE9B7" pitch="4" alertLight={alertLight} onClick={() => handleClick("4")} />
      </div>  
    </BlocksStyle>
  )
}

export default BlockGroup;
