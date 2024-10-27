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
    if (gameMode !== "gameReady") {
      playSound();
    };
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

    /*
    在 React 的 `useEffect` 中使用 `for` 迴圈是可以的，但需要注意閉包問題。當你在迴圈中使用 `setTimeout` 時，
    通常會遇到閉包問題，這可能會導致所有的計時器都使用最後一個迴圈變數的值。為了解決這個問題，你可以使用立即執行函數（IIFE）來創建一個新的作用域。
    */

    if (gameMode === "gameEnd" && ref && 'current' in ref && ref.current) {
      // 設置一個初始的計時器，延遲 50 毫秒後開始閃爍效果
      const timer = setTimeout(() => {
        // 使用 for 迴圈來設置多個計時器，控制背景顏色的閃爍
        for (let i = 0; i < 8; i++) {
          // 使用立即執行函數 (IIFE) 來創建一個新的作用域，確保每個計時器捕獲正確的迴圈變數 i
          ((index) => {
            setTimeout(() => {
              // 根據 index 的奇偶性來切換背景顏色
              ref.current!.style.backgroundColor = index % 2 === 0 ? getRGBA(color, 1) : "transparent";
            }, 200 * index); // 每次閃爍的間隔時間為 200 毫秒
          })(i);
        }
      }, 50); // 初始延遲 50 毫秒

      // 清除計時器以避免內存洩漏
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
