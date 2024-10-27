import styled from "styled-components";
import { useRef, useContext, useCallback, forwardRef, useEffect } from "react";
import { LevelContext } from "../context/LeaverProvider";
import pitch1 from "../assets/pitch/1.wav";
import pitch2 from "../assets/pitch/2.wav";
import pitch3 from "../assets/pitch/3.wav";
import pitch4 from "../assets/pitch/4.wav";

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

const BlockStyle = styled.button<{ color: string, gameMode: string }>(({ color, gameMode }) => ({
  border: `1px solid ${color}`,
  width: "120px",
  height: "120px",
  cursor: "pointer",
  transition: "box-shadow 0.2s, background-color 0.2s",
  backgroundColor: "transparent",
  pointerEvents: gameMode === "gamePlaying" || gameMode === "gameReady" ? "auto" : "none",
  boxShadow: gameMode === "gameListening" ? "none" : `0px 0px 15px ${color}`,

  '&:hover': {
    backgroundColor: getRGBA(color, 0.3),
    boxShadow: `0px 0px 35px ${color}`
  },

  '&:active': {
    backgroundColor: getRGBA(color, 1),
  }
}));

const Block = forwardRef<HTMLButtonElement, Props>(({ color, pitch, onClick }, ref) => {
  const { gameMode } = useContext(LevelContext);

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
    if (ref && 'current' in ref && ref.current) {
      ref.current.style.backgroundColor = getRGBA(color, 1);
      setTimeout(() => {
        ref.current!.style.backgroundColor = 'transparent';
      }, 250);
    }
    if (gameMode === "gamePlaying") {
      onClick();
    }

  }, [color, gameMode, onClick, ref]);

  useEffect(() => {
    if (gameMode === "WrongAnswer" && ref && 'current' in ref && ref.current) {
      const timer = setTimeout(() => {
        ref.current!.style.backgroundColor = getRGBA(color, 1);
        setTimeout(() => {
          ref.current!.style.backgroundColor = "transparent";
          setTimeout(() => {
            ref.current!.style.backgroundColor = getRGBA(color, 1);
            setTimeout(() => {
              ref.current!.style.backgroundColor = "transparent";
            }, 150);
          }, 150);
        }, 150);
      }, 350);

      return () => {
        clearTimeout(timer);
      };
    }

    if (gameMode === "RightAnswer" && ref && 'current' in ref && ref.current) {
      const timer = setTimeout(() => {
        ref.current!.style.backgroundColor = getRGBA(color, 1);
        setTimeout(() => {
          ref.current!.style.backgroundColor = "transparent";
        }, 1000);
      }, 350);

      return () => {
        clearTimeout(timer);
      };
    }

  }, [color, gameMode, ref]);

  return (
    <BlockStyle 
      ref={ref} 
      color={color} 
      gameMode={gameMode}
      onClick={handleClick} 
      data-pitch={pitch}
    >
      <audio ref={audioRef} src={pitch === "1" ? pitch1 : pitch === "2" ? pitch2 : pitch === "3" ? pitch3 : pitch4} />
    </BlockStyle>
  )
});

export default Block;
