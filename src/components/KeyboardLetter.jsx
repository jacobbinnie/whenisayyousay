import React from "react";

export default function KeyboardLetter(props) {
  return (
    <div
      onClick={(event) => props.handleButtonClick(props.letter)}
      className={
        props.letter === "BACK" || props.letter === "ENTER"
          ? "specialKey"
          : "keyboardLetter"
      }
    >
      {props.letter}
    </div>
  );
}
