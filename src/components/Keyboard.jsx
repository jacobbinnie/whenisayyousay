import React from "react";
import KeyboardLetter from "./KeyboardLetter";
import "./Keyboard.css";

export default function Keyboard(props) {
  const top = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  const middle = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
  const bottom = ["Delete", "z", "x", "c", "v", "b", "n", "m", "Enter"];

  const topBoard = top.map((letter) => (
    <KeyboardLetter
      handleButtonClick={props.handleButtonClick}
      letter={letter.toLocaleUpperCase()}
    />
  ));
  const middleBoard = middle.map((letter) => (
    <KeyboardLetter
      handleButtonClick={props.handleButtonClick}
      letter={letter.toLocaleUpperCase()}
    />
  ));
  const bottomBoard = bottom.map((letter) => (
    <KeyboardLetter
      handleButtonClick={props.handleButtonClick}
      letter={letter.toLocaleUpperCase()}
    />
  ));
  return (
    <div className="keyboardDiv">
      <div className="topKeyboard">{topBoard}</div>
      <div className="middleKeyboard">{middleBoard}</div>
      <div className="bottomKeyboard">{bottomBoard}</div>
    </div>
  );
}
