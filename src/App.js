import { React, useEffect, useState } from "react";
import "./App.css";
import words from "./words.json";
import Clue from "./components/Clue";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import trophy from "./images/trophy.png";

function App() {
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [puzzle, setPuzzle] = useState({});
  const [myScore, setMyScore] = useState({
    myStreak: 0,
    lastPuzzleCompleted: -1,
    lastScore: false,
    darkMode: false,
  });
  const [darkMode, setDarkMode] = useState(false);

  const utcStartTime = new Date("July 2, 2022 00:00:00");

  useEffect(() => {
    const currentMode = window.localStorage.getItem("darkModeWisus");
    currentMode === "true" ? setDarkMode(true) : setDarkMode(false);
  }, []);

  useEffect(() => {
    setGuesses([]);
  }, [puzzle]);

  useEffect(() => {
    setCurrentGuess("");
  }, [puzzle]);

  useEffect(() => {
    const date1 = new Date(utcStartTime);
    const date2 = new Date();
    const days = 1000 * 60 * 60 * 24;
    const diff = date2 - date1;
    const dayNumber = Math.floor(diff / days);
    setPuzzle(words[dayNumber]);
  }, []);

  useEffect(() => {
    const data = window.localStorage.getItem("WISUS");
    if (data !== null) setMyScore(JSON.parse(data));
  }, []);

  // Sets updated score
  useEffect(() => {
    guesses.includes("correct")
      ? puzzle.answer !== myScore.lastPuzzleCompleted.answer &&
        window.localStorage.setItem(
          "WISUS",
          JSON.stringify(
            {
              myStreak: myScore.myStreak + 1,
              lastPuzzleCompleted: puzzle,
              lastScore: true,
              darkMode: darkMode,
            },
            setMyScore({
              myStreak: myScore.myStreak + 1,
              lastPuzzleCompleted: puzzle,
              lastScore: true,
              darkMode: darkMode,
            })
          )
        )
      : guesses[4] === "incorrect" &&
        window.localStorage.setItem(
          "WISUS",
          JSON.stringify(
            {
              myStreak: 0,
              lastPuzzleCompleted: puzzle,
              lastScore: false,
              darkMode: darkMode,
            },
            setMyScore({
              myStreak: 0,
              lastPuzzleCompleted: puzzle,
              lastScore: false,
              darkMode: darkMode,
            })
          )
        );
  }, [guesses]);

  function handleDarkMode() {
    setDarkMode((prev) => {
      window.localStorage.setItem("darkModeWisus", !prev);
      return !prev;
    });
  }

  function checkAnswer() {
    guesses.length < 5
      ? !guesses.includes("correct")
        ? currentGuess === puzzle.answer
          ? setGuesses((oldArray) => [...oldArray, "correct"])
          : setGuesses((oldArray) => [...oldArray, "incorrect"])
        : console.log("Already solved!")
      : console.log("Max guesses already");
  }

  const handleChange = (event) => {
    const value = event.target.value;
    let replaced = value.replace(/[^a-z]/gi, "");
    let uppercased = replaced.toUpperCase();
    setCurrentGuess(uppercased);
  };

  function handleButtonClick(letter) {
    puzzle.answer !== myScore.lastPuzzleCompleted.answer && letter === "ENTER"
      ? checkAnswer()
      : letter === "DELETE"
      ? setCurrentGuess((prevGuess) => prevGuess.slice(0, -1))
      : setCurrentGuess((prevGuess) => prevGuess + letter);
  }

  return (
    <>
      <div className={darkMode ? "app--dark" : "app"}>
        <div className="game">
          <Clue darkMode={darkMode} guess={guesses} clue={puzzle.clue} />
          <Board
            style={
              puzzle.answer === myScore.lastPuzzleCompleted.answer &&
              "completed"
            }
            handleChange={handleChange}
            myScore={myScore}
            puzzle={puzzle}
            guesses={guesses}
            currentGuess={
              puzzle.answer === myScore.lastPuzzleCompleted.answer
                ? "-------------------------"
                : currentGuess
            }
            answer={puzzle.answer}
          />
          <Keyboard handleButtonClick={handleButtonClick} />
        </div>
        <div className="streakBox">
          <h6 className={darkMode && "streak--dark"}>WIN STREAK</h6>
          <img src={trophy}></img>
          <h6 className={darkMode ? "streak--dark" : "streak"}>
            {myScore.myStreak}
          </h6>
        </div>
        <div className="footerBox">
          <h6 className={darkMode && "streak--dark"}>
            MADE WITH ❤️ &nbsp;BY
            <a
              className="twitter"
              href="https://twitter.com/jacobbinnie"
              target="_blank"
            >
              @jacobbinnie
            </a>
          </h6>
          <div
            className={darkMode ? "toggle--darkButton" : "darkModeToggleBox"}
            onClick={handleDarkMode}
          >
            <h6>TOGGLE {darkMode ? "LIGHT" : "DARK"} MODE</h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;