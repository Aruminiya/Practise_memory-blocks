import { useState, useContext } from "react";
import styled from "styled-components";
import Block from "./Block";
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
  const [, setSelectedBlocks] = useState<string>("");

  const handleBlockClick = (musicalScale: string) => {
    setSelectedBlocks((prev) => prev + musicalScale);
  }

  return (
    <BlocksStyle>
      <div className="row">
        <Block color="#FF5353" pitch="1" onClick={() => handleBlockClick("1")} />
        <Block color="#FFC429" pitch="2" onClick={() => handleBlockClick("2")} />
      </div>
      <div className="row">
        <Block color="#5980C1" pitch="3" onClick={() => handleBlockClick("3")} />
        <Block color="#FBE9B7" pitch="4" onClick={() => handleBlockClick("4")} />
      </div>
    </BlocksStyle>
  )
}

export default BlockGroup;
