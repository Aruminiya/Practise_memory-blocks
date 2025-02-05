import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import Block from "./Block";
import { LevelContext } from "../context/LeaverProvider";
import { difficulty } from "../utils/leveldatas";
import success from "../assets/success.mp3";
import wrong from "../assets/fail.mp3";
import bonusWin from "../assets/bonusWin.mp3";

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
  const blockPitch1Ref = useRef<HTMLButtonElement>(null);
  const blockPitch2Ref = useRef<HTMLButtonElement>(null);
  const blockPitch3Ref = useRef<HTMLButtonElement>(null);
  const blockPitch4Ref = useRef<HTMLButtonElement>(null);

  const audioRef = useRef<HTMLAudioElement>(null);

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
      audioRef.current?.play();
      const leavalTimer = setTimeout(() => {
        nextLevel();
      }, 1500);
      return () => {
        clearTimeout(leavalTimer);
      }
    }

    if (gameMode === "WrongAnswer" || gameMode === "gameEnd") {
      audioRef.current?.play();
      const leavalTimer = setTimeout(() => {
        initGame();
      }, 1500);
      return () => {
        clearTimeout(leavalTimer);
      }
    }
  }, [gameMode, initGame, nextLevel, levelData, gameDifficulty]);

  return (
    <>
      <BlocksStyle>
        <div className="row">
          <Block ref={blockPitch1Ref} color="#FF5353" pitch="1" onClick={() => handleClick("1")} />
          <Block ref={blockPitch2Ref} color="#FFC429" pitch="2" onClick={() => handleClick("2")} />
        </div>
        <div className="row">
          <Block ref={blockPitch3Ref} color="#5980C1" pitch="3" onClick={() => handleClick("3")} />
          <Block ref={blockPitch4Ref} color="#FBE9B7" pitch="4" onClick={() => handleClick("4")} />
        </div>  
      </BlocksStyle>
      <audio ref={audioRef} src={gameMode === "RightAnswer" ? success : gameMode === "WrongAnswer" ? wrong : bonusWin} />
    </>
  )
}

export default BlockGroup;
