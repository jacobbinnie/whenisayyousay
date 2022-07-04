import React from "react";
import "./Clue.css";

export default function Clue(props) {
  return (
    <div className="clueComponent">
      <div className="whenISayYouSay">
        <div className={props.darkMode ? "toggle--dark" : "whenISay"}>
          <h6>WHEN I SAY</h6>
        </div>
        <div className="youSay">
          <h6>YOU SAY</h6>
        </div>
      </div>

      <div className="guessInfo">
        <h5 className={props.darkMode && "guessInfo--dark"}>
          {props.guess.length > 0
            ? props.guess.includes("correct")
              ? props.guess.length > 1
                ? `YOU GOT IT IN ${props.guess.length} GUESSES 🎉`
                : `YOU GOT IT IN ${props.guess.length} GUESS 🎉`
              : null
            : null}
        </h5>
      </div>
      <div className="guessesBox">
        <div
          className={
            props.guess[0] === "correct"
              ? "trueStyle"
              : props.guess[0] === "incorrect"
              ? "falseStyle"
              : "guess"
          }
        ></div>
        <div
          className={
            props.guess[1] === "correct"
              ? "trueStyle"
              : props.guess[1] === "incorrect"
              ? "falseStyle"
              : "guess"
          }
        ></div>
        <div
          className={
            props.guess[2] === "correct"
              ? "trueStyle"
              : props.guess[2] === "incorrect"
              ? "falseStyle"
              : "guess"
          }
        ></div>
        <div
          className={
            props.guess[3] === "correct"
              ? "trueStyle"
              : props.guess[3] === "incorrect"
              ? "falseStyle"
              : "guess"
          }
        ></div>
        <div
          className={
            props.guess[4] === "correct"
              ? "trueStyle"
              : props.guess[4] === "incorrect"
              ? "falseStyle"
              : "guess"
          }
        ></div>
      </div>
      <h1 className={props.darkMode && "toggleWhite"}>
        I SAY <span className="clueSpan">{props.clue}</span>
      </h1>
    </div>
  );
}