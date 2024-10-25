import styled from "styled-components";
import { useRef, useContext, useCallback, forwardRef } from "react";
import { LevelContext } from "../context/LeaverProvider";

type Props = {
  color: string;
  pitch: string;
  onClick: () => void;
}

// 將顏色轉換為 RGB 格式
const getRGBA = (color: string, alpha: number) => {
  const tempElem = document.createElement("div");
  tempElem.style.color = color;
  document.body.appendChild(tempElem);
  const rgbColor = window.getComputedStyle(tempElem).color;
  document.body.removeChild(tempElem);
  const rgbValues = rgbColor.match(/\d+/g);
  return `rgba(${rgbValues![0]}, ${rgbValues![1]}, ${rgbValues![2]}, ${alpha})`;
};

const BlockStyle = styled.button<{ color: string }>(({ color }) => ({
  border: `1px solid ${color}`,
  width: "120px",
  height: "120px",
  cursor: "pointer",
  boxShadow: `0px 0px 15px ${color}`,
  backgroundColor: "transparent",
  transition: "0.3s",

  '&:hover': {
    transition: "0.3s",
    backgroundColor: getRGBA(color, 0.3)
  },

  '&:active': {
    backgroundColor: getRGBA(color, 1),
    boxShadow: `0px 0px 35px ${color}`
  }
}));

const Block = forwardRef<HTMLButtonElement, Props>(({ color, pitch, onClick }, ref) => {
  const { gameMode, playerAnswer } = useContext(LevelContext);

  const audioRef = useRef<HTMLAudioElement>(null);

  const playSound = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0; // 重置音频到开始位置
      audio.play();
    }
  };

  const handleClick = useCallback(() => {
    console.log(gameMode);
    playSound();
    if (ref) {
      ref.current.style.backgroundColor = getRGBA(color, 1);
      setTimeout(() => {
        ref.current!.style.backgroundColor = 'transparent';
      }, 250);
    }
    if (gameMode === "gamePlaying") {
      onClick();
    }

  }, [color, gameMode, onClick, ref]);

  return (
    <BlockStyle 
      ref={ref} 
      color={color} 
      style={{
        pointerEvents: gameMode === "gamePlaying" || gameMode === "gameReady" ? "auto" : "none",
        opacity: gameMode === "gameListening" ? 0.7 : 1
      }}
      onClick={handleClick} 
      data-pitch={pitch}
    >
      <audio ref={audioRef} src={`https://awiclass.monoame.com/pianosound/set/${pitch}.wav`} />
    </BlockStyle>
  )
});

export default Block;
